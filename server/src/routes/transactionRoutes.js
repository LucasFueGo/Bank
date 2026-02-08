import express from 'express';
import { getAllTransactions, createTransaction} from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllTransactions);
router.post('/', createTransaction);

export default router;