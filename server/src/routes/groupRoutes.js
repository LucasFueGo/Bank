import express from 'express';
import { createGroup, getGroups, getGroupById } from '../controllers/groupController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/', createGroup);
router.get('/', getGroups);
router.get('/:id', getGroupById);

export default router;