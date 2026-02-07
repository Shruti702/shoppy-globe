import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; // To validate product exists
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to get cart
const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

// POST /cart - Add item
router.post('/cart', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Validate Product Exists [cite: 21]
    const productExists = await Product.findById(productId);
    if (!productExists) return res.status(404).json({ message: "Product not found" });

    const cart = await getCart(req.user.id);
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /cart/:id - Update quantity
router.put('/cart/:id', protect, async (req, res) => {
  const { quantity } = req.body; // New quantity
  const productId = req.params.id; // Using product ID in URL

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /cart/:id - Remove item
router.delete('/cart/:id', protect, async (req, res) => {
  const productId = req.params.id;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;