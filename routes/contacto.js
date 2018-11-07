const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Contacto = require('../models/contacto');
const app = express();

app.post('/contactar', (req,res) => {

  let body = req.body;

  let contacto = new Contacto({
    nombre: body.nombre,
    email: body.email,
    telefono: body.telefono
  });

  contacto.save((err,Contactodb) => {

    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      msg: "Contacto registrado"
    });
  });
});


module.exports = app;
