import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();
const prisma = new PrismaClient();

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" }); // Ubah status menjadi 409 Conflict
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

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
      res.status(500).json({ message: "Server error, please try again later" });
    } else {
      res.status(500).json({ message: "Unknown error during registration" });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res
        .status(401)
        .json({ message: "User not found. Please register first." }); // Ubah status menjadi 401 Unauthorized
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Password is wrong!" }); // Ubah status menjadi 401 Unauthorized
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Server error, please try again later" });
    } else {
      res.status(500).json({ message: "Unknown error during login" });
    }
  }
};

export { register, login };
