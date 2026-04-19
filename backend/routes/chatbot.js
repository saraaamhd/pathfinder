const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyC51H4TbFsP5D8r-58lX1qZZQW6Zj_OLSI");

// Free fast Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Please type a message." });
    }

    const prompt = `
You are Pathfinder AI Career Coach.

Your responsibilities:
• Explain technology concepts
• Help with AI, ML, IoT, Cloud, Cybersecurity, Web Development, Data Science
• Suggest career paths
• Be friendly and clear

User question:
${userMessage}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    res.json({ reply: text });

  } catch (error) {

    console.error("Chatbot error:", error);

    res.json({
      reply: "Sorry, I couldn't generate a response."
    });

  }
});

module.exports = router;