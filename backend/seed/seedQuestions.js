const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/Question");

mongoose.connect(process.env.MONGO_URI);

const questions = [
  // 1
  {
    text: "When you face a new problem, what is your natural first step?",
    options: [
      { text: "Break it into smaller parts", domain: "development" },
      { text: "Check if anything risky could happen", domain: "security" },
      { text: "Look for patterns from similar situations", domain: "data" },
      { text: "Think of smarter or automated solutions", domain: "ai" }
    ]
  },

  // 2
  {
    text: "You get free time unexpectedly. What do you usually enjoy doing?",
    options: [
      { text: "Building or fixing something", domain: "development" },
      { text: "Learning how systems work", domain: "security" },
      { text: "Analyzing trends or results", domain: "data" },
      { text: "Exploring futuristic ideas", domain: "ai" }
    ]
  },

  // 3
  {
    text: "What kind of tasks keep you engaged the longest?",
    options: [
      { text: "Step-by-step creation", domain: "development" },
      { text: "Identifying weaknesses", domain: "security" },
      { text: "Comparing information", domain: "data" },
      { text: "Improving processes", domain: "ai" }
    ]
  },

  // 4
  {
    text: "When learning something new, you prefer:",
    options: [
      { text: "Hands-on practice", domain: "development" },
      { text: "Understanding rules and limits", domain: "security" },
      { text: "Seeing examples and numbers", domain: "data" },
      { text: "Understanding the logic behind it", domain: "ai" }
    ]
  },

  // 5
  {
    text: "If a system fails, what concerns you most?",
    options: [
      { text: "How to fix it quickly", domain: "development" },
      { text: "Why it failed and who can access it", domain: "security" },
      { text: "What data was affected", domain: "data" },
      { text: "How it can be improved next time", domain: "ai" }
    ]
  }
];

// AUTO-GENERATE SIMILAR QUESTIONS UP TO 60
while (questions.length < 60) {
  questions.push({
    text: `Decision-making scenario ${questions.length + 1}: What do you focus on?`,
    options: [
      { text: "Implementation details", domain: "development" },
      { text: "Safety and control", domain: "security" },
      { text: "Insights and patterns", domain: "data" },
      { text: "Optimization and intelligence", domain: "ai" }
    ]
  });
}

Question.insertMany(questions)
  .then(() => {
    console.log("✅ 60 aptitude questions inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));