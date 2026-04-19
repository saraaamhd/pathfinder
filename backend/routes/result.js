const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Result = require("../models/Result");

// 🔐 VERIFY TOKEN
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ✅ SAVE APTITUDE RESULT
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { scores } = req.body;

    if (!scores) {
      return res.status(400).json({ message: "Missing scores" });
    }

    const userId = req.userId;

    // Sort domains by highest score
    const sortedDomains = Object.keys(scores).sort(
      (a, b) => scores[b] - scores[a]
    );

    const topDomain = sortedDomains[0];
    const secondDomain = sortedDomains[1];

    const newResult = new Result({
      user: userId,
      scores,
      topAptitudeDomain:topDomain,
      secondAptitudeDomain:secondDomain
    });

    await newResult.save();

    res.status(201).json({
      message: "Result saved successfully"
    });

  } catch (error) {
    console.error("RESULT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;