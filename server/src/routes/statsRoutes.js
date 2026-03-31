import express from 'express';
import { 
    getMonthlyStats,
    getYearStats,
    getExpensesByCategory
} from '../controllers/statsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/categories', getExpensesByCategory);
router.get('/month', getMonthlyStats);
router.get('/year', getYearStats);

export default router;