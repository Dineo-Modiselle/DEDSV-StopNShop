import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Get user account details
router.get('/account', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/account/orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    console.log('Orders found for user:', req.userId, orders.length);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
