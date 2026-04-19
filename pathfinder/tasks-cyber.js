const modal=document.getElementById("missionModal")
const beginnerBtn=document.getElementById("beginnerBtn")
const intermediateBtn=document.getElementById("intermediateBtn")
const advancedBtn=document.getElementById("advancedBtn")

const instructions=document.getElementById("instructions")
const terminal=document.getElementById("terminalOutput")
const alertFeed=document.getElementById("alertFeed")

const prevBtn=document.getElementById("prevStep")
const nextBtn=document.getElementById("nextStep")

let step=0
let mode="beginner"

const steps=[

{
title:"Understanding the Alert",
text:"The monitoring system detected suspicious login activity. SOC analysts begin by examining authentication logs."
},

{
title:"Reading Logs",
text:"Logs record every login attempt. Look for repeated failures from the same IP address."
},

{
title:"Identifying the Suspicious IP",
text:"Notice IP 185.34.21.90 appears multiple times with failed logins."
},

{
title:"Using the Query Console",
text:"Filter logs by typing: search ip=185.34.21.90 and press Run Query."
},

{
title:"Conclusion",
text:"Multiple failed attempts from one IP indicate a brute force attack."
}

]

function loadStep(){
instructions.innerHTML=`<h4>${steps[step].title}</h4><p>${steps[step].text}</p>`
}

beginnerBtn.onclick=()=>{
mode="beginner"
modal.style.display="none"
document.querySelector(".step-controls").style.display="block"

step=0
loadStep()
}

intermediateBtn.onclick=()=>{
mode="intermediate"
modal.style.display="none"

document.querySelector(".step-controls").style.display="none"

instructions.innerHTML=`
<h4>Intermediate Investigation</h4>

<p>Investigate the authentication logs and determine if an attack occurred.</p>

<p><b>Hints:</b></p>

<ul>
<li>Look for repeated failed login attempts</li>
<li>Check if one IP appears many times</li>
<li>Short time intervals can indicate automated attacks</li>
</ul>

<p>If this feels difficult you can switch to Beginner mode for guided investigation.</p>

<button onclick="switchToBeginner()">Go to Beginner</button>
`
}

advancedBtn.onclick=()=>{
mode="advanced"
modal.style.display="none"

document.querySelector(".step-controls").style.display="none"

instructions.innerHTML=`
<h4>Advanced Investigation</h4>

<p>Analyze the authentication logs and determine the attack type.</p>

<p>No hints are provided at this level.</p>

<p>If this challenge is too difficult you may switch to Intermediate mode.</p>

<button onclick="switchToIntermediate()">Go to Intermediate</button>
`
}
nextBtn.onclick=()=>{
if(step<steps.length-1){
step++
loadStep()
}
}

prevBtn.onclick=()=>{
if(step>0){
step--
loadStep()
}
}

function addAlert(msg,type){
const p=document.createElement("p")
p.className=type
p.textContent=msg
alertFeed.prepend(p)
}

function startAlerts(){

setTimeout(()=>addAlert("[INFO] Monitoring authentication logs","info"),2000)

setTimeout(()=>addAlert("[WARNING] Multiple login failures detected","warn"),5000)

setTimeout(()=>addAlert("[CRITICAL] Suspicious IP detected: 185.34.21.90","critical"),8000)

}

startAlerts()

function runQuery(){

const query=document.getElementById("queryInput").value

terminal.textContent+="\n> running query..."

if(query.includes("185.34.21.90")){
terminal.textContent+="\n> found multiple login failures from 185.34.21.90"
}

}

function submitAnswer(){

const ans=document.getElementById("answerInput").value.toLowerCase()

if(ans.includes("brute")){
terminal.textContent+="\n> Correct: Brute Force Attack detected"
}else{
terminal.textContent+="\n> Incorrect. Review the logs again."
}

}


// SWITCH MODES FROM BUTTONS

function switchToBeginner(){

mode = "beginner";
step = 0;

// show step navigation
document.querySelector(".step-controls").style.display = "block";

// reload beginner instructions
loadStep();

}

function switchToIntermediate(){

mode = "intermediate";

// hide step navigation
document.querySelector(".step-controls").style.display = "none";

instructions.innerHTML = `
<h4>Intermediate Investigation</h4>

<p>Investigate the authentication logs and determine if an attack occurred.</p>

<p><b>Hints:</b></p>

<ul>
<li>Look for repeated failed login attempts</li>
<li>Check if one IP appears many times</li>
<li>Short time intervals often indicate brute force attacks</li>
</ul>

<p>If this investigation feels difficult you may switch to Beginner mode.</p>

<button onclick="switchToBeginner()">Go to Beginner</button>
`;

}