const mongoose = require("mongoose");

const ChemlistSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Category:{
        type: String,
    },
    Email: {
      type: String,
    },
    Mobile:{
        type: String,
    },
    Kit:{
        type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chemlist", ChemlistSchema);