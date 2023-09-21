import nodemailer from 'nodemailer'


import config from "../config/config.js";

const transporter = nodemailer.createTransport({
   service:'gmail',
    port: 587,
    secure: true,
    auth: {
      user: config.userEmail,
      pass: config.passwEmail
    }
  });


  async function sendEmail(email){
    const info = await transporter.sendMail({
      from: email.from,
      to: email.to, 
      subject: email.subject, 
      html:email.html, 
    });
  }

  export {transporter,sendEmail}