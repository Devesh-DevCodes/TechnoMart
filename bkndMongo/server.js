require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Database connection error:", err));

// Define MongoDB Schemas
const productSchema = new mongoose.Schema({
  Prod_ID: Number,
  Name: String,
  Category: String,
  Price: Number,
  Image_URL: String,
});

const cartSchema = new mongoose.Schema({
  Prod_ID: Number,
  Name: String,
  Price: Number,
  Image_URL: String,
  Quantity: { type: Number, default: 1 },
});

const Product = mongoose.model("Product", productSchema, "products");
const Cart = mongoose.model("Cart", cartSchema, "cart");

// --------------------- Routes ----------------------

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add Product Endpoint
app.post('/api/add-product', async (req, res) => {
    const { Prod_ID, Name, Category, Price, Image_URL } = req.body;
  
    try {
      const newProduct = new Product({ Prod_ID, Name, Category, Price, Image_URL });
      await newProduct.save();
      res.status(201).send('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.code === 11000) { // Duplicate key error
        res.status(400).send('Product with the same Prod_ID already exists.');
      } else {
        res.status(500).send('Failed to add product.');
      }
    }
  });

  // Add Multiple Products Endpoint
app.post('/api/add-products', async (req, res) => {
    const products = req.body; // Expecting an array of products
  
    try {
      await Product.insertMany(products, { ordered: false }); // ordered: false allows partial inserts
      res.status(201).send('Products added successfully!');
    } catch (error) {
      console.error('Error adding products:', error);
      if (error.code === 11000) { // Duplicate key error
        res.status(400).send('Some products already exist.');
      } else {
        res.status(500).send('Failed to add some products.');
      }
    }
  });
  

// ------------------- Update a Product -------------------
app.put('/api/update-product/:id', (req, res) => {
    const { id } = req.params;
    const { Prod_ID, Name, Category, Price, Image_URL } = req.body;
  
    Product.findByIdAndUpdate(id, { Prod_ID, Name, Category, Price, Image_URL }, { new: true })
      .then(updatedProduct => res.json(updatedProduct))
      .catch(err => res.status(500).json({ error: 'Error updating product', details: err }));
  });

  // ------------------- Delete a Product -------------------
app.delete('/api/delete-product/:id', (req, res) => {
    const { id } = req.params;
  
    Product.findByIdAndDelete(id)
      .then(deletedProduct => res.json({ message: 'Product deleted successfully', product: deletedProduct }))
      .catch(err => res.status(500).json({ error: 'Error deleting product', details: err }));
  });
  


  // ------------------- Clear all Products -------------------
  app.delete('/api/clear-products', (req, res) => {
    Product.deleteMany()
      .then(() => res.json({ message: 'All products deleted successfully' }))
      .catch(err => res.status(500).json({ error: 'Error clearing products', details: err }));
  });
  
  
// Add to cart
app.post("/add-to-cart", async (req, res) => {
  const { Prod_ID, Name, Price, Image_URL } = req.body;

  try {
    const existingItem = await Cart.findOne({ Prod_ID });

    if (existingItem) {
      existingItem.Quantity += 1;
      await existingItem.save();
      res.send("Quantity updated in cart");
    } else {
      const newCartItem = new Cart({ Prod_ID, Name, Price, Image_URL });
      await newCartItem.save();
      res.send("Product added to cart");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get cart items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find({});
    res.json(cartItems);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update cart quantity
app.post("/update-cart", async (req, res) => {
  const { Prod_ID, quantity } = req.body;

  try {
    await Cart.updateOne({ Prod_ID }, { $set: { Quantity: quantity } });
    res.send("Cart updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Remove item from cart
app.post("/remove-from-cart", async (req, res) => {
  const { Prod_ID } = req.body;

  try {
    await Cart.deleteOne({ Prod_ID });
    res.send("Item removed from cart");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Clear cart
app.post("/clear-cart", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.send("Cart cleared");
  } catch (err) {
    res.status(500).send(err);
  }
});


// --------------------- Start Server ----------------------
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
