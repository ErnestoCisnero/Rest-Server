const mongoose = require('mongoose');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario
    },

    descripcion: {
        type: String
    }
});

module.exports = mongoose.model('Categorias', categoriaSchema);