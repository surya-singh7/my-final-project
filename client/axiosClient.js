// client/axiosClient.js
import axios from "axios";

const BASE = "http://localhost:4000/api/v1"; // TODO: change port if different

// Task 10: Get all books — Using async/await
async function getAllBooks() {
  try {
    const res = await axios.get(`${BASE}/books`);
    console.log("Task 10 — All books:", res.data);
  } catch (err) {
    console.error("Task 10 Error:", err.response?.data || err.message);
  }
}

// Task 11: Search by ISBN — Using Promises (.then/.catch)
function getBookByISBN(isbn) {
  axios
    .get(`${BASE}/books/isbn/${encodeURIComponent(isbn)}`)
    .then((res) => {
      console.log("Task 11 — Books by ISBN:", res.data);
    })
    .catch((err) => {
      console.error("Task 11 Error:", err.response?.data || err.message);
    });
}

// Task 12: Search by Author — Using async/await
async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`${BASE}/books/author/${encodeURIComponent(author)}`);
    console.log("Task 12 — Books by Author:", res.data);
  } catch (err) {
    console.error("Task 12 Error:", err.response?.data || err.message);
  }
}

// Task 13: Search by Title — Using Promises
function getBooksByTitle(title) {
  axios
    .get(`${BASE}/books/title/${encodeURIComponent(title)}`)
    .then((res) => {
      console.log("Task 13 — Books by Title:", res.data);
    })
    .catch((err) => {
      console.error("Task 13 Error:", err.response?.data || err.message);
    });
}

// // Demo run
// (async () => {
//   await getAllBooks();
//   getBookByISBN("978-3-16-148410-0"); // example ISBN
//   await getBooksByAuthor("J.K. Rowling"); // example author
//   getBooksByTitle("Some Book Title");
// })();
// Demo run
(async () => {
  console.log("--- Starting Task 10: Get All Books ---");
  await getAllBooks();

  console.log("\n--- Starting Task 11: Search by ISBN ---");
  // Yaha wo ISBN dalo jo tumne add kiya tha
  getBookByISBN("978-0132350884");

  console.log("\n--- Starting Task 12: Search by Author ---");
  // Yaha wo Author dalo jo database me hai
  await getBooksByAuthor("Robert C. Martin");

  console.log("\n--- Starting Task 13: Search by Title ---");
  // Yaha wo Title dalo jo database me hai
  getBooksByTitle("Clean Code");
})();
