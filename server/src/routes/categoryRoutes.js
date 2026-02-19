import express from 'express';
import { createCategory, getCategories, getCategoriesById } from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createCategory);
router.get('/', authenticateToken, getCategories);
router.get('/:id', authenticateToken, getCategoriesById);

export default router;