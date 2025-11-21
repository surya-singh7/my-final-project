import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review_text: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Types.ObjectId, ref: "Book" }
});

export default mongoose.model("Review", reviewSchema);

