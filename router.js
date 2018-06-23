var express = require('express');
var router = express.Router();

const { authorize, logout, profile, login } = require('./controller/usuario');
const { createUser, updateUser, allUsers, deleteUser } = require('./controller/usuario');
const { createProducto, updateProducto, allProductos, deleteProducto } = require('./controller/producto');
const { createTercero, viewTercero, updateTercero, allTerceros, deleteTercero } = require('./controller/tercero');

router.get('/', authorize, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// USER ROUTES
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'COMPRA VENTA' });
});

router.post('/login', login);
router.get('/logout', logout);
router.get('/perfil', authorize, profile);


// USER ROUTER
router.get('/usuario', authorize, allUsers);
router.post('/usuario/nuevo', authorize, createUser);
router.get('/usuario/eliminar/:id', authorize, deleteUser);

// PRODUCT ROUTES
router.get('/producto', authorize, allProductos);
router.post('/producto/nuevo', authorize, createProducto);
router.get('/producto/eliminar/:id', authorize, deleteProducto);

// TERCERO ROUTES
router.get('/tercero', authorize, allTerceros);
router.get('/tercero/view/:id', authorize, viewTercero);
router.post('/tercero/nuevo', authorize, createTercero);
router.post('/tercero/update/:id', authorize, updateTercero);
router.get('/tercero/eliminar/:id', authorize, deleteTercero);

module.exports = router;
