const express = require('express');
const router = express.Router();

const cartController = require('./cartController');
const cartAPI = require('./cartAPI');
const userController = require('../users/userController');

router.get('/', cartController.index);
router.get('/checkout', userController.isLogin, cartController.checkout);

router.post('/checkout',cartController.createOrder);
router.post('/add', cartAPI.addToCart);
router.delete('/:id/delete', cartAPI.removeFromCart);
router.patch('/:id/update', cartAPI.changeQuantity);

module.exports = router;