const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true, min: 0 },
  purchaseDate: { type: Date, default: Date.now } // ✅ Always stored
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);
