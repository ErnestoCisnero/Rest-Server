//Global configuration file.....
require('./config/config');


const express = require('express');
const bodyParser = require('body-parser');

const app = express();




//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



//Routes
app.get('/usuario', (req, res) => {
    res.json('Hello World!');
})

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.name === undefined) {

        res.status(400).json({
            ok: false,
            msm: "Name needed"
        })

    } else {

        res.json({
            name: body.name,
            lastName: body.lastName
        });
    }


})

app.put('/usuario', (req, res) => {
    res.json('Put Hello World!');
})

app.delete('/usuario', (req, res) => {
    res.json('Delete Hello World!');
})
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
})