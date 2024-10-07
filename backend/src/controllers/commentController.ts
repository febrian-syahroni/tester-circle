import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend the Express Request interface to include the user object
interface CustomRequest extends Request {
  user?: { id: number }; // Adjust the type based on your user object
}

const createComment = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { content, postId } = req.body;

    // Ensure that user ID is available (e.g., from your authMiddleware)
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getComments = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: { user: { select: { name: true } } }, // Assuming you want the user's name in the response
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createComment, getComments };
