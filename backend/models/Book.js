const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, default: 'Unknown', trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  condition: { type: Number, min: 1, max: 10, default: 5 },
  purchaseDate: { type: Date },
  info: { type: String, trim: true },
  phone: { type: String, trim: true },
  image: { type: String, trim: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isSold: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);

