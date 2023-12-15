const mongoose = require("mongoose"); 
 
const attendeeSchema = new mongoose.Schema( 
  { 
    Name: { 
      type: String, 
    }, 
    Email: { 
      type: String, 
    }, 
    Mobile: { 
      type: String, 
    }, 
    Kit: { 
      type: String, 
    },
    Url:{ 
        type: String, 
    }, 
    Category:{ 
        type: String, 
    }, 
    VerifyCode:{ 
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