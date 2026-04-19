const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["skill", "interest", "scenario"],
    required: true
  },
  options: [
    {
      text: String,
      domain: String
    }
  ]
});

module.exports = mongoose.model("Question", questionSchema);