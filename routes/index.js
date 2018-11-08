const express = require('express');
const app = express();

app.use(require('./contacto'));

module.exports = app;
