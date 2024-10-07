import { Router } from "express";
import { getUserProfile, registerUser } from "../controllers/userController";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/register", registerUser);
router.get("/profile", authenticateToken, getUserProfile);

export default router;
