import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from './routes/commentRoutes';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi untuk menyajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/comments', commentRoutes);

// Global error handling
app.use(
  (
    err: Error, // Using Error type for better error handling
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
