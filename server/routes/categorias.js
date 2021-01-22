const express = require('express');
const app = express();
const Categorias = require('../models/categorias');
const Usuario = require('../models/usuario');
let { verificar_token, verificar_ADMIN_ROLE } = require('../middlewares/autenticacion');


//****Mostrar todas las categorias */

app.get('/categoria', verificar_token, (req, res) => {
    Categorias.find((err, categoriasEncontradas) => {
        if (err) return res.status(400).json({
            ok: false,
            msg: "Categorias no encontradas"
        })

        console.log(categoriasEncontradas);

        res.json({
            ok: true,
            categoriasEncontradas
        })
    });

});



//****Mostrar una categoria por id */

app.get('/categoria/:id', verificar_token, (req, res) => {
    let categoria_id = req.params.id;

    Categorias.findById(categoria_id, (err, categoriaEncontrada) => {
        if (err) return res.status(400).json({
            ok: false,
            msg: "Categoria no encontrada"
        })

        console.log(categoriaEncontrada);

        res.json({
            ok: true,
            categoriaEncontrada
        })
    });
});


//****crear nueva categoria */

app.post('/categoria', verificar_token, (req, res) => {

    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let usuario = req.usuario._id;

    let categoria = new Categorias({
        nombre,
        descripcion,
        usuario
    })

    categoria.save((err, saved) => {
        if (err) return res.status(400).json({
            ok: false,
            msg: "No se pudo salvar la categoria en la base de datos"
        })

        res.json({
            ok: true,
            saved
        })
    });
});


//****Boorar una categoria */

app.delete('/categoria/:id', [verificar_token, verificar_ADMIN_ROLE], (req, res) => {

    let categoria_id = req.params.id;

    Categorias.findByIdAndRemove(categoria_id, (err, categoriaEliminada) => {
        if (err) return res.status(400).json({
            ok: false,
            msg: "No se pudo eliminar la categoria de la base de datos"
        })

        res.json({
            ok: true,
            categoriaEliminada
        })

    });
});


module.exports = app;