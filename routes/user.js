var express = require('express');
var router = express.Router();

router.get('/edit-profile', function (req, res) {
    res.send('profile');
});

router.get('/photo', function (req, res) {
    res.send('photo');
});

module.exports = router;