import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    // Wrapper to match dummyjson format expected by frontend
    res.json({ products }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /products/:id
router.get('/products/:id', async (req, res) => {
  try {
    // Find by the custom 'id' field from dummyjson, not the Mongo _id
    const product = await Product.findOne({ id: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;