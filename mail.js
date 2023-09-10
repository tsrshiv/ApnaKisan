require('dotenv').config()
const process = require('process');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:"21147@iiitu.ac.in",
        pass: '6386845325',
    }
})
var mailoption = {
    from: '21147@iiitu.ac.in',
    to: "shivendraverma111111@gmail.com",
    subject: `<h1>hello</h1>`,
    text: 'hello i am Shivendra',
};
transporter.sendMail(mailoption,function (e,i) {
    if (e) {
     console.log(e);   
    }
    else{
        console.log('email has been send');
    }
})