import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validasi untuk registrasi
export const validateRegistration = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
];

// Validasi untuk login
export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Middleware untuk menangani error validasi
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next(); // Jika tidak ada error, lanjutkan ke controller tanpa mengembalikan nilai
  }
};
