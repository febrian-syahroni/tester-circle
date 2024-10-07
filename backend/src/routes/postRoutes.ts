import express from "express";
import { createPost, getPosts } from "../controllers/postController";
import upload from "../middleware/uploadMiddleware";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.post("/", authenticateToken, upload.single("image"), createPost);
router.get("/", getPosts);

export default router;
