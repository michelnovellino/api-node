'use strict'

const express = require("express");
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/Auth");
const api = express.Router();
const app = express();


// users routes

api.post('/signUp',UserController.signUp);

api.post('/signIn',UserController.signIn);


// products routes

api.get('/products', ProductController.getProducts);

api.get('/product/:productId', ProductController.getProduct);

api.post('/product', ProductController.saveProduct);

api.put('/product/:productId', ProductController.updateProduct);

api.delete('/product/:productId', ProductController.deleteProduct);

api.get("/private", auth, (req, res) => {
    res.status(200).send({ message: "acceso concedido" });
});

module.exports = api;