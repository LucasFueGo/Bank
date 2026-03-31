import express from 'express';
import { 
    getAllTransactions, 
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    search
} from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);


router.get('/all', getAllTransactions);
router.get('/search/:search', search);

router.get('/', getTransactions);
router.post('/', createTransaction);

router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);


export default router;