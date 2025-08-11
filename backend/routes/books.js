// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const Book = require('./models/Book'); // adjust to your model path
// const router = express.Router();

// // Ensure uploads folder exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // Serve uploads statically
// router.use('/uploads', express.static(uploadsDir));

// // POST /api/books
// router.post('/books', upload.single('image'), async (req, res) => {
//   try {
//     const { title, author, date, condition, price, contact, info } = req.body;

//     if (!title || !author || !price) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const book = new Book({
//       title,
//       author,
//       date,
//       condition,
//       price,
//       contact,
//       info,
//       image: imagePath
//     });

//     await book.save();
//     res.json({ message: 'Book listed successfully', book });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to list book' });
//   }
// });

// module.exports = router;
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Book = require('../models/Book'); // ✅ fixed relative path
const authMiddleware = require('../middleware/authMiddleware'); // ✅ assumes you already have one
const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Serve uploads statically
router.use('/uploads', express.static(uploadsDir));

/**
 * POST /api/books
 * Create a new book listing
 */
router.post('/books', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, author, date, condition, price, contact, info } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const book = new Book({
      title,
      author,
      date,
      condition,
      price,
      contact,
      info,
      image: imagePath,
      seller: req.user.id // ✅ store seller for delete permission
    });

    await book.save();
    res.json({ message: 'Book listed successfully', book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list book' });
  }
});

/**
 * DELETE /api/books/:id
 * Delete a book listing
 */
router.delete('/books/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Only seller or admin can delete
    if (book.seller.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete image file if exists
    if (book.image) {
      const imagePath = path.join(__dirname, '..', book.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;



