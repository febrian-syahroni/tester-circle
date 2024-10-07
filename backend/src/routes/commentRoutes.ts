import express from 'express';
import { createComment, getComments } from '../controllers/commentController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/:postId', getComments);

export default router;
