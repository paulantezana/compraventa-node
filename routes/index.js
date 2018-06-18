var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.url
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'COMPRA VENTA' });
});

module.exports = router;
