const express = require('express');
const app = express();
const _ = require('underscore');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { verificar_token, verificar_ADMIN_ROLE } = require('../middlewares/autenticacion');




//GET
app.get('/usuario', verificar_token, (req, res) => {


    let from = req.query.from || 0;
    let limit = req.query.limit || 5;
    from = Number(from);
    limit = Number(limit);

    Usuario.find({ estado: true }, 'name email role estado google img').skip(from).limit(limit).exec((err, usuarios) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Usuario.count({ estado: true }, (err, conteo) => {

            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            });
        });
    });

});


//POST
app.post('/usuario', [verificar_token, verificar_ADMIN_ROLE], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});


//PUT
app.put('/usuario/:id', [verificar_token, verificar_ADMIN_ROLE], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});




// DELETE
app.delete('/usuario/:id', [verificar_token, verificar_ADMIN_ROLE], (req, res) => {

    let id = req.params.id;


    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioCambioEstado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioCambioEstado) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no Encontrado' }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioCambioEstado
        });


    });

});

module.exports = app;