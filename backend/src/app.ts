import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db";
import authRoutes from "./routes/authRoutes"; // ✅ default import
import produkRoutes from "./routes/produkRoutes"; // ✅ default import

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/produk", produkRoutes);

export default app;
