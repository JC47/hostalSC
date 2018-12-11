const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let hotelSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    politicas_ninios: {
        type: String,
        required: true
    },
    max_age_children: {
        type: Number,
        required: true
    },
    servicios: [String],
    habitaciones: [{ type: Schema.ObjectId, ref: "Habitacion" }],
});

module.exports = mongoose.model('Hotel', hotelSchema);