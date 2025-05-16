import express from "express";
import cors from "cors";
// Import routes
import bookRoutes from "./route/book.route.js";
import userRoutes from "./route/user.route.js";
import contactRoutes from "./route/contact.route.js";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
// app.use(express.static("public"));
// app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", bookRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", contactRoutes);
export default app;
