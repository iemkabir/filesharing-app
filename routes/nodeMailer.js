require('dotenv').config();
const nodemailer = require("nodemailer");
const sendMail = async ({to,from, subject, html}) => {
  
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_EMAIL,
      port: process.env.NODEMAILER_PORT,
      secure: false, 
      auth: {
        user: "minkpost2019@gmail.com",
        pass: process.env.NODEMAILER_PASS,
      },
    });
    let mailOptions = {
      from,
      to,
      subject,
      html
    };
  
    const info = await transporter.sendMail(mailOptions); 
    if(info){
      console.log("message sent");
    }
  };

  module.exports = sendMail;