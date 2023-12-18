const ChemConMember = require("../models/chemlist");
const router = require("express").Router();
const AttendeeSchema=require("../models/attendeeSchema");
const { Bulk, Add,Check, Show, SendEmail } = require("../controller/routercontroller");
const nodemailer=require("nodemailer"); 
// const bcrypt = require("bcrypt");
  router.get('/show', Show); //for showing the list of chemcon members
  router.post('/check-email', Check); //for checking the status of an email   
  router.post("/bulk", Bulk); //for sending bulk email
  router.post('/add', Add); //for updating qr code of chemcon members and sending mail to chemcon member on registration
  router.post('/send-email', SendEmail); //for sending email to chemcon member on registration
module.exports = router;
