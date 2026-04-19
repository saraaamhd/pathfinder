const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Result = require("../models/Result");
const SkillProfile = require("../models/SkillProfile");


// 🔐 Verify Token Middleware
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



// 🧠 Hybrid Recommendation Engine
router.get("/", verifyToken, async (req, res) => {
  try {

    // 1️⃣ Get latest aptitude result
    const result = await Result.findOne({ user: req.userId })
      .sort({ takenAt: -1 });

    if (!result) {
      return res.status(404).json({ message: "No aptitude result found" });
    }

    // 2️⃣ Get skill profile
    const profile = await SkillProfile.findOne({ user: req.userId });

    if (!profile) {
      return res.status(404).json({ message: "No skill profile found" });
    }

    const aptitudeScores = result.scores;
    const skillLevels = profile.skills;

    // 3️⃣ Domain-Skill Mapping
    const domainSkillMap = {
      development: ["python", "java", "javascript", "cpp", "webdev", "backend", "dsa"],
      security: ["linux", "networking"],
      data: ["python", "statistics", "dataanalysis"],
      ai: ["python", "statistics"],
      cloud: ["cloud", "docker", "linux"],
      iot: ["electronics", "microcontrollers", "cpp"]
    };

    const finalScores = {};

    // 4️⃣ Calculate Hybrid Score
    for (let domain in domainSkillMap) {

      const aptitudeScore = aptitudeScores[domain] || 0;

      let skillScore = 0;

      domainSkillMap[domain].forEach(skill => {
        skillScore += skillLevels[skill] || 0;
      });

      const weightedScore =
        (aptitudeScore * 0.6) +
        (skillScore * 0.4);

      finalScores[domain] = Number(weightedScore.toFixed(2));
    }

    // 5️⃣ Sort domains
    const sortedDomains = Object.keys(finalScores)
      .sort((a, b) => finalScores[b] - finalScores[a]);

    res.status(200).json({
      finalScores,
      recommendedDomain: sortedDomains[0],
      secondRecommendation: sortedDomains[1]
    });

  } catch (error) {
    console.error("RECOMMENDATION ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;