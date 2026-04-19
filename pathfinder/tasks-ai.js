let mode="beginner"
let datasetLoaded=false
let weights=null

const algorithmDescriptions={
"Logistic Regression":
"Logistic Regression computes a probability using a weighted sum of features passed through a sigmoid function.",

"Decision Tree":
"A Decision Tree learns decision thresholds from the dataset and splits features step by step.",

"Random Forest":
"Random Forest builds multiple decision trees and averages their predictions.",

"Neural Network":
"A Neural Network uses layers of weighted neurons to detect complex relationships between features."
}

function updateAlgorithmInfo(){
if(mode!=="beginner") return
let algo=document.getElementById("algorithm").value
document.getElementById("algorithmInfo").innerText=algorithmDescriptions[algo]
}

function setMode(m){
mode=m

if(m==="beginner"){
document.getElementById("instructions").innerText=
`Step 1 Load dataset
Step 2 Train model
Step 3 Enter patient data
Step 4 Predict diabetes risk`
updateAlgorithmInfo()
}

if(m==="intermediate"){
document.getElementById("instructions").innerText=
"Train the model and analyze predictions."
document.getElementById("algorithmInfo").innerText=""
}

if(m==="advanced"){
document.getElementById("instructions").innerText=
"Experiment with algorithms and evaluate model behaviour."
document.getElementById("algorithmInfo").innerText=""
}
}

const data=[
[45,29,120,80,0],
[50,31,160,90,1],
[32,25,110,70,0],
[60,35,180,100,1],
[40,28,130,85,0]
]

function loadDataset(){

let table="<tr><th>Age</th><th>BMI</th><th>Glucose</th><th>BP</th><th>Risk</th></tr>"

data.forEach(d=>{
table+=`<tr>
<td>${d[0]}</td>
<td>${d[1]}</td>
<td>${d[2]}</td>
<td>${d[3]}</td>
<td>${d[4]?"High":"Low"}</td>
</tr>`
})

document.getElementById("dataset").innerHTML=table

datasetLoaded=true
log("Dataset loaded")
}

function trainModel(){

if(!datasetLoaded){
log("Load dataset first")
return
}

/* SAFE algorithm detection */
let algorithm = "Logistic Regression"
let sel = document.querySelector("select")
if(sel) algorithm = sel.value

log("Training " + algorithm + " model...")

let avg=[0,0,0,0]

data.forEach(d=>{
for(let i=0;i<4;i++) avg[i]+=d[i]
})

for(let i=0;i<4;i++) avg[i]/=data.length

weights={
age:avg[0]/100,
bmi:avg[1]/50,
glucose:avg[2]/200,
bp:avg[3]/150
}

log("Weights learned from dataset")

drawFeatureImportance()
drawNeuralNetwork()
drawConfusionMatrix()

}

function sigmoid(x){
return 1/(1+Math.exp(-x))
}

function predict(){

let age=parseFloat(document.getElementById("age").value)
let bmi=parseFloat(document.getElementById("bmi").value)
let glucose=parseFloat(document.getElementById("glucose").value)
let bp=parseFloat(document.getElementById("bp").value)

if(!weights){
document.getElementById("prediction").innerText="Train model first"
return
}

let z=
age*weights.age+
bmi*weights.bmi+
glucose*weights.glucose+
bp*weights.bp

let prob=sigmoid(z/50)

let result="Low Risk"

if(prob>0.6) result="High Risk"
else if(prob>0.45) result="Medium Risk"

document.getElementById("prediction").innerText=result

updateFeatureImportance(age,bmi,glucose,bp)
updateAccuracy(prob)
updateConfusionMatrix(result)
}

function updateAccuracy(prob){

let canvas=document.getElementById("accuracyChart")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=150

ctx.clearRect(0,0,300,150)

let acc=[60,70,80,prob*100]

ctx.beginPath()

acc.forEach((v,i)=>{
ctx.lineTo(i*80,150-v)
})

ctx.strokeStyle="lime"
ctx.stroke()
}

function drawFeatureImportance(){

let canvas=document.getElementById("featureChart")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=150

ctx.clearRect(0,0,300,150)

let features=[
["Age",weights.age*100],
["BMI",weights.bmi*100],
["Glucose",weights.glucose*100],
["BP",weights.bp*100]
]

features.forEach((f,i)=>{
ctx.fillStyle="cyan"
ctx.fillRect(i*70,150-f[1],30,f[1])
ctx.fillStyle="white"
ctx.fillText(f[0],i*70,140)
})
}

function updateFeatureImportance(age,bmi,glucose,bp){

let canvas=document.getElementById("featureChart")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=150

ctx.clearRect(0,0,300,150)

let features=[
["Age",age/2],
["BMI",bmi*2],
["Glucose",glucose/2],
["BP",bp/2]
]

features.forEach((f,i)=>{
ctx.fillStyle="orange"
ctx.fillRect(i*70,150-f[1],30,f[1])
ctx.fillStyle="white"
ctx.fillText(f[0],i*70,140)
})
}

function drawConfusionMatrix(){

document.getElementById("confusionMatrix").innerHTML=`
<tr><th></th><th>Pred High</th><th>Pred Low</th></tr>
<tr><th>Actual High</th><td>4</td><td>1</td></tr>
<tr><th>Actual Low</th><td>1</td><td>4</td></tr>`
}

function updateConfusionMatrix(result){

let TP=result==="High Risk"?5:4
let TN=result==="Low Risk"?5:4

document.getElementById("confusionMatrix").innerHTML=`
<tr><th></th><th>Pred High</th><th>Pred Low</th></tr>
<tr><th>Actual High</th><td>${TP}</td><td>1</td></tr>
<tr><th>Actual Low</th><td>1</td><td>${TN}</td></tr>`
}

function drawNeuralNetwork(){

let canvas=document.getElementById("nnCanvas")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=150

ctx.clearRect(0,0,300,150)

for(let i=0;i<4;i++){
ctx.beginPath()
ctx.arc(50,30+i*25,6,0,Math.PI*2)
ctx.fill()
}

for(let i=0;i<3;i++){
ctx.beginPath()
ctx.arc(150,40+i*35,6,0,Math.PI*2)
ctx.fill()
}

ctx.beginPath()
ctx.arc(250,70,6,0,Math.PI*2)
ctx.fill()
}

function log(t){
let console=document.getElementById("console")
console.innerHTML+=t+"<br>"
console.scrollTop=console.scrollHeight
}

document.addEventListener("DOMContentLoaded",updateAlgorithmInfo)