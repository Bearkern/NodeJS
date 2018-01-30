var express = require('express');
var router = express.Router();

router.get('/cart-list', function(req, res) {
    res.send('Cart List');
});

router.get('/cart-total', function(req, res) {
    res.send('Cart Total');
});

module.exports = router;