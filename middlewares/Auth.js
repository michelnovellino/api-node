'use strict'

const authService = require("../services");

function isAuth(req,res,next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'acceso denegado' });
    }

    const token = req.headers.authorization.split(" ")[1];

    authService.decodeToken(token)
    .then(response =>{
        req.user = response;
        next();
    })
    .catch(response =>{
        res.status(response.status)
    });
}

module.exports = isAuth;