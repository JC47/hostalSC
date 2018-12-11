//Paquetes de node
const express = require('express');
const _ = require('underscore');
//Importaciones locales
const Activo = require('../models/activo');
const { verificaToken, verificaTokenAdmin } = require('../middlewares/auth');

const app = express();

//Agregar una activo
app.post('/add', [verificaToken, verificaTokenAdmin], (req, res) => {
    let activo = new Activo({
        nombre: req.body.nombre,
        ocupacion: req.body.ocupacion
    });

    activo.save((err, activoDB) => {
        if (err != null) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cama: activoDB
        });
    });
});

//Obtener todas las activos
app.get('/all', [verificaToken, verificaTokenAdmin], (req, res) => {
    Activo.find().exec((err, activos) => {
        if (err != null) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            activos
        });
    });
});

//Editar activo
app.put('/update/:id', [verificaToken, verificaTokenAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "ocupacion"]);

    Activo.findOneAndUpdate(id, body, { new: true }, (err, activo) => {
        if (err != null) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            activo
        });
    })
});

//Borra activo
app.delete('/delete/:id', [verificaToken, verificaTokenAdmin], (req, res) => {
    let id = req.params.id;

    Activo.findByIdAndRemove({ _id: id }, (err, activo) => {
        if (err != null) {
            return res.json({
                ok: false,
                err
            });
        }

        if (!activo) {
            return res.json({
                ok: false,
                err: "Activo no encontrado"
            });
        }

        res.json({
            ok: true
        });
    });
});


module.exports = app;