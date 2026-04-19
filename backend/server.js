const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const resultRoutes = require("./routes/result");
const profileRoutes = require("./routes/profile");
const recommendationRoutes = require("./routes/recommendation");
const chatbotRoutes = require("./routes/chatbot");
const aptitudeRoutes = require("./routes/aptitude");
const readinessRoutes = require("./routes/readiness");
const adminRoutes=require("./routes/admin")
const feedbackRoutes = require("./routes/feedback");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/chatbot", chatbotRoutes);   // ✅ FIXED ROUTE
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/readiness", readinessRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB error:", err.message));

app.get("/", (req, res) => {
res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});