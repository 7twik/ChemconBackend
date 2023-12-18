const mongoose = require("mongoose");

const ChemlistSchema = new mongoose.Schema(
  {
    Name:{
        type:String,
    },
    Count:{
        type:Number,
    },
    Index:{
        type:Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("emaillist", EmailSchema);