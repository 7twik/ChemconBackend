const mongoose = require("mongoose"); 
 
const testSchema = new mongoose.Schema( 
  { 
    Name: { 
      type: String, 
    }, 
    email: { 
      type: String, 
    }, 
  }, 
  { timestamps: true } 
); 
 
module.exports = mongoose.model("test", testSchema);