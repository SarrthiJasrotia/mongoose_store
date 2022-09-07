// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose")
const Product = require('./models/product')
const methodOverride = require("method-override")

//Database config
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride("_method"))
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

////ROUTES////

// INDEX
app.get("/products",(req,res)=>{
    Product.find({},(error,allProducts)=>{
        res.render("index.ejs",{
            productsIndex: allProducts,
        });
    });
});
// NEW
app.get('/products/new',(req,res)=>{
    res.render('new.ejs')
})
// DELETE
app.delete("/products/:id",(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (error, data)=>{
        res.redirect('/products')
    });
});
// UPDATE

// CREATE
app.post('/products', (req, res) => {
    Product.create(req.body, (error, listedProduct) => {
        res.redirect('/products');
    });
})
// EDIT

// SHOW
app.get('/products/:id',(req,res)=>{
    Product.findById(req.params.id,(error,allProducts)=>{
        res.render('show.ejs',{
            productsShow: allProducts,
        });
    });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));