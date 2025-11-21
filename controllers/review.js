// controllers/review.js
import Review from "../models/review.js";
import Book from "../models/book.js";

export async function addReview(req, res) {
  try {
    const { user_id } = req.user;
    const { id: bookId } = req.params;
    const { review_text } = req.body;

    if (!review_text) return res.status(400).json({ message: "review_text required" });

    // ensure book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // upsert: try to update existing review, else create
    const filter = { userId: user_id, bookId };
    const update = { review_text };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const review = await Review.findOneAndUpdate(filter, update, options);
    return res.status(200).json({ message: "Review added/updated", review });
  } catch (error) {
    // handle unique index duplicate key gracefully
    if (error.code === 11000) {
      return res.status(409).json({ message: "You already reviewed this book" });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getReview(req, res) {
  try {
    const { id: bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate("userId", "username").lean();
    if (!reviews.length) return res.status(404).json({ message: "No review found for this book" });
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { user_id } = req.user;
    const { id: bookId } = req.params;

    const result = await Review.deleteOne({ userId: user_id, bookId });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "No review found for that user to delete" });

    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

