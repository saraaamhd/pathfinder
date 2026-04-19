const modal=document.getElementById("difficultyModal")

const beginnerBtn=document.getElementById("beginnerBtn")
const intermediateBtn=document.getElementById("intermediateBtn")
const advancedBtn=document.getElementById("advancedBtn")

const instructions=document.getElementById("instructions")
const hintArea=document.getElementById("hintArea")

const prevBtn=document.getElementById("prevStep")
const nextBtn=document.getElementById("nextStep")

const terminal=document.getElementById("terminalOutput")
const commandInput=document.getElementById("commandInput")

const vmStatus=document.getElementById("vmStatus")
const firewallStatus=document.getElementById("firewallStatus")
const appStatus=document.getElementById("appStatus")

let step=0
let mode="beginner"

let state={
vm:false,
firewall:false,
app:false
}

const steps=[

{
title:"Introduction",
text:`Cloud engineers manage infrastructure using command line tools.

We will simulate AWS CLI commands to deploy an application.`
},

{
title:"Check Existing Instances",
text:`Type the command:

aws ec2 describe-instances

This command checks if any virtual machines are running.`
},

{
title:"Launch EC2 Instance",
text:`Type:

aws ec2 run-instances --instance-type t2.micro

This launches a small server in the cloud.`
},

{
title:"Check Security Groups",
text:`Type:

aws ec2 describe-security-groups

This checks firewall rules.`
},

{
title:"Open HTTP Port",
text:`Type:

aws ec2 authorize-security-group-ingress --port 80

This allows web traffic.`
},

{
title:"Deploy Application",
text:`Type:

docker run webapp

This deploys the application container.`
}

]

function loadStep(){
instructions.innerHTML=
"<h4>"+steps[step].title+"</h4><p>"+steps[step].text+"</p>"
}

beginnerBtn.onclick=()=>{
mode="beginner"
modal.style.display="none"
step=0
loadStep()
}

intermediateBtn.onclick=()=>{
mode="intermediate"
modal.style.display="none"

document.getElementById("navButtons").style.display="none"

instructions.innerHTML=`
<h4>Intermediate Mode</h4>
<p>Deploy the infrastructure using AWS CLI style commands.</p>

<button onclick="showHint()">💡 Hint</button>

<p>If too difficult switch to beginner.</p>
<button onclick="switchBeginner()">Go to Beginner</button>
`
}

advancedBtn.onclick=()=>{
mode="advanced"
modal.style.display="none"

document.getElementById("navButtons").style.display="none"

instructions.innerHTML=`
<h4>Advanced Mode</h4>
<p>Deploy a working application infrastructure.</p>

<button onclick="switchIntermediate()">Go to Intermediate</button>
`
}

function switchBeginner(){
mode="beginner"
step=0
document.getElementById("navButtons").style.display="block"
loadStep()
}

function switchIntermediate(){
mode="intermediate"

instructions.innerHTML=`
<h4>Intermediate Mode</h4>
<p>Deploy the infrastructure using AWS CLI commands.</p>

<button onclick="showHint()">💡 Hint</button>

<button onclick="switchBeginner()">Go to Beginner</button>
`
}

function showHint(){
hintArea.innerHTML=`
<p>Hint:</p>
<ul>
<li>Check instances first</li>
<li>Launch EC2 instance</li>
<li>Open firewall port</li>
<li>Deploy application</li>
</ul>
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

function log(text){
terminal.textContent+="\n"+text
terminal.scrollTop=terminal.scrollHeight
}

function runCommand(){

const cmd=commandInput.value.trim()

if(cmd==="aws ec2 describe-instances"){
log("Checking EC2 instances...")
log("No instances found.")
}

else if(cmd.startsWith("aws ec2 run-instances")){
state.vm=true
vmStatus.innerText="EC2 Instance: ✔ Running"
log("Launching EC2 instance...")
log("Instance started successfully.")
}

else if(cmd==="aws ec2 describe-security-groups"){
log("Security group rules:")
log("Port 80: BLOCKED")
}

else if(cmd.startsWith("aws ec2 authorize-security-group-ingress")){
state.firewall=true
firewallStatus.innerText="Security Group: ✔ Port 80 Open"
log("Opening port 80...")
log("Firewall rule updated.")
}

else if(cmd==="docker run webapp"){

if(state.vm && state.firewall){

state.app=true
appStatus.innerText="Application: ✔ Running"

log("Pulling container image...")
log("Starting application...")
log("Application deployed successfully.")

}else{

log("ERROR: Infrastructure not ready.")

}

}

else{
log("Command not recognized.")
}

commandInput.value=""
}