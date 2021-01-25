const express = require('express');
const fileupload = require('express-fileupload');
const app = express();

app.use(fileupload({ useTempFiles: true }));

app.put('/uploads', (req, res) => {

    if (!req.files) return res.status(400).json({ msg: 'No files were uploaded' });

    let archivo = req.files.archivo;
    let nombrearchivo = archivo.name.split('.');
    let extencion = nombrearchivo[1];

    let extenciones = ['png', 'jpg', 'gif', 'jpeg'];

    if (extenciones.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            msgErr: `Extension no valida, las extenciones permitidas son: ${extenciones}`
        })
    }

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${nombrearchivo[0]}.jpg`, (err) => {
        if (err)
            return res.status(500).send(err);

        res.json({ msg: 'File uploaded!' });
    });
});

module.exports = app;