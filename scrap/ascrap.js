const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Define category URLs with their respective prefixes
    const categoryURLs = [
        { name: 'smartphone', prefix: 1000, url: 'https://www.amazon.in/s?k=smartphones' },
        { name: 'iphone', prefix: 2000, url: 'https://www.amazon.in/s?k=iphones' },
        { name: 'macbook', prefix: 3000, url: 'https://www.amazon.in/s?k=macbook' },
        { name: 'tablet', prefix: 4000, url: 'https://www.amazon.in/s?k=tablets' },
        { name: 'laptop', prefix: 5000, url: 'https://www.amazon.in/s?k=laptops' },
        { name: 'accessories', prefix: 6000, url: 'https://www.amazon.in/s?k=electronic+accessories' }
    ];

    const allProducts = [];
    let sqlQueries = 'INSERT INTO Product (Prod_ID, Name, Category, Price, Image_URL) VALUES\n';

    for (const category of categoryURLs) {
        await page.goto(category.url, { waitUntil: 'load', timeout: 0 });

        // Extract data from the current category
        const items = await page.evaluate((categoryName, prefix) => {
            const itemElements = document.querySelectorAll('.s-main-slot .s-result-item');
            const itemList = [];
            let itemCount = 1;

            itemElements.forEach((item) => {
                const name = item.querySelector('h2 a span')?.textContent;
                const image = item.querySelector('img')?.getAttribute('src');
                const priceWhole = item.querySelector('.a-price-whole')?.textContent;
                const priceFraction = item.querySelector('.a-price-fraction')?.textContent || '';

                if (name && image && priceWhole) {
                    itemList.push({
                        Prod_ID: prefix + itemCount, // Unique ID
                        Name: name.trim().replace(/'/g, "''").replace(/"/g, '\\"')  , // Escape single quotes for SQL
                        Category: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                        Price: parseFloat(`${priceWhole.replace(/,/g, '')}.${priceFraction}`), // Price as decimal
                        Image_URL: image.trim()
                    });
                    itemCount++;
                }
            });

            return itemList;
        }, category.name, category.prefix);

        // Add items to the product list and SQL queries
        items.forEach(item => {
            allProducts.push(item);
            sqlQueries += `(${item.Prod_ID}, '${item.Name}', '${item.Category}', ${item.Price}, '${item.Image_URL}'),\n`;
        });
    }

    // Finalize SQL query by removing the last comma and adding a semicolon
    sqlQueries = sqlQueries.slice(0, -2) + ';\n';

    // Save JSON and SQL files
    fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2));
    fs.writeFileSync('insert_products.sql', sqlQueries);

    console.log("Products saved to products.json and insert_products.sql");

    await browser.close();
})();
