const express = require('express');
const router = express.Router();
const model = require('../models/perfil')();

router.get('/', (req, res)=>{
    res.render('index',{ 
        title: 'Compra Venta',
        message: 'Hello there!'
    });
    model.find({},(err, perfiles)=>{
        if (err) throw err;
    });
});

module.exports = router;
