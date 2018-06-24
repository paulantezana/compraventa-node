const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const logout = (req, res, next)=> {
    if (req.session) {
        req.session.destroy(function (err) {
            return err ? next(err) : res.redirect('/');
        });
    }
}

const login = async (req, res, next)=> {
    // Validations
    if(!req.body.clave || !req.body.usuario){
        return res.render('login', { 
            title: 'COMPRA VENTA',
            erros: 'Lenar todo los campos'
        });
    }

    // Get values
    let usuario = req.body.usuario;
    let clave = req.body.clave;

    // Search and validate user and password
    await Usuario.findOne({usuario}).exec(function (err, user) {
        if (err) {
            return res.render('login', { 
                title: 'COMPRA VENTA',
                erros: err
            });
        } else if (!user){
            return res.render('login', { 
                title: 'COMPRA VENTA',
                erros: 'Este usuario no existe'
            });
        }

        bcrypt.compare(clave, user.clave, function (err, result) {
            if (result === true) {
                req.session.usuario = user;
                return res.redirect('/perfil');
            } else {
                return res.render('login', { 
                    title: 'COMPRA VENTA',
                    erros: 'La contraseña es incorrecta'
                });
            }
        })
    })
}

const profile = async (req, res, next) => {
    await Usuario.findById(req.session.usuario._id).exec(function(err, user){
        if (err) {
            return next(err);
        }else {
            return res.render('perfil', { title: user.usuario, usuario: user  });
        }
    })
}

const authorize = (req, res, next)=>{
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect('/login')
    }
}

const createUser = async (req, res, next)=>{
    const usuario = new Usuario(req.body);
    let hashPassword = await bcrypt.hash(req.body.clave, 10,);
    usuario.clave = hashPassword;
    await usuario.save();
    res.redirect('/usuario');
}

const updateUser = async (req, res, next)=>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate({_id: id},req.body);
    res.redirect('/usuario/view/' + usuario._id);
}

const allUsers = async (req, res, next)=>{
    const usuarios = await Usuario.find();
    res.render('usuario', { title: 'Usuarios', usuarios });
}

const deleteUser = async (req, res, next)=>{
    const { id } = req.params;
    await Usuario.remove({_id: id});
    res.redirect('/usuario');
}

const viewUser = async (req, res, next) => {
    const { id } = req.params;
    let usuario = await Usuario.findById({_id:id})
    res.render('usuarioedit', { title: 'Usuario', usuario });
}

module.exports = {
    logout,
    login,
    profile,
    authorize,
    createUser,
    updateUser,
    allUsers,
    deleteUser,
    viewUser
}