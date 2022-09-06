// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose")
const Product = require('./models/product')

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
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

////ROUTES////

// INDEX
app.get("/products",(req,res)=>{
    res.render("index.ejs",{
        productsIndex:Product
    })
})
// NEW
app.get('/products/new',(req,res)=>{
    res.render('new.ejs')
})
// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW


// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));