module.exports = ()=> {
    var db = require('../libs/connection')();
    const Schema = require('mongoose').Schema;

    var Perfil = Schema({
        perfil: String,
        status: Boolean
    });

    return db.model('perfiles', Perfil);
};