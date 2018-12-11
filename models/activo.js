const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let activoSchema = new Schema({
    nombre: {
        type:String,
        required: true
    },
    precio: {
        type:Number,
        required: true
    },
    descripcion: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Activo', activoSchema);