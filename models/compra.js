const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    tercero: {
        type: ObjectId,
        required: true
    },
    producto: {
        type: ObjectId,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    valor: Number,
    usuario: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model('compras',CompraSchema);