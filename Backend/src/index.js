import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"; 
import messageRoutes from "./routes/message.route.js";

dotenv.config();
console.log(process.env.CLOUDINARY_API_KEY,"=========")
const app= express();

const PORT = process.env.PORT;
app.use(express.json({ limit: "10mb" })); // ✅ Increase request size limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: "http://localhost:5173", // ✅ Allow frontend origin
    credentials: true 
  }));

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});
