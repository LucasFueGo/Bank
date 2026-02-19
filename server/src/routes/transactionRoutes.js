import express from 'express';
import { 
    getAllTransactions, 
    getTransactions,
    getTransactionById,
    getMonthlyStats, 
    createTransaction,
    getExpensesByCategory,
    updateTransaction
} from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/stats', getMonthlyStats);
router.get('/categories', getExpensesByCategory);
router.get('/all', getAllTransactions);
router.get('/', getTransactions);
router.post('/', createTransaction);

router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);


export default router;