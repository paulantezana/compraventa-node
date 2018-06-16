const express = require('express');
const router = express.Router();
const model = require('../models/perfil')();

router.get('/', (req, res)=>{
    model.find({},(err, tasks)=>{
        if (err) throw err;
        res.render('index',{ 
            title: 'Compra Venta',
            message: 'Hello there!'
        });
    });
});

module.exports = router;
