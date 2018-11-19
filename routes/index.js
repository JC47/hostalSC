const express = require('express');
const app = express();

//Importaciones de las rutas
const usuario = require('./usuario');
const admin = require('./admin');

//Para formilario de contacto
app.use(require('./contacto'));
app.use('/usuario',usuario);
app.use('/admin',admin);

module.exports = app;
