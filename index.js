const express = require('express');

const port = 7000;

const app = express();

const path = require('path');

const DB = require('./config/mongoose');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const usercrud = require('./models/crudtable');

app.use(express.urlencoded());

app.use('/',require('./routes')); 

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('Server Is Start On :- ' + port);
})