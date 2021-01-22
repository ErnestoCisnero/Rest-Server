const express = require('express');
const app = express();
const Producto = require('../models/producto');
let { verificar_token, verificar_ADMIN_ROLE } = require('../middlewares/autenticacion');


//***Obtener todos los productos */

app.get('/productos', verificar_token, (req, res) => {

    Producto.find({ disponible: true }).populate('usuario', 'nombre email').populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) return res.status(500).json({
                ok: false,
                err
            });

            res.json({
                ok: true,
                productos
            })
        });


});

//***Crear nuevos productos */
app.post('/productos', verificar_token, (req, res) => {

    let producto = new Producto({

        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: req.body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productSaved) => {
        if (err) return res.status(500).json({
            ok: false,
            err
        });

        if (!productSaved) {
            return res.status(400).json({
                ok: false,
                msg: "No se pudo salvar el producto en la base de datos"
            });
        }

        res.json({
            ok: true,
            productSaved
        });


    });

});

//***Actualizar los productos */

app.put('/productos/:id', (req, res) => {

    let producto_id = req.params.id;
    let body_to_update = req.body;
    Producto.findByIdAndUpdate(producto_id, body_to_update, { new: true }, (err, productUpdated) => {

        if (err) return res.status(500).json({
            ok: false,
            err
        });

        if (!productUpdated) {
            return res.status(400).json({
                ok: false,
                msg: "No se pudo actualizar el producto en la base de datos"
            });
        }

        res.json({
            ok: true,
            productUpdated
        })

    });
});







module.exports = app