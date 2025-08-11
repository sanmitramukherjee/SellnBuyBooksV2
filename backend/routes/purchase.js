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

// POST: Create a new purchase
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const purchase = new Purchase({
      buyer: req.user.id,
      book: book._id
    });

    await purchase.save();
    res.json({ message: 'Purchase successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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

