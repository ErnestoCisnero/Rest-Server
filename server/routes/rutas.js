const express = require('express');
const app = express();



app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categorias'));
app.use(require('./producto'));
app.use(require('./uploads'));

module.exports = app;