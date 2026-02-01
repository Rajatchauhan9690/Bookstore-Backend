// server.js (or index.js)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js"; // Your DB connection function

// Import routes
import bookRoutes from "./src/route/book.route.js";
import userRoutes from "./src/route/user.route.js";
import contactRoutes from "./src/route/contact.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://bookstore-frontend-tawny.vercel.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Static folder for uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/v1/books", bookRoutes); // Prefix books routes
app.use("/api/v1/users", userRoutes); // Prefix users routes
app.use("/api/v1/contacts", contactRoutes); // Prefix contacts routes

// Start server after DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

export default app;
