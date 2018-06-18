const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedorSchema = new Schema({
    identificacion: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('proveedores',ProveedorSchema);