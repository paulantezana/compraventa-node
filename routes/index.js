var express = require('express');
var router = express.Router();

const Usuario = require('../models/usuario');

router.get('/', function(req, res, next) {
    if (!req.session){
        res.redirect('/login');
    }
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    if (!req.session){
        res.render('login', { title: 'COMPRA VENTA' });
    }else {
        res.redirect('/');
    }
});

router.get('/perfil', function(req, res, next) {
    res.render('perfil', { title: 'COMPRA VENTA' });
});

//POST route for updating data
router.post('/login', function(req, res, next){
    console.log(req.body);
    if (req.body.usuario && req.body.clave) {
        Usuario.authenticate(req.body.usuario, req.body.clave, function (error, user) {
            if (error || !user) {
                let err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/');
            }
        });
    }else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            return err ? next(err) : res.redirect('/');
        });
    }
});

module.exports = router;
