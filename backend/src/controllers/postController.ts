import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;
  const userId = res.locals.id; // Get the user ID from the JWT token
  const imageUrl = req.file?.filename; // Multer saves the path of the uploaded image
  console.log(userId);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized, user not found" });
    return;
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        userId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,            
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createPost, getPosts };
