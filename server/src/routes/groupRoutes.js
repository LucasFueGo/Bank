import express from 'express';
import { 
    createGroup, 
    getGroups, 
    getGroupById,
    getGroupStats
} from '../controllers/groupController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', createGroup);
router.get('/', getGroups);
router.get('/:id', getGroupById);
router.get('/:id/stats', getGroupStats);

export default router;