require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Models
const Book = require('./models/Book');
const User = require('./models/User');

// Middleware
const authMiddleware = require('./middleware/auth');

const app = express();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Make uploads folder public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const purchaseRoutes = require('./routes/purchase');
const publicRoutes = require('./routes/public');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api', publicRoutes);

// ✅ Direct /me endpoint
app.get('/api/users/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Update /me endpoint
app.put('/api/users/me', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, phone, address },
            { new: true }
        ).select('-password');
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Book upload route
app.post('/api/books', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, author, condition, purchaseDate, info, phone } = req.body;
        const newBook = new Book({
            title,
            description,
            price,
            author,
            condition,
            purchaseDate,
            info,
            phone,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding book' });
    }
});

// ✅ Get books route
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching books' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.error(err));


