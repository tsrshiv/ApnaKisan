const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const hbs = require('hbs');
require('./conn');
app.use(bodyParser.urlencoded({ extended: false }))
const { Contact, orderCollection } = require('./contact');
// const User = require('../user');
const views_path = path.join(__dirname, "views")
app.use(express.static('.'))
app.use(express.static('views_path'))
app.set('view engine', 'hbs');
app.post('/feedback', async (req, res) => {
    sendmail = req.body.email;
    try {
        const contact = new Contact({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message,
        })

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "21147@iiitu.ac.in",
                pass: 'Lodhi1010@',
            }
        })
        var mailoption = {
            from: '21147@iiitu.ac.in',
            to: "sendmail",
            subject: `<h1>ApnaKISAN</h1>`,
            html: `<h3>Thanks For Your Feedback ${req.body.name}</h3>`
        };
        transporter.sendMail(mailoption, function (e, i) {
            if (e) {
                console.log(e);
            }
            else {
                console.log('email has been send');
            }
        })
        const Registered = await contact.save();
        res.render('index', {
            succcess: `<div class="suc"><span class="success"><i class="bi bi-check-circle-fill"></i> Your Feedback is Sucessfully Submited</span></div>`
        })
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/order", async (req, res) => {
    const orderdata = new orderCollection({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode,
        country: req.body.country,
    })
    await orderCollection.insertMany([orderdata]);
    res.render("order");
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.post('/signup',async(req,res)=>{
    const userdata = new userCollection({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
    })
    await userCollection.insertMany([userdata]);
    res.render("signup");
})
// app.post('/login',async(req,res)=>{
//     try {
//         const Username = await User.findOne({name: req.body.name});
//         if (!Username) {
//             res.send('invalid Username');
//             return
//         }
//         if (Username.password !== req.body.name) {
//             res.send('invalid password');
//         }
//         res.redirect('/');
//     } catch (error) {
//         res.send(error)
//     }
// })
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/cart", (req, res) => {
    res.render("cart");
})
app.get("/order", (req, res) => {
    res.render("order");
})
app.get("/checkout", (req, res) => {
    res.render("checkout");
})
app.listen(3000, (req, res) => {
    console.log(`server is running on port 3000`);
})