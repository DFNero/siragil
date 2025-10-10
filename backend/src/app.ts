import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import produkRoutes from "./routes/produkRoutes"; // ✅ default import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/produk", produkRoutes);

export default app;
