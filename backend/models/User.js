const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "working", "others"],
    required: true
  },

  course: {
    type: String,
    default: null
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  securityAnswer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);