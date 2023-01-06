//For some reason my application isn't recognizing my css file, so the websites appearance
//is fairly poor. I think all the code is there and mostly correct and my homework 2 worked perfectly.
//However the increment and decrement features don't work for my products.
//Code was taken from labs 5 and 6 as well as homework 2

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require("./models/user");
const { home } = require('./handlers');
const { about } = require('./handlers');
const { shop } = require('./handlers');
const { each } = require('lodash');


const dbURI = "mongodb+srv://cam:123@golf.aupxcee.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewURLParser:true, useUnifiedTopology:true}).then((result)=> {
    //if connected to db
    console.log("Connected to mongoDB");
    //listen for requests
    app.listen(3000);
}).catch((err) =>{
    console.log(err);
});
// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//Middleware
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Temporary data
let info = {name: "", card: "", email: "", address: ""};
let user = {name: "", email: "", password: ""}
let currentUser=""
let currentHead="./partials/head.ejs"
var userBase = [];
var order = [];
var pastOrders =[];
let total = 0
let nGolf1 = 0;
let nGolf2 = 0;
let nGolf3 = 0;
let nGolf4 = 0;
let nGolf5 = 0;
let nGolf6 = 0;
let stock1 = 1;
let stock2 = 1;
let stock3 = 1;
let stock4 = 1;
let stock5 = 1;
let stock6 = 1;

//Routing
app.get('/', (req, res) => {
    res.redirect('/shop')
});

app.get('/home', (req, res) => {
    res.render('./home', {title: 'Home', currentHead});
});

app.get('/shop', (req, res) => {
    if(currentUser == "Admin"){
        req.body.numGolf1 = nGolf1
        res.render('./adminShop', {title: 'AdminShop', nGolf1, nGolf2, nGolf3, nGolf4, nGolf5, nGolf6, currentUser, stock1, stock2, stock3, stock4, stock5, stock6, currentHead});
    }
    if(currentUser != ""){
        req.body.numGolf1 = nGolf1
        res.render('./userShop', {title: 'userShop', nGolf1, nGolf2, nGolf3, nGolf4, nGolf5, nGolf6, currentUser, stock1, stock2, stock3, stock4, stock5, stock6, currentHead});
    }
    req.body.numGolf1 = nGolf1
    res.render('./shop', {title: 'Shop', nGolf1, nGolf2, nGolf3, nGolf4, nGolf5, nGolf6, currentUser, stock1, stock2, stock3, stock4, stock5, stock6, currentHead});
});

app.get('/checkout', (req, res) => {
    res.render('./checkout', {title: 'Checkout', order, total, currentHead});
});

app.get('/pastOrders', (req, res) => {
    res.render('./pastOrders', {title: 'pastOrders', order, total, currentHead, pastOrders});
});

app.get('/about', about, (req, res) => {
    res.render('./about', {title: 'About', currentHead});
});

app.get('/createAccount', (req, res) => {
    res.render('./createAccount', {title: 'Create Account'});
});

app.get('/createAccount/', (req, res) => {
    User.find().sort({createdAt:-1}).then((result)=> {
        res.render('./home', { title: 'Users', users: result});
    }).catch((err)=>{
        console.log(err)
    });
});

app.get('/createAccount/:did', (req, res) => {
    const did = req.params.did
    User.findById(did).then((result)=>{
        res.render('.users/details', {title: "User", donation:result})
    }).catch((err)=>{
        console.log(err)
        res.status(404).render('404', {title: '404'})
    })
});



app.get('/login', (req, res) => {
    res.render('./login', {title: 'Login'});
    
});

app.post('/createAccount', (req, res) => {
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).save().then((result)=>{
        console.log(result)
        res.redirect('user')
    }).catch((err)=>{
        console.log(err)
    });
    if (req.body.email != null && !req.body.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    } else if (req.body.name.length == 0) {
    } else {
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        res.redirect('/shop')
    }
    userBase.push(user)
});

app.post('/login', (req, res) => {
    console.log("users: " + userBase)
    User.find({ email: req.body.email, password: req.body.password }, (err, users) => {
        if (err) return handleError(err);
        console.log("users: " + users.toString())
            currentUser = users[0].name
            console.log("current: " + currentUser)
            pastOrders=[]
            if(currentUser == "Admin"){
                currentHead = "./partials/head2.ejs"
            }else{
                currentHead = "./partials/head3.ejs"
            }
            res.redirect('/shop')
            
        
        
      });
    // userBase.forEach(search)
    // function search(user){
    //     if(user.email == req.body.email){
    //         if(user.password == req.body.password){
    //             pastOrders=[]
    //             currentUser = user.name
    //             if(user.name == "Admin"){
    //                 currentHead = "./partials/head2.ejs"
    //             }else{
    //                 currentHead = "./partials/head3.ejs"
    //             }
    //             res.redirect('/shop')
    //         }
    //     }
    // }
});

