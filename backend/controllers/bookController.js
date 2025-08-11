const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    const { title, author, price, description, sellerId } = req.body;
    try {
        const book = new Book({ title, author, price, description, sellerId });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
