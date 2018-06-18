const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditoriaSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    usuario: {
        type: ObjectId,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    tabla: {
        type: String,
        required: true
    },
    anterior: Object,
    nuevo: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('auditoria',AuditoriaSchema);