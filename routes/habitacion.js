//Paquetes de node
const _ = require('underscore');
const express = require('express');
const mongoose = require('mongoose');
//Importaciones locales
const Habitacion = require('../models/habitacion');

const app = express();

app.post('/add', (req,res)=> {
    console.log(req.body);

    let hab = new Habitacion({  
        tipo: req.body.tipo,
        nombre: req.body.nombre,
        ocupacion_max: req.body.ocupacion_max,
        descripcion: req.body.descripcion,
        max_children: req.body.max_children,
        camas_disponibles: req.body.camas_disponibles
    });

    hab.save((err, habitacion) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            habitacion
        });
    });
});

app.get('/all', (req,res)=> {
    Habitacion.find({}).populate('camas_disponibles.cama', 'nombre ocupacion').exec((err,habitaciones) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            habitaciones
        });
    });
});

module.exports = app;