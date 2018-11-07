const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const nodemailer = require('nodemailer');
const Contacto = require('../models/contacto');
const app = express();

app.post('/contactar', (req,res) => {

  let body = req.body;

  let contacto = new Contacto({
    nombre: body.nombre,
    email: body.email,
    telefono: body.telefono,
    comentario: body.comentario
  });

  contacto.save((err,Contactodb) => {

    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    const output = `<h1>Contacto nuevo para el hostal <h1><br><br><h3>Nombre: ${body.nombre}</h3><h3>Email: ${body.email}</h3><h3>Telefono: ${body.telefono}</h3><h3>Comentario: ${body.comentario}</h3>`;

    const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
            user: 'javiercalette@gmail.com',
            pass: process.env.gmail_pass || 'cornelio96'
        }
    });

    const mailOptions = {
      from: 'javiercalette@gmail.com',
      to: "tec_melo@hotmail.com",
      subject: 'Usuario buscando contactarse',
      html: output
    };

    transporter.sendMail(mailOptions, function (err, info) {
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
});


module.exports = app;
