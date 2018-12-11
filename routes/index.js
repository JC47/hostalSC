const express = require('express');
const app = express();

//Importaciones de las rutas
const usuario = require('./usuario');
const admin = require('./admin');
const cama = require('./cama');
const activo = require('./activo');
//const habitacion = require('./habitacion');
//const hotel = require('./hotel');

//Para formilario de contacto
app.use(require('./contacto'));
app.use('/usuario',usuario);
app.use('/admin',admin);
app.use('/cama', cama);
app.use('/activo', activo);
//app.use('/hotel', hotel);
//app.use('/habitacion', habitacion);

module.exports = app;
