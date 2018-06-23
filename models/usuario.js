const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true,
        default: "USUARIO"
    },
    clave: {
        type: String,
        required: true
    }
});

//authenticate input against database
UsuarioSchema.statics.authenticate = function(usuario, clave, callback){
    Usuarios.findOne({usuario})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user){
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(clave, user.clave, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
};

let Usuarios = mongoose.model('Usuarios',UsuarioSchema);

module.exports =Usuarios;