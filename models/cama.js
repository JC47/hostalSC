const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let camaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El tipo de cama es requerdio']
    },
    ocupacion: {
        type: Number,
        required: [true, 'La ocupación de la cama es requerida']
    }
});

module.exports = mongoose.model('Cama', camaSchema);