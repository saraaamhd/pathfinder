const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SkillProfile = require("../models/SkillProfile");

// 🔐 Verify Token
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

// 📝 Create or Update Skill Profile
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills) {
      return res.status(400).json({ message: "Skills data missing" });
    }

    let profile = await SkillProfile.findOne({ user: req.userId });

    if (profile) {
      profile.skills = skills;
      await profile.save();
      return res.status(200).json({ message: "Profile updated successfully" });
    }

    profile = new SkillProfile({
      user: req.userId,
      skills
    });

    await profile.save();

    res.status(201).json({ message: "Profile created successfully" });

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🔎 Get Logged-in User Profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const profile = await SkillProfile.findOne({ user: req.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;