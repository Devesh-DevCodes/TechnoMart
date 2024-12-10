const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Define category URLs (replace these with specific category pages)
    const categoryURLs = [
        { name: 'smartphone',prefix:1001 , url: 'https://www.amazon.in/s?k=smartphones' },
        { name: 'iphone', prefix:2001, url: 'https://www.amazon.in/s?k=iphones' },
        { name: 'macbook', prefix:3001, url: 'https://www.amazon.in/s?k=macbook' },
        { name: 'tablet', prefix:4001, url: 'https://www.amazon.in/s?k=tablets' },
        { name: 'laptop', prefix:5001, url: 'https://www.amazon.in/s?k=laptops' },
        { name: 'accessories', prefix:6001, url: 'https://www.amazon.in/s?k=electronic+accessories' }
    ];

    const allProducts = [];

    for (const category of categoryURLs) {
        await page.goto(category.url, { waitUntil: 'load', timeout: 0 });

        // Extract data from the current category
        const items = await page.evaluate((categoryName, prefix) => {
            const itemElements = document.querySelectorAll('.s-main-slot .s-result-item');
            const itemList = [];
            let itemCount = 1;

            itemElements.forEach((item) => {
                const name = item.querySelector('h2 a span')?.textContent;
                const description = item.querySelector('.a-text-normal')?.textContent || 'No description available';
                const image = item.querySelector('img')?.getAttribute('src');
                const priceWhole = item.querySelector('.a-price-whole')?.textContent;
                const priceFraction = item.querySelector('.a-price-fraction')?.textContent || '';

                if (name && image && priceWhole) {
                    itemList.push({
                        Prod_ID: prefix + itemCount, // Unique ID
                        Name: name.trim(),
                        Description: description.trim(),
                        Category: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                        Price: parseFloat(`${priceWhole.replace(/,/g, '')}.${priceFraction}`), // Price as decimal
                        Image_URL: image.trim()
                    });
                    itemCount++;
                }
            });

            return itemList;
        }, category.name, category.prefix);

        allProducts.push(...items);
    }

    // Save the data in the required format
    fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2));
    console.log("Products saved to products.json");

    await browser.close();
})();