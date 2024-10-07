import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types"; // Adjust import accordingly

const prisma = new PrismaClient();

// Register a new user
export const registerUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
export const getUserProfile = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  // Convert userId from string to number
  const userId = parseInt(req.user?.id as string, 10);

  // If userId is not a valid number, return an error response
  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
