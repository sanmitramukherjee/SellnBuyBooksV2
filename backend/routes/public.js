const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Purchase = require('../models/Purchase');
const User = require('../models/User');

// GET /api/books/recent
router.get('/books/recent', async (req, res) => {
  try {
    const books = await Book.find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .select('title author cover'); // select only necessary fields

    res.json(books);
  } catch (err) {
    console.error('Error fetching recent books:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/stats
router.get('/stats', async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const listedToday = await Book.countDocuments({ createdAt: { $gte: todayStart } });
    const boughtToday = await Purchase.countDocuments({ date: { $gte: todayStart } });
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: todayStart } });

    res.json({
      listed: listedToday,
      bought: boughtToday,
      users: activeUsers
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
