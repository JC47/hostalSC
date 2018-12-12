//Paquetes de node
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const speakeasy = require('speakeasy');
//Importaciones locales
const Admin = require('../models/admin');
const {verificaToken,verificaTokenAdmin,verificaTokenRoot} = require('../middlewares/auth');
const app = express();


//Obtener admin
app.get('/all', [verificaToken, verificaTokenAdmin] , (req,res) => {

  Admin.find().exec((err,admins) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }
      res.json({
        ok:true,
        admins
      });

  });
});

//Agregar admin
app.post('/add', [verificaToken, verificaTokenRoot] , (req,res) => {
  let admin = new Admin({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  });

  admin.save((err, adminDB) => {

    if(err != null){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok:true,
      admin:adminDB
    });
  });
});

//Editicion de admin
app.put('/update/:id', [verificaToken,verificaTokenRoot], (req,res) => {
  let id = req.params.id;
  let body = _.pick(req.body,["nombre","email","img"]);

  Admin.findOneAndUpdate(id, body, {new:true, runValidators:true} ,(err,adminDB) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      admin: adminDB
    });
  });
});

//Borrar usuario
app.delete('/delete/:id', [verificaToken, verificaTokenRoot], (req,res) => {
  let id = req.params.id;

  Admin.findOneAndRemove({_id:id}, (err, adminX) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }
    if(!adminX){
      return res.status(400).json({
        ok:false,
        err:"Usuario no encontrado"
      });
    }
    res.json({
      ok:true
    });
  })
});

//Login normal
app.post('/login', (req,res)=>{
  let email = req.body.email;
  let pass = req.body.password;

  Admin.findOne({email}, (err, adminDB) => {
    if(err != null){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    if(!adminDB){
      return res.status(500).json({
        ok:false,
        err: "El (usuario) o contraseña incorrectos"
      });
    }

    if(!bcrypt.compareSync(pass, adminDB.password)){
      return res.status(500).json({
        ok:false,
        err: "El usuario o (contraseña) incorrectos"
      });
    }

    let token = jwt.sign({
      admin:adminDB
    }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      admin: adminDB,
      token
    });
  });
});

//Login root
app.post('/root', (req,res) => {
  let token = req.body.token;
  console.log(token);

  let verified = speakeasy.totp.verify({
  secret: process.env.SECRET,
  encoding: 'base32',
  token
  });

  if(!verified){
    return res.status(500).json({
      ok:false,
      err: "Token invalido o expirado"
    });
  }

  Admin.findOne({role:"ROOT"}, (err,adminDB) => {
    if(!adminDB){
      return res.status(500).json({
        ok:false,
        err: "Root no existe"
      });
    }

    let token = jwt.sign({
      admin:adminDB
    }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      admin: adminDB,
      token
    });

  });

});


module.exports = app;
