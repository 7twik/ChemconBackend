const ChemConMember = require("../models/chemlist");
const router = require("express").Router();
const AttendeeSchema=require("../models/attendeeSchema");
const { Bulk, Add,Check } = require("../controller/routercontroller");
const nodemailer=require("nodemailer"); 
// const bcrypt = require("bcrypt");

  router.post('/check-email', Check); //for checking the status of an email   
  router.post("/bulk", Bulk); //for sending bulk email
  router.post('/add', Add); //for updating qr code of chemcon members and sending mail to chemcon member on registration



 
 
// Function to send OTP via email 
function sendOTPViaEmail(emailed, qr) { 
  try{ 
  // Configure a Nodemailer transporter to send emails 
  console.log(emailed); 
    console.log(qr); 
  const transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: true, 
    auth: { 
      user: "arnabc857@gmail.com", 
      pass: "dratvdvupxdmlpmb", 
    }, 
  }); 
 
    // Email content and configuration (customize this based on your email service) 
    const mailOptions = { 
      from: "arnabc857@gmail.com", 
      to: emailed, 
      subject: "Your QR Code is ready!", 
      text: `Your QR code is` , 
        html: `<div><p><b>Hello</b></p> 
        <p>Here's the QR code:<br/><a href="${qr}">QR link</a></p> 
        <p>${qr}</p></div>`, 
 
        // AMP4EMAIL 
        amp: `<!doctype html> 
        <html ⚡4email> 
          <head> 
            <meta charset="utf-8"> 
            <style amp4email-boilerplate>body{visibility:hidden}</style> 
            <script async src="https://cdn.ampproject.org/v0.js"></script> 
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script> 
          </head> 
          <body> 
            <p><b>Hello</b> to myself <amp-img src="${qr}" width="16" height="16"/></p> 
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/> 
              <amp-anim src="${qr}" width="500" height="350"/></p> 
          </body> 
        </html>`, 
 
        // An array of attachments 
         
 
    }; 
   
    // Send the email 
    transporter.sendMail(mailOptions, (error, info) => { 
      if (error) { 
        console.log(error); 
      } else { 
        console.log(`Email sent: ${info.response}`); 
      } 
    }); 
  } 
  catch(err) 
  { 
    // html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p> 
    //     <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="${qr}"/></p>`, 
       
    console.log(err) 
  } 
}

module.exports = router;
