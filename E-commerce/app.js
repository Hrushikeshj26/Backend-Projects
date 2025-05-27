const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');
const productModel = require('./models/products');
const userModel = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
 

app.get('/', async (req, res) => {
    const products = await productModel.find();
    res.render("index", { products });
    
    console.log(products);
});

app.get('/viewproducts', async (req, res) => {
    const products = await productModel.find();
    res.render("viewproducts", { products });
});

app.get('/admin', (req, res) => {
    res.render("admin")
});


app.post('/add-product', async (req, res) => {
    
    let { prdname, prddecs, prdimg, prdprice} = req.body;

    let products = await productModel.create({
           prdname, 
           prddecs, 
           prdimg, 
           prdprice
        })
    
        res.redirect("/");
        console.log(products);
});

app.get('/delete/:id', async (req, res) => {
    let product = await productModel.findOneAndDelete({_id : req.params.id});
    res.redirect("viewproducts")
});





app.listen(3000);