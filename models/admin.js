const mongoose = require('mongoose');

let roles = {
  values: ['ADMIN_ROLE','ROOT'],
  message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let adminSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  role: {
    type: String,
    default: 'ADMIN_ROLE',
    enum: roles
  },
  img: {
    type: String,
    default: 'no-image.png'
  }
});

adminSchema.methods.toJSON = function () {
  let admin = this;
  let adminObject = admin.toObject();

  delete adminObject.password;

  return adminObject;
}


module.exports = mongoose.model('Admin', adminSchema);
