import express from 'express';
import { createComment, getComments } from '../controllers/commentController';

const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getComments);

export default router;
