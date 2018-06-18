const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuario = require('./usuario');

const PerfilSchema = new Schema({
    perfil: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    usuarios: [usuario]
});

module.exports = mongoose.model('perfiles',PerfilSchema);
