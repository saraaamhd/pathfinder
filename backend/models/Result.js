const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  scores: {
    development: { type: Number, default: 0 },
    security: { type: Number, default: 0 },
    data: { type: Number, default: 0 },
    ai: { type: Number, default: 0 },
    cloud: { type: Number, default: 0 },
    iot: { type: Number, default: 0 }
  },

  topAptitudeDomain: {
    type: String,
    required: true
  },

  secondAptitudeDomain: {
    type: String
  },

  skillDomain: {
    type: String
  },

  finalPrimaryDomain: {
    type: String
  },

  finalSecondaryDomain: {
    type: String
  },

  decisionType: {
    type: String, // "aptitude" or "strength"
  },

  takenAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);