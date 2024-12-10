const fs = require('fs');

// Read the JSON file
fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const products = JSON.parse(data);
        let sqlQueries = 'INSERT INTO Product (Prod_ID, Name, Category, Price, Image_URL) VALUES\n';

        // Loop through products and create SQL insert statements
        products.forEach((product, index) => {
            sqlQueries += `(${product.Prod_ID}, '${product.Name.replace(/'/g, "''")}', '${product.Category}', ${product.Price}, '${product.Image_URL}')`;

            // Add a comma for all but the last record
            if (index < products.length - 1) {
                sqlQueries += ',\n';
            } else {
                sqlQueries += ';\n'; // End the last query with a semicolon
            }
        });

        // Save the SQL file
        fs.writeFile('insert_products.sql', sqlQueries, (err) => {
            if (err) {
                console.error('Error writing SQL file:', err);
            } else {
                console.log('SQL queries saved to insert_products.sql');
            }
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});
