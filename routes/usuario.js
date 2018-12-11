//Paquetes de node
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
//Para google
const {OAuth2Client} = require('google-auth-library');
const client =  new OAuth2Client(process.env.CLIENT_ID);
//Importaciones locales
const Usuario = require('../models/usuario');
const {verificaToken,verificaTokenAdmin} = require('../middlewares/auth');
const app = express();

//Obtener usuarios
app.get('/all', [verificaToken, verificaTokenAdmin], (req,res) => {

  Usuario.find().exec((err,usuarios) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }
      res.json({
        ok:true,
        usuarios
      });

  });
});

//Agregar usuario
app.post('/add', (req,res) => {
  let usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  usuario.save((err,usuarioDB) => {

    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    let token = jwt.sign({
      usuario:usuarioDB
    }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      usuario: usuarioDB,
      token
    });
  });
});

//Editicion del usuario
app.put('/update/:id', [verificaToken], (req,res) => {
  let id = req.params.id;
  let body = _.pick(req.body,["nombre","fechaNacimiento","email","img","role","estado"]);

  Usuario.findOneAndUpdate(id, body, {new:true, runValidators:true} ,(err,usuarioDB) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

//Borrar usuario
app.delete('/delete/:id', [verificaToken, verificaTokenAdmin], (req,res) => {
  let id = req.params.id;

  Usuario.findOneAndRemove({_id:id}, (err, usuarioX) => {
    if(err != null) {
      return res.status(400).json({
        ok:false,
        err
      });
    }
    if(!usuarioX){
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
        err: "El usuario o (contraseña) incorrectos"
      });
    }

    let token = jwt.sign({
      usuario:usuarioDB
    }, process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

    res.json({
      ok:true,
      usuario: usuarioDB,
      token
    });
  });
});

app.post('/google', async(req,res) => {

  let googleUser = await verify(token)
                    .catch(e=>{
                      return res.status(403).json({
                        ok:false,
                        err:e
                      });
                    });

  Usuario.findOne({email: googleUser.email}, (err,usuarioDB) => {
      if(err){
        return res.status(500).json({
          ok:false,
          err
        });
      }

      if(usuarioDB){
        if(usuarioDB.google === false){
          return res.status(400).json({
            ok:false,
            err: "Debe de usar su auth normal"
          });
        }
        else{
          let token = jwt.sign({
            usuario:usuarioDB,
          },process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

          return res.json({
            ok:true,
            usuario: usuarioDB,
            token
          });
        }
      }
      else{
        let usuario = new Usuario();

        usuario.nombre = googleUser.nombre;
        usuario.email = googleUser.email;
        usuario.img = googleUser.img;
        usuario.google = true;
        usuario.password = ':)';

        usuario.save((err, usuarioDB) => {

          if(err){
            return res.status(500).json({
              ok:false,
              err
            });
          }

          let token = jwt.sign({
            usuario:usuarioDB,
          },process.env.SEED, {expiresIn:process.env.CADUCIDAD_TOKEN});

          res.json({
            ok:true,
            usuario: usuarioDB,
            token
          });

        });
      }
    });
});

//Confguraciones de google
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const payload = ticket.getPayload();

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
}

module.exports = app;
