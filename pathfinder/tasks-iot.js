const modal = document.getElementById("difficultyModal")

const beginnerBtn = document.getElementById("beginnerBtn")
const intermediateBtn = document.getElementById("intermediateBtn")
const advancedBtn = document.getElementById("advancedBtn")

const instructions = document.getElementById("instructions")
const hintArea = document.getElementById("hintArea")

const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

const devices = document.querySelectorAll(".device")
const pins = document.querySelectorAll(".pin")

const log = document.getElementById("log")
const runTest = document.getElementById("runTest")

const fanIcon = document.getElementById("fanIcon")

let step = 0
let mode = "beginner"

let state = {
power:false,
sensor:false,
fan:false
}

const steps=[

{
title:"Introduction",
text:"IoT devices use sensors to detect data and actuators to respond."
},

{
title:"Step 1: Connect Power",
text:"Drag the Power Supply to both VCC and GND pins."
},

{
title:"Step 2: Connect Temperature Sensor",
text:"Drag the Temperature Sensor to GPIO4."
},

{
title:"Step 3: Connect Cooling Fan",
text:"Drag the Cooling Fan to GPIO27."
},

{
title:"Step 4: Run System",
text:"Click Run System to start the IoT device."
}

]

function loadStep(){

instructions.innerHTML =
"<h3>"+steps[step].title+"</h3><p>"+steps[step].text+"</p>"

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

beginnerBtn.onclick=()=>{

mode="beginner"
modal.style.display="none"

document.getElementById("navButtons").style.display="block"

loadStep()

}

intermediateBtn.onclick=()=>{

mode="intermediate"
modal.style.display="none"

instructions.innerHTML="<h3>Intermediate Mode</h3><p>Build the IoT device yourself using the components.</p>"

document.getElementById("navButtons").style.display="none"

hintArea.innerHTML='<button id="hintBtn">Hint</button>'

document.getElementById("hintBtn").onclick=showHint

}

advancedBtn.onclick=()=>{

mode="advanced"
modal.style.display="none"

instructions.innerHTML="<h3>Advanced Mode</h3><p>Configure the IoT device completely on your own.</p>"

document.getElementById("navButtons").style.display="none"

}

function showHint(){

hintArea.innerHTML=`
<div class="hintBox">

<h4>Hint</h4>

<p>Correct connections:</p>

<ul>
<li>Power → VCC and GND</li>
<li>Temperature Sensor → GPIO4</li>
<li>Cooling Fan → GPIO27</li>
</ul>

</div>
`

}

devices.forEach(device=>{

device.addEventListener("dragstart",e=>{

e.dataTransfer.setData("device",e.target.id)

})

})

pins.forEach(pin=>{

pin.addEventListener("dragover",e=>e.preventDefault())

pin.addEventListener("drop",e=>{

const device = e.dataTransfer.getData("device")
const pinType = pin.dataset.pin

if(device==="power" && (pinType==="vcc" || pinType==="gnd")){

state.power=true
pin.classList.add("correct")
document.getElementById("powerStatus").innerText="Power : 🟢"

}

else if(device==="sensor" && pinType==="gpio4"){

state.sensor=true
pin.classList.add("correct")
document.getElementById("sensorStatus").innerText="Sensor : 🟢"

}

else if(device==="fan" && pinType==="gpio27"){

state.fan=true
pin.classList.add("correct")
document.getElementById("fanStatus").innerText="Fan : 🟢"

}

else{

log.textContent+="\nWrong connection."

}

})

})

runTest.onclick=()=>{

if(state.power && state.sensor && state.fan){

log.textContent+="\nSystem Starting..."

let temp=25

const interval=setInterval(()=>{

temp+=2

log.textContent+=`\nTemperature: ${temp}°C`

if(temp>30){

log.textContent+="\nTemperature High!"
log.textContent+="\nActivating Cooling Fan..."

fanIcon.classList.add("spin")

clearInterval(interval)

}

},1000)

}

else{

log.textContent+="\nDevice not fully connected."

}

}