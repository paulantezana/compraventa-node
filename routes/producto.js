const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

router.get('/', async (req, res, next) => {
    const productos = await Producto.find();
    res.render('producto', { title: 'Producto', productos });
});

router.post('/nuevo', async (req, res, next)=>{
    const producto = new Producto(req.body);
    await producto.save();
    res.redirect('/producto');
});

router.get('/eliminar/:id', async (req, res, next)=>{
    const { id } = req.params;
    await Producto.remove({_id: id});
    res.redirect('/producto');
});

module.exports = router;