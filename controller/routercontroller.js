// CONTROLLER FOR router.js

const TestSchema = require("../models/testSchema"); 
const nodemailer = require("nodemailer");
const ChemConMember = require("../models/chemlist");
const AttendeeSchema=require("../models/attendeeSchema");

const e = require("cors");
const emailAddresses = ['chemconupdate1@gmail.com', 'chemconupdate3@gmail.com','chemconupdate4@gmail.com','chemconupdate5@gmail.com','chemconupdate6@gmail.com','chemconupdate7@gmail.com','chemconupdate8@gmail.com'];
const password = ['szfe segx wqlz gjqm','sjeo tchy nmid lvwd','expb jmal jkyu dwpq','jpko uxcq ufnb wyrn','fzvo  ptib lvic fnek','vfod oadw rzcd lmds','dndq dmoh eoej rbdt'];

let currentEmailIndex = 0;
let emailsSentCount = 0;
const maxEmailsPerDay = 250;
let startDate = new Date();
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
      console.log(err)
    }
  }
  exports.Show = async (req, res, next) => {
    try {
      const data=await ChemConMember.find();
      res.status(200).json({data:data});
      next();
    } 
    catch (error) {
        console.log(error);
    }
  
  }
  exports.Check= async (req, res,next) => {
    const  email = req.body.data.email;
    console.log(email)
    try {
        const attendee = await AttendeeSchema.findOne({ Email:email  });
        const user = await ChemConMember.findOne({ Email:email  });

        console.log(attendee)
        console.log(user)

        if(attendee){
          res.json({ data:attendee, message: 'Already registered.',status:0 });
        }
        else if (user) {
          res.json({ data:user, message: 'Email found in the database, stored as attendee.',status:1 });
        } else {
          res.json({ message: 'Email not found in the database.',status:2 });
        }

    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  exports.Add = async (req, res, next) => {
    const  email = req.body.data.email;
    try{
        const user = await ChemConMember.findOne({ Email:email  });
        const name= user.Name; 
        const mobile= user.Mobile; 
        const url= req.body.data.qr; 
        const category= user.Category; 
        const kit= user.Kit; 
        const verify= "Pre Registered";
        const checkin1= false; 
        const checkin2= false; 
        const checkin3= false; 
        const newUser = await AttendeeSchema.create({ 
            Name: name, 
            Email: email, 
            Mobile: mobile, 
            Kit: kit, 
            Url: url, 
            VerifyCode: verify,
            Category: category, 
            checkin1: checkin1, 
            checkin2: checkin2, 
            checkin3: checkin3, 
        }); 
        console.log(newUser);
        sendOTPViaEmail(req.body.data.email, req.body.data.qr,name);
        console.log(qr);
        res.status(200).json({message: "Email QR sent successfully"}); // "success 
    }
    catch(error){
        console.log(error);
    }
}

  async function sendOTPViaEmail(emailed, qr, name) { 
    const currentDate = new Date();

  // Check if it's a new day, reset the counter and start date
  if (currentDate.getDate() !== startDate.getDate()) {
    emailsSentCount = 0;
    startDate = currentDate;
  }
  if (emailsSentCount >= maxEmailsPerDay) {
    currentEmailIndex = (currentEmailIndex + 1) % emailAddresses.length;
    emailsSentCount = 0;
  }
    try{ 
    // Configure a Nodemailer transporter to send emails 
    console.log(emailed); 
      console.log(qr); 
    const transporter = nodemailer.createTransport({ 
      host: 'smtp.gmail.com', 
      port: 465, 
      secure: true, 
      auth: { 
        user: emailAddresses[currentEmailIndex], 
        pass: password[currentEmailIndex], 
      }, 
    }); 
   
      // Email content and configuration (customize this based on your email service) 
      const mailOptions = { 
        from: emailAddresses[currentEmailIndex], 
        to: emailed, 
        subject: "Your spot for ChemCon'23 has been confirmed!",
        html: `
        <body>
        <h3 style="font-family:Sans-Serif;color:#190482;">
        Respected Sir/Madam, <br /><br />
        Your spot has been confirmed for CHEMCON 23.Please show this QR code embedded digital ticket to our volunteers on the day of event. <br/>
        <br/>Thanks & Regards<br />
        CHEMCON'23 Dev Team<br /><br /> 
        </h3><h3 style="font-family:Monospace;color:#3B1540;"> <br/>      
        Here is your ticket:</h3> 
        <div style="border-width:1vw;border-style:dashed;border-radius:20px;padding:29px;background:url(https://res.cloudinary.com/dcyfkgtgv/image/upload/v1702487786/ticket_bg_blurred_rzbdag.png);background-size:cover;background-repeat:no-repeat;">
            <p><h2><b style="font-family:Poppins;color:white;font-size:3vw;font-weight:800;">Hello ${name} !</b></h2></p> 
            <div style="display:flex;justify-content:space-between;">
                <div>
                    <h3><b style="font-family:Monospace;color:white;font-size:1.8vw;">Date:</b> </h3>
                    <h4><b style="color:white;font-size:2vw;">27th - 30th December, 2023</b></h4>
                </div>
                <div style="min-width:20vw;">
                </div>
                <div>
                    <h3>
                        <b style="font-family:Monospace;color:white;font-size:1.82vw;">Venue:</b> 
                    </h3>
                    <h4>
                        <b style="color:white;font-size:2vw;">Heritage Institute of Technology, Kolkata</b>
                    </h4>
                </div>
            </div>            
            <hr />
            <div style="display:flex;justify-content:space-between;">
                <div>
                    <h3>
                        <b style="font-family:Monospace;color:white;font-size:1.8vw;text-shadow:2px 2px 2px black;">Click here for Location:</b> 
                    </h3>
                    <a href="https://www.google.com/maps/d/u/0/viewer?mid=1B0TvI3v57BG6hrmOyTLlZH76Kt4&hl=en_US&ll=22.51646200000002%2C88.41829899999999&z=17">
                        <img style="border-width:0.5vw;border-color:black;border-radius:20px;width:20vw;height:20vw;" src="https://res.cloudinary.com/dcyfkgtgv/image/upload/v1702478766/heritage_ksmg4k.png" />
                    </a>
                </div>
                <div style="min-width:20vw;">
                </div>
                <div>
                    <h3><b style="font-family:Monospace;color:white;font-size:1.82vw;text-align:center;text-shadow:2px 2px 2px black;">
                        Scan now!</b> 
                    </h3>
                    <a href="${qr}">
                        <img style="width:20vw;height:20vw;border-radius:15px;float:right;" src="${qr}" />
                    </a>
                </div>
            </div>
          </body>`, 
       
           
   
      }; 
     
      // Send the email 
      transporter.sendMail(mailOptions, (error, info) => { 
        if (error) { 
          console.log(error); 
        } else { 
          console.log(`Email sent: ${info.response}`); 
        } 
      }); 
      emailsSentCount++;
       console.log("ROUTER => Email sent count: "+emailsSentCount+" for "+emailed);
        console.log("Current email index: "+currentEmailIndex);
    } 
    catch(err) 
    { 
      console.log(err) 
    } 
  }