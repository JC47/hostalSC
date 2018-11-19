const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let contactoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El mail es necesario']
  },
  telefono: {
    type: String,
    required: [true, 'El mail es necesario']
  },
  comentario: {
    type: String
  }
});

module.exports = mongoose.model('Contacto', contactoSchema);
