require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // 'technomart'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Product API Route
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM Product';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


// Endpoint to add item to cart
app.post('/add-to-cart', (req, res) => {
    const { Prod_ID, Name, Price, Image_URL } = req.body;
  
    const sqlCheck = 'SELECT * FROM Cart WHERE Prod_ID = ?';
    db.query(sqlCheck, [Prod_ID], (err, result) => {
      if (err) return res.status(500).send(err);
  
      if (result.length > 0) {
        const sqlUpdate = 'UPDATE Cart SET Quantity = Quantity + 1 WHERE Prod_ID = ?';
        db.query(sqlUpdate, [Prod_ID], (err, result) => {
          if (err) return res.status(500).send(err);
          res.send('Quantity updated in cart');
        });
      } else {
        const sqlInsert = 'INSERT INTO Cart (Prod_ID, Name, Price, Image_URL) VALUES (?, ?, ?, ?)';
        db.query(sqlInsert, [Prod_ID, Name, Price, Image_URL], (err, result) => {
          if (err) return res.status(500).send(err);
          res.send('Product added to cart');
        });
      }
    });
  });
  
  
  // Endpoint to get cart items
  app.get('/cart/', (req, res) => {
    // Get cart items from the database
    const sql = 'SELECT * FROM Cart';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error fetching cart data');
      }
      res.json(result); // Send cart items to frontend
    });
  });
  
  // Endpoint to update cart quantity
  app.post('/update-cart', (req, res) => {
    const { Prod_ID, quantity } = req.body;
    const sql = 'UPDATE Cart SET Quantity = ? WHERE Prod_ID = ?';
    db.query(sql, [quantity, Prod_ID], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error updating cart');
      }
      res.send('Cart updated successfully');
    });
  });
  
//   Endpoint to remove item from cart
app.post('/remove-from-cart', (req, res) => {
    const { Prod_ID } = req.body;
    const sql = 'DELETE FROM Cart WHERE Prod_ID = ?';
    db.query(sql, [Prod_ID], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Error removing item from cart ${Prod_ID} `);
      }
      res.send('Item removed from cart');
    });
}); 

app.post('/clear-cart', (req, res) => {
  const { clear } = req.body;
  if (clear) {
    const sql = 'DELETE FROM Cart';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error clearing cart');
      }
      res.send('Cart cleared');
    });
  }
});

  

// Starting the Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
