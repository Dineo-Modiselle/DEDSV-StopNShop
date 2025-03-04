import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getOrders);

export default router;