// const Order = require('../models/Order');

// exports.createOrder = async (req, res) => {
//     const { bookId, buyerId } = req.body;
//     try {
//         const order = new Order({ bookId, buyerId });
//         await order.save();
//         res.status(201).json(order);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ buyerId: req.params.userId }).populate('bookId');
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order.' });
    }

    const order = new Order({
      user: req.user.id,
      items
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.book');
    res.json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

