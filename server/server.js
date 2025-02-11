import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = 3000;
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use('/api/auth',authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database connection
// connectDB();

app.listen(PORT, () => {
  console.log(chalk.bold.bgYellow(`Server listening on port ${PORT}`));
});


