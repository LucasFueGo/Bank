import express from 'express';
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);

export default router;