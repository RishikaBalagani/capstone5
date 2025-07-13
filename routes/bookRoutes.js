const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// 📌 Show all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().sort({ readDate: -1 });
        res.render("books", { books });
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Server Error");
    }
});

// 📌 Show "Add New Book" form
router.get("/add", (req, res) => {
    res.render("addBook");
});

// 📌 Add a new book
router.post("/add", async (req, res) => {
    try {
        const { title, author, rating, notes, readDate } = req.body;
        await Book.create({ title, author, rating, notes, readDate });
        res.redirect("/books");
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Server Error");
    }
});

// 📌 Show "Edit Book" form
router.get("/edit/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render("editBook", { book });
    } catch (err) {
        console.error("Error fetching book:", err);
        res.status(500).send("Server Error");
    }
});

// 📌 Update book details
router.post("/update/:id", async (req, res) => {
    try {
        const { title, author, rating, notes, readDate } = req.body;
        await Book.findByIdAndUpdate(req.params.id, { title, author, rating, notes, readDate });
        res.redirect("/books");
    } catch (err) {
        console.error("Error updating book:", err);
        res.status(500).send("Server Error");
    }
});

// 📌 Delete a book
router.post("/delete/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/books");
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

