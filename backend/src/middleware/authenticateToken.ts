import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get token from Authorization header
  const authHeader = req.header("Authorization");

  const token = authHeader?.split(" ")[1]; // Assuming "Bearer <token>"

  if (!token) {
    res.status(401).send("Unauthorized"); // Send unauthorized response if no token
    return; // Ensure to return after sending a response
  }

  const secret = process.env.JWT_SECRET; // Get JWT secret from environment variable

  if (!secret) {
    res.status(500).send("Internal Server Error: JWT_SECRET not defined"); // Check if secret is defined
    return; // Ensure to return after sending a response
  }

  // Verify the token
  jwt.verify(token, secret, (err, decode: any) => {
    if (err) {
      res.status(403).send("Forbidden"); // Send forbidden response if token is invalid
      return; // Ensure to return after sending a response
    }

    res.locals.id = decode.id;

    next(); // Call next middleware/route handler if token is valid
  });
};

export default authenticateToken;
