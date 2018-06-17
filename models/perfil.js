const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerfilSchema = new Schema({
    perfil: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('perfiles',PerfilSchema);
