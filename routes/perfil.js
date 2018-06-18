const express = require('express');
const router = express.Router();

const Perfil = require('../models/perfil');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('perfil', { title: 'Perfil' });
});

router.post('/nuevo', async (req, res, next)=>{
    const perfil = new Perfil(req.body);
    await perfil.save();
    res.redirect('/perfil');
});

router.get('/eliminar/:id', async (req, res, next)=>{
    const { id } = req.params;
    await Perfil.remove({_id: id});
    res.redirect('/perfil');
});

module.exports = router;