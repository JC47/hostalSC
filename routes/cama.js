//Paquetes de node
const express = require('express');
const _ = require('underscore');
//Importaciones locales
const Cama = require('../models/cama');
const { verificaToken, verificaTokenAdmin } = require('../middlewares/auth');

const app = express();

//Agregar una cama
app.post('/add',[verificaToken, verificaTokenAdmin], (req,res) => {
    let cama = new Cama({
        nombre:req.body.nombre,
        ocupacion: req.body.ocupacion
    });

    cama.save((err, camaDB) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            cama: camaDB
        });
    });
});

//Obtener todas las camas
app.get('/all', [verificaToken, verificaTokenAdmin] , (req,res) => {
    Cama.find().exec((err, camas) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            camas
        });
    });
});

//Editar cama
app.put('/update/:id', [verificaToken, verificaTokenAdmin], (req,res) => {
    let id = req.params.id;    
    let body = _.pick(req.body, ["nombre", "ocupacion"]);

    Cama.findOneAndUpdate(id, body, {new: true}, (err, cama) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            cama
        });
    })
});

//Borra cama
app.delete('/delete/:id', [verificaToken, verificaTokenAdmin], (req,res) => {
    let id = req.params.id;

    Cama.findByIdAndRemove({_id:id}, (err,cama) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        if(!cama){
            return res.json({
                ok:false,
                err: "Cama no encontrada"
            });
        }

        res.json({
            ok:true
        });
    });
});


module.exports = app;