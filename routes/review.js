// routes/review.js
import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import * as reviewControllers from "../controllers/review.js";

const router = Router();

// registered users
router.put("/books/:id/reviews", authenticate, reviewControllers.addReview);
router.delete("/books/:id/reviews", authenticate, reviewControllers.deleteReview);

// general users
router.get("/books/:id/reviews", reviewControllers.getReview);

export default router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkyMDA2NWUyZDk4ZGFjY2NhMTk5OTQ2IiwidXNlcm5hbWUiOiJzdXJ5YWRldiIsImlhdCI6MTc2MzcwNjQ3NH0._xvU6LUHwqTCAQ0bMox0Eythl7_eF0bBXo0FkCpv470