app.get('/summary', (req, res) => {
    res.render('./summary', {title: 'Summary', info, order, currentHead});
});

app.get('/logout', (req, res) => {
    currentUser=""
    currentHead="./partials/head.ejs"
    pastOrders=[]
    res.render('./home', {title: 'Home', currentHead});
});

//Order form logics
app.post('/checkout', (req, res) => {
    if (!req.body.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    } else if (req.body.name.length == 0) {
    } else if (!req.body.zip.match(/\b\d{5}\b/g)) {
    } else if (!req.body.card.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
    } else {
        info.name = req.body.name
        info.card = req.body.card
        info.email = req.body.email
        info.address = req.body.address
        res.redirect('/summary')
    }

    order.forEach(element => {
        pastOrders.push(element)
    });

    //Cart

})

app.post('/adminShop', (req, res) => {
    stock1 = req.body.stock
    stock2 = req.body.stock2
    stock3 = req.body.stock3
    stock4 = req.body.stock4
    stock5 = req.body.stock5
    stock6 = req.body.stock6
    res.redirect('/shop')
})

app.post('/shop', (req, res) => {
    order = [];

    console.log(req.body.numGolf1)
    if (req.body.numGolf1 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf1)
        nGolf1 = Number(req.body.numGolf1)
        cart.name = "golf1"
        //cart.name = "Strata Ultimate Men's 14-set"
        cart.price = 499.99 * req.body.numGolf1
        cart.tax = (499.99 * req.body.numGolf1 * 0.06).toFixed(2)
        cart.total += (499.99 * req.body.numGolf1 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    if (req.body.numGolf2 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf2)
        nGolf2 = Number(req.body.numGolf2)
        cart.name = "golf2"
        //cart.name = "Strata Ultimate Men's 12-set"
        cart.price = 399.99 * req.body.numGolf2
        cart.tax = (399.99 * req.body.numGolf2 * 0.06).toFixed(2)
        cart.total += (399.99 * req.body.numGolf2 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    if (req.body.numGolf3 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf3)
        nGolf3 = Number(req.body.numGolf3)
        cart.name = "golf3"
        //cart.name = "Strata Ultimate Women's 14-set"
        cart.price = 499.99 * req.body.numGolf3
        cart.tax = (499.99 * req.body.numGolf3 * 0.06).toFixed(2)
        cart.total = (499.99 * req.body.numGolf3 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    if (req.body.numGolf4 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf4)
        nGolf4 = Number(req.body.numGolf4)
        cart.name = "golf4"
        //cart.name = "Strata Ultimate Women's 12-set"
        cart.price = 399.99 * req.body.numGolf4
        cart.tax = (399.99 * req.body.numGolf4 * 0.06).toFixed(2)
        cart.total = (399.99 * req.body.numGolf4 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    if (req.body.numGolf5 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf5)
        nGolf5 = Number(req.body.numGolf5)
        cart.name = "golf5"
        //cart.name = "Reva Men's 14-set"
        cart.price = 599.99 * req.body.numGolf5
        cart.tax = (599.99 * req.body.numGolf5 * 0.06).toFixed(2)
        cart.total += (599.99 * req.body.numGolf5 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    if (req.body.numGolf6 > 0) {
        let cart = {name: "", price: "", tax: "", total: 0, amount: ""}
        cart.amount = Number(req.body.numGolf6)
        nGolf6 = Number(req.body.numGolf6)
        cart.name = "golf6"
        //cart.name = "Reva Men's 12-set"
        cart.price = 499.99 * req.body.numGolf6
        cart.tax = (499.99 * req.body.numGolf6 * 0.06).toFixed(2)
        cart.total += (499.99 * req.body.numGolf6 * 1.06).toFixed(2)
        order.push(cart)
        total += cart.total
    }
    // if (req.body.numGolf1 > 0 || req.body.numGolf2 > 0 || req.body.numGolf3 > 0 || req.body.numGolf4 > 0 || req.body.numGolf5 > 0 || req.body.numGolf6 > 0) {
    //     res.redirect('/checkout')
    // }

})
