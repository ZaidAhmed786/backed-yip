require('dotenv').config();
const nodemailer = require("nodemailer"); 
let transporter = nodemailer.createTransport({ 
    service:'gmail',
    auth:{
     user:"saadshabbir@leilanitech.com",
     pass:process.env.MAILER
    },
    port:465,
    host:'smtp.gmail.com'
  })
 
  //Export Functions
module.exports = {transporter};