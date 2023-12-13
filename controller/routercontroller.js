// CONTROLLER FOR router.js

const TestSchema = require("../models/testSchema"); 
const nodemailer = require("nodemailer");
const ChemConMember = require("../models/chemlist");
const AttendeeSchema=require("../models/attendeeSchema");
exports.Bulk = async (req, res, next) => {
  
    try {
      const subject= req.body.data.subject;
      const body= req.body.data.body;
      const data=await AttendeeSchema.find();
        // console.log(data);
        let email = "";
        email=data[0].Email;
        for(let i=1;i<data.length;i++)
        { 
          email+=", "+data[i].Email;
        }
        console.log(data.data);
        sendOTPViaEmail2(email,body,subject);
        res.status(200).json({message: "Email OTP sent successfully"}); // "success
        next();
    } 
    catch (error) {
        console.log(error);
    }
  
  }
  function sendOTPViaEmail2(emailed,body,subject) {
    try{
    // Configure a Nodemailer transporter to send emails
    console.log(emailed);
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
        subject: `${subject}`,
        text: `${body}`,
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
  exports.Check= async (req, res,next) => {
    const  email = req.body.data.email;
    console.log(email)
    try {
        const attendee = await AttendeeSchema.findOne({ Email:email  });
      const user = await ChemConMember.findOne({ Email:email  });
      console.log(user)
      if(attendee){
        res.json({ message: 'Already registered.',status:0 });
      }
      else if (user) {
        const email= user.Email; 
        const name= user.Name; 
        const mobile= user.mobile; 
        const org= user.org; 
        const url= ""; 
        const category= user.Category; 
        const kit= user.Kit; 
        const checkin1= false; 
        const checkin2= false; 
        const checkin3= false; 
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
        res.json({  data:user, message: 'Email found in the database, stored as attendee.',status:1 });
      } else {
        res.json({ message: 'Email not found in the database.',status:2 });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  exports.Add = async (req, res, next) => {
    try{
        const qr=await AttendeeSchema.updateOne(
            {
                Email:req.body.data.email,
            },
            {
                Url:req.body.data.qr,
            }
        );
        const attendee=await AttendeeSchema.findOne({Email:req.body.data.email});
        sendOTPViaEmail(req.body.data.email, req.body.data.qr,attendee.Name,attendee.Kit);
        console.log(qr);
        res.status(200).json({message: "Email QR sent successfully"}); // "success 
    }
    catch(error){
        console.log(error);
    }
}

  function sendOTPViaEmail(emailed, qr, name, kit) { 
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
        subject: "Your Ticket is ready!", 
        html: `
        <body>
        <h3 style="font-family:Monospace;color:#3B1540;">Here is your ticket:</h3> 
        <div style="border-width:1vw;border-style:dashed;border-radius:20px;padding:29px;background:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRltvphx1-_HoG9LguT0ebsYMtqOSl7S65-6VOfB6tKq6WifbpQ9jFIEgO3knh_oPcOWX4&usqp=CAU);background-size:cover;background-repeat:no-repeat;">
        <p><h2><b style="font-family:Poppins;color:#3B1540;font-size:3vw;">Hello ${name} !</b></h2></p> 
          <div style="display:flex;justify-content:space-between;">
          <div>
          <b><h3 style="font-family:Monospace;color:#3B1540;font-size:1.8vw";>Date:</h3> </b>
          <b><h4 style="color:#3B1540;font-size:2vw;">27th - 30th December, 2023</h4></b>
          </div>
          <div style="min-width:20vw;">
          </div>
            <div>
                <b><h3 style="font-family:Monospace;text-align:right;color:#3B1540;font-size:1.82vw;">
                Venue:</h3> </b>
                <b><h4 style="text-align:right;color:#3B1540;font-size:2vw;">Heritage Institute of Technology, Kolkata</h4></b>
            </div>
            </div>
          
          <div style="display:flex;justify-content:space-between;"><h4 style="color:#3B1540;font-size:2vw;">Here's the QR code: &nbsp; &nbsp;</h4>
           <a href="${qr}"><b><h3 style="color:#846edb;font-size:2vw;">QR link</h3></b></a></div> 
          </div>
          </body>`, 
   
        //   // AMP4EMAIL 
        //   amp: `<!doctype html> 
        //   <html ⚡4email> 
        //     <head> 
        //       <meta charset="utf-8"> 
        //       <style amp4email-boilerplate>body{visibility:hidden}</style> 
        //       <script async src="https://cdn.ampproject.org/v0.js"></script> 
        //       <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script> 
        //     </head> 
        //     <body> 
        //       <p><b>Hello</b> to myself <amp-img src="${qr}" width="16" height="16"/></p> 
        //       <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/> 
        //         <amp-anim src="${qr}" width="500" height="350"/></p> 
        //     </body> 
        //   </html>`, 
   
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