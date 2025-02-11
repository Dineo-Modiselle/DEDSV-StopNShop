import express from 'express';
import { sampleProducts } from '../models/Product.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(sampleProducts);
});

router.get('/:id', (req, res) => {
  const product = sampleProducts.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

export default router;