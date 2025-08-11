const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, default: 'Unknown', trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, trim: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);

