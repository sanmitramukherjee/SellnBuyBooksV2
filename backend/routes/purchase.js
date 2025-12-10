// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/verifyToken');
// const Purchase = require('../models/purchase');
// const Book = require('../models/book');

// // POST: Create a new purchase
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const { bookId } = req.body;

//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ message: 'Book not found' });

//     const purchase = new Purchase({
//       buyer: req.userId,
//       book: book._id
//     });

//     await purchase.save();

//     res.json({ message: 'Purchase successful!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET: Fetch purchase history
// router.get('/history', verifyToken, async (req, res) => {
//   try {
//     const purchases = await Purchase.find({ buyer: req.userId }).populate('book');
//     res.json(purchases);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch history' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const Purchase = require('../models/Purchase');
const Book = require('../models/Book');

// POST: Create a new purchase (with dummy payment simulation)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { bookId } = req.body;

    // Validate book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Check if already sold
    if (book.isSold) {
      return res.status(400).json({ error: 'This book has already been sold' });
    }

    // Check if user is trying to buy their own book
    if (book.seller.toString() === req.user.id) {
      return res.status(400).json({ error: 'You cannot purchase your own book' });
    }

    // Check if user already purchased this book
    const existingPurchase = await Purchase.findOne({
      buyer: req.user.id,
      book: book._id
    });
    if (existingPurchase) {
      return res.status(400).json({ error: 'You have already purchased this book' });
    }

    // Simulate payment processing (3 second delay)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create purchase record
    const purchase = new Purchase({
      buyer: req.user.id,
      book: book._id,
      price: book.price,
      purchaseDate: new Date()
    });

    await purchase.save();

    // Mark book as sold
    book.isSold = true;
    await book.save();

    res.json({
      message: 'Purchase successful!',
      purchase: {
        id: purchase._id,
        bookTitle: book.title,
        price: book.price,
        purchaseDate: purchase.purchaseDate
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment processing failed. Please try again.' });
  }
});

// GET: Fetch purchase history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const purchases = await Purchase.find({ buyer: req.user.id }).populate('book');
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

module.exports = router;

