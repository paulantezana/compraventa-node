var express = require('express');
var router = express.Router();

const Proveedor = require('../models/proveedor');

router.get('/', async (req, res, next) => {
    const proveedores = await Proveedor.find();
    res.render('proveedor', { title: 'Proveedores', proveedores });
});

router.post('/nuevo', async (req, res, next)=>{
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.redirect('/proveedor');
});

router.get('/eliminar/:id', async (req, res, next)=>{
    const { id } = req.params;
    await Proveedor.remove({_id: id});
    res.redirect('/proveedor');
});


module.exports = router;