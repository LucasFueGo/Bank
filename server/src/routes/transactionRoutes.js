import express from 'express';
import { 
    getAllTransactions, 
    getTransactions,
    getTransactionById,
    getMonthlyStats,
    getYearStats,
    createTransaction,
    getExpensesByCategory,
    updateTransaction,
    search
} from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);


router.get('/categories', getExpensesByCategory);
router.get('/all', getAllTransactions);
router.get('/search/:search', search);
router.get('/stats/month', getMonthlyStats);
router.get('/stats/year', getYearStats);

router.get('/', getTransactions);
router.post('/', createTransaction);

router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);


export default router;