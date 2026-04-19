let mode="beginner"

const data=[

["North","Laptop",5000,1200],
["South","Phone",4000,900],
["East","Tablet",3000,600],
["West","Laptop",4500,1100],
["North","Phone",3500,700]

]

function setMode(m){

mode=m

if(m==="beginner"){

document.getElementById("instructions").innerText=
`Step 1: Load the dataset.

Step 2: Look at the Sales column and identify the highest value.

Step 3: Identify which product generated that highest sale.

Step 4: Calculate average profit.

Formula:
Average Profit = (1200 + 900 + 600 + 1100 + 700) / 5

Step 5: Identify which region appears most frequently.`

document.getElementById("hintBtn").style.display="none"

}

if(m==="intermediate"){

document.getElementById("instructions").innerText=
`Analyze the dataset and determine:

1 Best selling product
2 Average profit
3 Most frequent region`

document.getElementById("hintBtn").style.display="block"

}

if(m==="advanced"){

document.getElementById("instructions").innerText=
`Perform independent data analysis and derive insights from the dataset.`

document.getElementById("hintBtn").style.display="none"

}

}

function showHint(){

document.getElementById("hintBox").style.display = "block"

}

function closeHint(){

document.getElementById("hintBox").style.display = "none"

}

function loadDataset(){

let table="<tr><th>Region</th><th>Product</th><th>Sales</th><th>Profit</th></tr>"

data.forEach(d=>{

table+=`<tr>
<td>${d[0]}</td>
<td>${d[1]}</td>
<td>${d[2]}</td>
<td>${d[3]}</td>
</tr>`

})

document.getElementById("dataset").innerHTML=table

drawChart()

}

function checkAnswers(){

let maxSales=document.getElementById("maxSales").value
let bestProduct=document.getElementById("bestProduct").value
let avgProfit=document.getElementById("avgProfit").value
let bestRegion=document.getElementById("bestRegion").value

if(
maxSales==5000 &&
bestProduct.toLowerCase()=="laptop" &&
avgProfit==900 &&
bestRegion.toLowerCase()=="north"
){

document.getElementById("result").innerText="Correct! Dataset successfully analyzed."

}
else{

document.getElementById("result").innerText="Some answers are incorrect. Check the dataset again."

}

}

function drawChart(){

let canvas=document.getElementById("chart")
let ctx=canvas.getContext("2d")

canvas.width=300
canvas.height=150

ctx.clearRect(0,0,300,150)

let sales=data.map(d=>d[2])

sales.forEach((s,i)=>{

ctx.fillStyle="cyan"
ctx.fillRect(i*60,150-s/50,40,s/50)

})

}