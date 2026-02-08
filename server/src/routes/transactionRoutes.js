import express from 'express';
import { getAllTransactions, getTransactions, getMonthlyStats, createTransaction} from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/all', getAllTransactions);
router.get('/', getTransactions);
router.get('/stats', getMonthlyStats);
router.post('/', createTransaction);


export default router;