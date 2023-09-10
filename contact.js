const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name:{
    type: String,
    lowercase: true
    },
    phone:Number,
    email:String,
    message:String,
    })
const orderSchema = new mongoose.Schema({
    name:{
    type: String,
    lowercase: true
    },
    email:String,
    city:String,
    address:String,
    zipcode:Number,
    country:String,
    })
    // const UserSchema = new mongoose.Schema({
    //     name:{
    //     type: String,
    //     lowercase: true
    //     },
    //     number:Number,
    //     email:String,
    //     password:String,
    //     }) 
    const Contact = new mongoose.model("Contact",contactSchema);
    const orderCollection = new mongoose.model("order",orderSchema);
    //  const userCollection = new mongoose.model("login",userSchema);
    module.exports = {Contact,orderCollection};