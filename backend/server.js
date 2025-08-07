import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Middleware


app.use(cors({
  origin: "http://localhost:3000", // React app origin
  credentials: true
}));

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);  // 👈 Mount auth routes
app.use("/api/tasks", taskRoutes); // 👈 Mount task routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
