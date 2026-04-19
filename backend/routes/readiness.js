const express = require("express");
const router = express.Router();

router.get("/score/:userId", async (req, res) => {

    try {

        // For demo we generate readiness automatically
        // later you can connect to database

        let aptitudeCompleted = true
        let demoTasksCompleted = 2
        let exploredDomains = true

        let score = 0

        if(aptitudeCompleted) score += 50
        score += demoTasksCompleted * 10

        if(exploredDomains) score += 20

        if(score > 100) score = 100

        res.json({
            readinessScore: score
        })

    } catch(error){

        console.error(error)

        res.json({
            readinessScore: 0
        })

    }

})

module.exports = router