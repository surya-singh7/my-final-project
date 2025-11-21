// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connection.js";

// models (importing registers schemas with mongoose)
import "./models/user.js";
import "./models/book.js";
 import "./models/review.js";


// routes
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

app.use(notFoundHandler);

// start server after connecting to DB
(async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}!`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
})();

