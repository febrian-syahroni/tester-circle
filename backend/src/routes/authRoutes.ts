import express from "express";
import { register, login } from "../controllers/authController";
import {
  validateLogin,
  validateRegistration,
  handleValidationErrors,
} from "../middleware/validationMiddleware";

const router = express.Router();

// Rute registrasi dengan validasi
router.post(
  "/register",
  validateRegistration,
  handleValidationErrors,
  register
);

// Rute login dengan validasi
router.post("/login", validateLogin, handleValidationErrors, login);

// Rute untuk membuat postingan dengan autentikasi
// router.post("/posts", authenticateToken, createPost); // Added missing semicolon

// Rute yang dilindungi (contoh penggunaan authMiddleware)
router.get("/protected", (req, res) => {
  res.send("Protected content");
});

export default router;
