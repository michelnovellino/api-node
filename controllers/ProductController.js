'use strict'

const ProductModel = require("../models/ProductModel");


function getProducts(req, res){
    ProductModel.find({},(err,products) => {
        if(err) return res.status(500).send({message:`error al procesar la peticion ${err}`});
        if(!res) return res.status(404).send({message:`no hay productos guardados`});

        res.status(200).send(products);
    });
}

function getProduct(req,res){
    let productId = req.params.productId;

    ProductModel.findById(productId,(err,product) => {
        if(err) return res.status(500).send({message:`error al procesar la peticion ${err}`});
        if(!product) return res.status(404).send({message:`el producto no existe`});

        res.status(200).send({message: product});

    });

}

function saveProduct(req,res){
    console.log("POST /api/product");
    console.log(req.body);

    let product = new ProductModel();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err,productStored) => {
        if(err) return res.status(500).send({message:`error al guardar ${err}`});
        res.status(200).send({product:productStored});
    });
}

function updateProduct(req,res){
    let productId = req.params.productId;
    let update = req.body;
    ProductModel.findByIdAndUpdate(productId,update,(err,productUpdated)=>{
        if(err) return res.status(500).send({message:`error al actualizar producto ${err}`});

        res.status(200).send({product: productUpdated});
    });
}

function deleteProduct(req,res){
    let productId = req.params.productId;
    ProductModel.findById(productId,(err,product) => {
        if(err) return res.send(500).send({message:`error al eliminar el producto ${err}`});

        product.remove(err => {
            if(err) return res.status(500).send({message:`error al eliminar el producto ${err}`});
            res.status(200).send({message:`el producto ha sido eliminado con exito`});
        });
    });
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}