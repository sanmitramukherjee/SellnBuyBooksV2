// const express = require('express');
// const router = express.Router();
// const { createOrder, getOrders } = require('../controllers/orderController');

// router.post('/', createOrder);
// router.get('/:userId', getOrders);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const authenticateUser = require('../middleware/auth');

// Create order
router.post('/', authenticateUser, createOrder);

// Get orders for logged-in user
router.get('/', authenticateUser, getOrders);

module.exports = router;


