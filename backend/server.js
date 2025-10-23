import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
const app = express();
const DEFAULT_PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Root route
app.get("/", (req, res) => res.send("✅ Online Medical Appointment API is running..."));

// MongoDB connect + server start with fallback
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");

    const server = app.listen(DEFAULT_PORT, () => {
      console.log(`🚀 Server running on http://localhost:${DEFAULT_PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        const newPort = parseInt(DEFAULT_PORT) + 1;
        console.warn(`⚠️ Port ${DEFAULT_PORT} in use, retrying on ${newPort}...`);
        app.listen(newPort, () => {
          console.log(`🚀 Server running on http://localhost:${newPort}`);
        });
      } else {
        console.error("❌ Server error:", err);
      }
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

startServer();
