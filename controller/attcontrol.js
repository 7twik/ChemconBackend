//CONTROLLER FOR attRoute.js

const nodemailer = require("nodemailer");
const AttendeeSchema=require("../models/attendeeSchema");
exports.Check1 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin1: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.Check2 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin2: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.Check3 = async (req, res, next) => { 
 
    try { 
        const data= req.body; 
        console.log(data.data); 
        const email = data.data.email; 
        const user = await AttendeeSchema.findOne({Email: email}); 
        if(user) 
        { 
            const update = await AttendeeSchema.updateOne( 
                { 
                  Email: email, 
                }, 
                { 
                  checkin3: true, 
                }                 
              ); 
              console.log(update) 
              res.status(200).json({message: "Email OTP sent successfully"}); // "success 
            next(); 
        } 
        else{ 
            res.status(404).json({message: "No such user found"}); 
        } 
    }  
    catch (error) { 
        console.log(error); 
    } 
} 
exports.Show = async (req, res, next) => { 
     
        try { 
             
            const user = await AttendeeSchema.find(); 
            res.status(200).json({user});  
        }  
        catch (error) { 
            console.log(error); 
        } 
    } 
 
exports.Add = async (req, res, next) => { 
    try{ 
        const data = req.body; 
        console.log(data); 
        const email= data.data.email; 
        const name= data.data.name; 
        const mobile= data.data.mobile; 
        const org= data.data.org; 
        const url= data.data.url; 
        const category= data.data.category; 
        const kit= "On-Spot Registration"; 
        const checkin1= false; 
        const checkin2= false; 
        const checkin3= false; 
        const user = await AttendeeSchema.findOne({Email: data.data.email}); 
        if(user){ 
            res.status(404).json({message: "User already exists with this email"}); 
        } 
        else{ 
            const newUser = await AttendeeSchema.create({ 
                Name: name, 
                Email: email, 
                mobile: mobile, 
                Kit: kit, 
                org: org, 
                Url: url, 
                Category: category, 
                checkin1: checkin1, 
                checkin2: checkin2, 
                checkin3: checkin3, 
            }); 
            console.log(newUser); 
            sendOTPViaEmail(email, url);
            res.status(200).json({message: "User created successfully"}); 
        } 
    } 
    catch(error){ 
        console.log(error); 
    } 
}
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