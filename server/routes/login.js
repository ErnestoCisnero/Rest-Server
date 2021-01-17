require('../config/config');
const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Usuario.findOne({ email: email }, (err, usuarioEncontrado) => {


        if (err) {
            return res.status(500).json({
                ok: true,
                err
            });
        }
        //Validacion del correo
        if (!usuarioEncontrado) {

            return res.status(400).json({
                ok: false,
                msg: {
                    message: "Usuario o contraseña incorrectos"
                }
            });

        }
        //Validacion de la contraseña 
        if (bcrypt.compareSync(password, usuarioEncontrado.password)) {

            let token = jwt.sign({ usuario: usuarioEncontrado }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


            res.json({
                ok: true,
                usuario: usuarioEncontrado,
                token
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }


    });

});



module.exports = app;