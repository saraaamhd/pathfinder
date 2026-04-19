const mongoose = require("mongoose");

const skillProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  skills: {
    type: Object,   // stores python, java, aws, etc with level numbers
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SkillProfile", skillProfileSchema);