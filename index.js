'use strict'
//dependencies

const mongoose = require('mongoose');
const app = require("./app");
const config = require("./config");


mongoose.connect(config.db,(err,res) => {
    if (err) return console.log(` no se ha podido establecer la coneccion a la base de datos ${err}`);

    console.log('aaaaaaaa')
    app.listen(config.port, () => {

        console.log(`servidor corriendo en http://localhost:${config.port}`);
    
    });
});

