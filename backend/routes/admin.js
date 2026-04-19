const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Result = require("../models/Result");
const CareerDomain = require("../models/CareerDomain");


/* ===============================
   USERS MANAGEMENT
================================ */


/* Get all users */

router.get("/users", async (req, res) => {

try {

const users = await User.find().select("name email");

res.json(users);

} catch (error) {

console.error("Error fetching users:", error);
res.status(500).json({ error: "Failed to fetch users" });

}

});


/* Add user */

router.post("/addUser", async (req, res) => {

try {

const { name, email } = req.body;

const user = new User({
name,
email
});

await user.save();

res.json({ message: "User added successfully" });

} catch (error) {

console.error("Error adding user:", error);
res.status(500).json({ error: "Failed to add user" });

}

});


/* Edit user */

router.put("/editUser/:id", async (req, res) => {

try {

await User.findByIdAndUpdate(req.params.id, req.body);

res.json({ message: "User updated successfully" });

} catch (error) {

console.error("Error updating user:", error);
res.status(500).json({ error: "Failed to update user" });

}

});


/* Delete user */

router.delete("/deleteUser/:id", async (req, res) => {

try {

await User.findByIdAndDelete(req.params.id);

res.json({ message: "User deleted successfully" });

} catch (error) {

console.error("Error deleting user:", error);
res.status(500).json({ error: "Failed to delete user" });

}

});



/* ===============================
   CAREER DOMAIN MANAGEMENT
================================ */


/* Get all domains */

router.get("/domains", async (req, res) => {

try {

const domains = await CareerDomain.find();

res.json(domains);

} catch (error) {

console.error("Error fetching domains:", error);
res.status(500).json({ error: "Failed to fetch domains" });

}

});


/* Add domain */

router.post("/addDomain", async (req, res) => {

try {

const domain = new CareerDomain(req.body);

await domain.save();

res.json({ message: "Domain added successfully" });

} catch (error) {

console.error("Error adding domain:", error);
res.status(500).json({ error: "Failed to add domain" });

}

});


/* Edit domain */

router.put("/editDomain/:id", async (req, res) => {

try {

await CareerDomain.findByIdAndUpdate(req.params.id, req.body);

res.json({ message: "Domain updated successfully" });

} catch (error) {

console.error("Error updating domain:", error);
res.status(500).json({ error: "Failed to update domain" });

}

});


/* Delete domain */

router.delete("/deleteDomain/:id", async (req, res) => {

try {

await CareerDomain.findByIdAndDelete(req.params.id);

res.json({ message: "Domain deleted successfully" });

} catch (error) {

console.error("Error deleting domain:", error);
res.status(500).json({ error: "Failed to delete domain" });

}

});



/* ===============================
   APTITUDE RESULTS VIEW
================================ */


router.get("/results", async (req, res) => {

try {

const results = await Result.find()
.populate("user", "name email")
.sort({ takenAt: -1 });


const formattedResults = results.map(r => ({

userName: r.user ? r.user.name : "Unknown",

email: r.user ? r.user.email : "",

topDomain: r.topAptitudeDomain,

secondDomain: r.secondAptitudeDomain,

date: r.takenAt

}));


res.json(formattedResults);

} catch (error) {

console.error("Error fetching results:", error);
res.status(500).json({ error: "Failed to fetch results" });

}

});

const Question = require("../models/Question")



/* =========================
   GET ALL QUESTIONS
========================= */

router.get("/questions", async (req,res)=>{

try{

const questions = await Question.find()

res.json(questions)

}catch(err){

res.status(500).json({error:"Failed to fetch questions"})

}

})


/* =========================
   ADD QUESTION
========================= */

router.post("/addQuestion", async (req,res)=>{

try{

const question = new Question(req.body)

await question.save()

res.json({message:"Question added"})

}catch(err){

res.status(500).json({error:"Failed to add question"})

}

})


/* =========================
   EDIT QUESTION
========================= */

router.put("/editQuestion/:id", async (req,res)=>{

try{

await Question.findByIdAndUpdate(req.params.id,req.body)

res.json({message:"Question updated"})

}catch(err){

res.status(500).json({error:"Failed to update question"})

}

})


/* =========================
   DELETE QUESTION
========================= */

router.delete("/deleteQuestion/:id", async (req,res)=>{

try{

await Question.findByIdAndDelete(req.params.id)

res.json({message:"Question deleted"})

}catch(err){

res.status(500).json({error:"Failed to delete question"})

}

})


/* =========================
   VIEW APTITUDE RESULTS
========================= */

router.get("/aptitudeResults", async (req,res)=>{

try{

const results = await Result.find()
.populate("user","name email")

res.json(results)

}catch(err){

res.status(500).json({error:"Failed to fetch results"})

}

})

module.exports = router;