const db = require('../libs/connection')();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Perfil = new Schema({
    perfil: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('perfiles',Perfil);