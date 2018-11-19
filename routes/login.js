const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client =  new OAuth2Client(process.env.CLIENT_ID);

const speakeasy = require('speakeasy');

const Usuario = require('../models/usuario');
const app = express();

//Login usuario
app.post('/login', (req,res)=>{
  let email = req.body.email;
  let pass = req.body.password;

  Usuario.findOne({email}, (err, usuarioDB) => {
    if(err != null){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    if(!usuarioDB){
      return res.status(500).json({
        ok:false,
        err: "El (usuario) o contraseña incorrectos"
      });
    }

    if(!bcrypt.compareSync(pass, usuarioDB.password)){
      return res.status(500).json({
        ok:false,
        err: "El (usuario) o contraseña incorrectos"
      });
    }

    let token = jwt.sing({
      usuario:usuarioDB
    }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      usuario: usuarioDB,
      token
    });
  });
});

//Login root
app.post('/auth', (req,res) => {
  let utoken = req.body.token;

  let verified = speakeasy.totp.verify({
  secret: process.env.CADUCIDAD_TOKEN,
  encoding: 'base32',
  token: utoken
  });

  res.json({verified})
});

/*
admin{
  nombre,
  email,
  password,
  idhotel
}

habitaciones{
  nombre,
  camas:[],
  tipo,
  activos:[],

}
*/
