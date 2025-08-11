const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

// In-memory book storage
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// GET - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - Update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (title) books[bookIndex].title = title;
    if (author) books[bookIndex].author = author;

    res.json(books[bookIndex]);
});

// DELETE - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: "Book deleted", book: deletedBook[0] });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
