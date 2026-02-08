import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/groups', groupRoutes);

export default app;