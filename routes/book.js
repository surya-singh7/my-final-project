// routes/book.js
import { Router } from "express";
import * as bookControllers from "../controllers/book.js";

const router = Router();

router.get("/books", bookControllers.getAllBooks);
router.get("/books/isbn/:isbn", bookControllers.getBooksByISBN);
router.get("/books/title/:title", bookControllers.getBooksByTitle);
router.get("/books/author/:author", bookControllers.getBooksByAuthor);
router.post("/books", bookControllers.addBook);

export default router;


