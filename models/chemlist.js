const mongoose = require("mongoose");

const ChemlistSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    //   require: true,
    //   min: 3,
    //   max: 100,
    //   unique: true,
    },
    Category:{
        type: String,
        // require: true,
    },
    Abstractid:{
        type: String,
        // require: true,
    },
    Email: {
      type: String,
    //   required: true,
    //   max: 50,
    //   unique: true,
    },
    Abstract: {
      type: String,
    //   required: true,
    },
    org:{
        type: String,
        // required: true,
    },
    address:{
        type: String,
        // required: true,
    },
    mobile:{
        type: String,
        // required: true,
    },
    participationType:{
        type: String,
    },
    Amount:{
        type: String,
    },
    Kit:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("chemlist", ChemlistSchema);