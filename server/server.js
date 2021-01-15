//Global configuration file.....
require('./config/config');


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();




//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));



//Routes



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;


    console.log("Conectado a la base de datos!!!")
});

app.listen(process.env.PORT, () => {
    console.log(`app listening at port: ${process.env.PORT}`);
})