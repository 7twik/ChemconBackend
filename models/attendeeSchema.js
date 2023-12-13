const mongoose = require("mongoose"); 
 
const attendeeSchema = new mongoose.Schema( 
  { 
    Name: { 
      type: String, 
    }, 
    Email: { 
      type: String, 
    }, 
    mobile: { 
      type: String, 
    }, 
    Kit: { 
      type: String, 
    }, 
    org:{ 
        type: String, 
    }, 
    Url:{ 
        type: String, 
    }, 
    Category:{ 
        type: String, 
    }, 
    checkin1:{ 
        type: Boolean, 
        default: false, 
    }, 
    checkin2:{ 
        type: Boolean, 
        default: false, 
    }, 
    checkin3:{ 
        type: Boolean, 
        default: false, 
    }, 
  }, 
  { timestamps: true } 
); 
 
module.exports = mongoose.model("attendee", attendeeSchema);