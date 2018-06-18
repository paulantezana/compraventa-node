var express = require('express');
var router = express.Router();

const Tercero = require('../models/tercero');

router.get('/', async (req, res, next) => {
    const terceros = await Tercero.find();
    res.render('tercero', { title: 'Terceros', terceros });
});

router.post('/nuevo', async (req, res, next)=>{
    const tercero = new Tercero(req.body);
    await tercero.save();
    res.redirect('/tercero');
});

router.get('/eliminar/:id', async (req, res, next)=>{
    const { id } = req.params;
    await Tercero.remove({_id: id});
    res.redirect('/tercero');
});


module.exports = router;