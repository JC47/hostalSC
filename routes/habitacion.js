//Paquetes de node
const _ = require('underscore');
const express = require('express');
const mongoose = require('mongoose');
//Importaciones locales
const Habitacion = require('../models/habitacion');
const { verificaToken, verificaTokenAdmin, verificaTokenRoot } = require('../middlewares/auth');

const app = express();

app.post('/add', [verificaToken, verificaTokenAdmin],(req,res)=> {

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

app.post('/addcama/:id', [verificaToken, verificaTokenAdmin],(req,res)=>{
    let id = req.params.id;
    let cama_nueva = {
        cama: mongoose.Types.ObjectId(req.body.cama),
        cantidad: parseInt(req.body.cantidad)
    }
    Habitacion.findOneAndUpdate(id, {$push: {camas_disponibles: cama_nueva}}, (err,habitacion) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        if(!habitacion){
            res.json({
                ok:false,
                err: "La habitacion noo existe"
            });
        }

        Habitacion.findOne({_id:id}).populate('camas_disponibles.cama').exec((err, habitacionN) => {
            if (err != null) {
                return res.json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                habitacionN
            });
        });

        
    });
});

app.get('/all', [verificaToken, verificaTokenAdmin], (req,res)=> {
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

app.delete('/delete/:id', [verificaToken, verificaTokenAdmin],(req,res) => {
    let id = req.params.id;
    Habitacion.findOneAndRemove({_id:id}, (err, hab) => {
        if(err != null){
            return res.json({
                ok:false,
                err
            });
        }

        if(!hab){
            return res.json({
                ok:false,
                err: "Habitacion no encontrada"
            });
        }

        res.json({
            ok:true
        });
    });
});

app.put('/update/:id', [verificaToken, verificaTokenAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "tipo" ,"ocupacion_max", "descripcion", "max_children"]);

    Habitacion.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, habitacionN) => {
        if (err != null) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            habitacion: habitacionN
        });
    });
});

app.put('/updatecama/:id', [verificaToken, verificaTokenAdmin], (req,res) => {
    let id = req.params.id;
    let id_cama = req.body.id_cama;
    let cantidad_new = req.body.cantidad;
    
    Habitacion.updateOne({"_id":id, "camas_disponibles._id": id_cama}, 
        { $set: { "camas_disponibles.$.cantidad":cantidad_new}}, (err) => {
        
            if (err != null) {
                return res.json({
                    ok: false,
                    err
                });
            }

            Habitacion.findOne({ _id: id }).populate('camas_disponibles.cama').exec((err, habitacionN) => {
                if (err != null) {
                    return res.json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    habitacion: habitacionN
                });
            });
    });
});

app.delete('/deletecama/:id', [verificaToken, verificaTokenAdmin], (req, res) => {
    let id = req.params.id;
    let id_cama = req.body.id_cama;

    Habitacion.updateOne({ "_id": id}, {$pull: {"camas_disponibles": [ {"_id":id_cama}]}}, (err) => {

            if (err != null) {
                return res.json({
                    ok: false,
                    err
                });
            }

            Habitacion.findOne({ _id: id }).populate('camas_disponibles.cama').exec((err, habitacionN) => {
                if (err != null) {
                    return res.json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    habitacion: habitacionN
                });
            });
        });
});



module.exports = app;