const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let user = await userModel.find()
    res.render("read", {user});    
});

app.post('/create', async (req, res) => {
    let {name, email, contactno, address, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        contactno,
        address,
        image
    })

    res.redirect("read");
});

app.get('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.get('/update/:id', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.id});
    res.render("update", {user});
});

app.post('/update/:id', async (req, res) => {
    let {name, email, contactno, address, image} = req.body;

    let user = await userModel.findOneAndUpdate({_id: req.params.id}, { name, email, contactno, address, image}, {new: true});
    res.redirect("/read");
});

app.listen(3000);