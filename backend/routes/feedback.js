const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback_temp");

/* =========================
   SUBMIT FEEDBACK
========================= */

router.post("/submit", async (req, res) => {
  try {

    const { userId, rating, comment } = req.body;

    const feedback = new Feedback({
      user: userId,
      rating: rating,
      comment: comment
    });

    await feedback.save();

    res.json({
      success: true,
      message: "Feedback submitted successfully"
    });

  } catch (err) {

    console.error("Submit feedback error:", err);

    res.status(500).json({
      success: false,
      error: "Failed to submit feedback"
    });

  }
});


/* =========================
   GET ALL FEEDBACK (ADMIN)
========================= */

router.get("/all", async (req, res) => {

  try {

    const feedbackList = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbackList);

  } catch (err) {

    console.error("Fetch feedback error:", err);

    res.status(500).json({
      error: "Failed to fetch feedback"
    });

  }

});

module.exports = router;