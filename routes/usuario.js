var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");

const Usuario = require('../models/usuario');

router.get('/', async (req, res, next) => {
    const usuarios = await Usuario.find();
    res.render('usuario', { title: 'Usuarios', usuarios });
});

router.post('/nuevo', async (req, res, next)=>{
    const usuario = new Usuario(req.body);
    let hashPassword = await bcrypt.hash(req.body.clave, 10,);
    usuario.clave = hashPassword;
    await usuario.save();
    res.redirect('/usuario');
});

router.get('/eliminar/:id', async (req, res, next)=>{
    const { id } = req.params;
    await Usuario.remove({_id: id});
    res.redirect('/usuario');
});


module.exports = router;