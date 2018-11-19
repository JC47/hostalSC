const mongoose = require('mongoose');

let roles = {
    values: ['USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  fechaNacimiento: {
    type: Date
  },
  telefono: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  img: {
    type: String,
    default: "no-image.png"
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: roles
  },
  google:{
    default: false,
    type: Boolean
  }
});

usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);
