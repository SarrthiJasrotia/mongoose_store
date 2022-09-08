const { application } = require('express');
const express = require('express');
const Product = require('../models/product')
const productRouter = express.Router()

////ROUTES////

// INDEX
productRouter.get("/",(req,res)=>{
    Product.find({},(error,allProducts)=>{
        res.render("index.ejs",{
            productsIndex: allProducts,
        });
    });
});
// NEW
productRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})
// DELETE
productRouter.delete("/:id",(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (error, data)=>{
        res.redirect('/products')
    });
});
// UPDATE
productRouter.put('/:id',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,req.body, {
        new:true,
    },
    (error,updatedProduct)=>{
        res.redirect(`/products/${req.params.id}`)
    });
});

productRouter.put('/:id/buy', (req,res)=>{
    Product.findById(req.params.id,(error,updatedProduct)=>{
        updatedProduct.qty -= 1
        updatedProduct.save()
        res.redirect(`/products/${req.params.id}`)
    });
});
// CREATE
productRouter.post('/', (req, res) => {
    Product.create(req.body, (error, listedProduct) => {
        res.redirect('/products');
    });
})
// EDIT
productRouter.get('/:id/edit',(req,res)=>{
    Product.findById(req.params.id, (error, listedProduct)=>{
        res.render('edit.ejs', {
            productsEdit: listedProduct,
        });
    });
});
// SHOW
productRouter.get('/:id',(req,res)=>{
    Product.findById(req.params.id,(error,allProducts)=>{
        res.render('show.ejs',{
            productsShow: allProducts,
        });
    });
});


module.exports = productRouter