const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// ✅ Get 20 random aptitude questions
router.get("/questions", async (req, res) => {
  try {
    const skillQuestions = await Question.aggregate([
      { $match: { category: "skill" } },
      { $sample: { size: 5 } }
    ]);

    const interestQuestions = await Question.aggregate([
      { $match: { category: "interest" } },
      { $sample: { size: 5 } }
    ]);

    const scenarioQuestions = await Question.aggregate([
      { $match: { category: "scenario" } },
      { $sample: { size: 5 } }
    ]);

    let finalQuestions = [
      ...skillQuestions,
      ...interestQuestions,
      ...scenarioQuestions
    ];

    // Shuffle the 15 questions
    finalQuestions = finalQuestions.sort(() => Math.random() - 0.5);

    res.json(finalQuestions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load questions" });
  }
});

module.exports = router;