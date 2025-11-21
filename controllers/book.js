// controllers/book.js
import Book from "../models/book.js";

export async function getAllBooks(req, res) {
  try {
    const books = await Book.find().lean();
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addBook(req, res) {
  try {
    const { ISBN, title, author } = req.body;
    if (!ISBN || !title || !author)
      return res.status(400).json({ message: "ISBN, title and author required" });

    // If you want ISBN unique enforce earlier; here we just check
    const exists = await Book.findOne({ ISBN });
    if (exists) return res.status(409).json({ message: "Book already exists" });

    const book = await Book.create({ ISBN, title, author });
    return res.status(201).json({ message: "Book added", book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBooksByISBN(req, res) {
  try {
    const { isbn } = req.params;
    if (!isbn) return res.status(400).json({ message: "ISBN required" });

    const books = await Book.find({ ISBN: isbn }).lean();
    if (!books.length) return res.status(404).json({ message: "No book found" });
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBooksByTitle(req, res) {
  try {
    const { title } = req.params;
    if (!title) return res.status(400).json({ message: "title required" });

    const books = await Book.find({ title }).lean();
    if (!books.length) return res.status(404).json({ message: "No book found" });
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBooksByAuthor(req, res) {
  try {
    const { author } = req.params;
    if (!author) return res.status(400).json({ message: "author required" });

    const books = await Book.find({ author }).lean();
    if (!books.length) return res.status(404).json({ message: "No book found" });
    return res.json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}




