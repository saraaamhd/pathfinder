const modal=document.getElementById("introModal")

const beginnerBtn=document.getElementById("beginnerBtn")
const intermediateBtn=document.getElementById("intermediateBtn")
const advancedBtn=document.getElementById("advancedBtn")

const instructions=document.getElementById("instructions")
const requirements=document.getElementById("requirements")

const nextBtn=document.getElementById("nextBtn")
const prevBtn=document.getElementById("prevBtn")

const htmlEditor=document.getElementById("htmlEditor")
const cssEditor=document.getElementById("cssEditor")
const jsEditor=document.getElementById("jsEditor")

const runCode=document.getElementById("runCode")

const preview=document.getElementById("preview")

const solutionBtn=document.getElementById("solutionBtn")
const solutionModal=document.getElementById("solutionModal")
const closeSolution=document.getElementById("closeSolution")
const solutionCode=document.getElementById("solutionCode")

const tabs=document.querySelectorAll(".tab")
const editors=document.querySelectorAll(".editor")

const hintModal = document.getElementById("hintModal")
const hintText = document.getElementById("hintText")
const closeHint = document.getElementById("closeHint")

let mode="beginner"
let step=0


const steps=[

{
title:"Introduction",
content:`HTML creates the structure of a page.
CSS styles the page.
JavaScript adds behaviour.

In this mission you will build a Create Account form step-by-step.`
},

{
title:"Create Full Name Field",
content:`Type:

&lt;input type="text" placeholder="Full Name"&gt;

input → creates an input field
type="text" → allows text input
placeholder → shows hint text`
},

{
title:"Create Username Field",
content:`Type:

&lt;input type="text" placeholder="Username"&gt;

Username identifies the user account.`
},

{
title:"Create Email Field",
content:`Type:

&lt;input type="email" placeholder="Email"&gt;

type="email" validates email format automatically.`
},

{
title:"Create Password Field",
content:`Type:

&lt;input type="password" placeholder="Password"&gt;

type="password" hides characters for security.`
},

{
title:"Create Age Field",
content:`Type:

&lt;input type="number" placeholder="Age"&gt;

type="number" allows only numeric values.`
},

{
title:"Create Date of Birth Field",
content:`Type:

&lt;input type="date"&gt;

This creates a calendar picker.`
},

{
title:"Create Gender Dropdown",
content:`Type:

&lt;select&gt;
&lt;option&gt;Male&lt;/option&gt;
&lt;option&gt;Female&lt;/option&gt;
&lt;option&gt;Other&lt;/option&gt;
&lt;/select&gt;

select creates a dropdown menu.`
},

{
title:"Create Country Dropdown",
content:`Type:

&lt;select&gt;
&lt;option&gt;India&lt;/option&gt;
&lt;option&gt;USA&lt;/option&gt;
&lt;option&gt;UK&lt;/option&gt;
&lt;/select&gt;`
},

{
title:"Create Address Field",
content:`Type:

&lt;textarea placeholder="Address"&gt;&lt;/textarea&gt;

textarea allows multi-line input.`
},

{
title:"Create Phone Field",
content:`Type:

&lt;input type="tel" placeholder="Phone Number"&gt;

type="tel" is used for phone numbers.`
},

{
title:"Create Submit Button",
content:`Type:

&lt;button&gt;Create Account&lt;/button&gt;

button submits the form.`
},

{
title:"Mission Complete",
content:`Great work! You created a frontend form.

In real applications this data is sent to a backend server and stored in a database.`
}

]
function showHint(){

const hint = `
Hints:

• Use input type="text" for name and username

• Use input type="email" for email

• Use input type="password" for password

• Use input type="number" for age

• Use input type="date" for date of birth

• Use select for dropdowns

• Use textarea for address

• Use input type="tel" for phone

• Use button for submission
`

hintModal.style.display="flex"
hintText.innerHTML = hint

}

const requirementsList = `
<h3>Requirements</h3>

<ul>
<li>Full Name field</li>
<li>Username field</li>
<li>Email field</li>
<li>Password field</li>
<li>Age field</li>
<li>Date of Birth picker</li>
<li>Gender dropdown</li>
<li>Country dropdown</li>
<li>Address textarea</li>
<li>Phone number field</li>
<li>Create Account button</li>
</ul>
`;

function loadStep(){

instructions.innerHTML = `
<h3>Step ${step+1} / ${steps.length}</h3>

<h4>${steps[step].title}</h4>

<div class="instruction-content">
${steps[step].content.replace(/\n/g,"<br>")}
</div>
`;
prevBtn.disabled = step === 0
nextBtn.disabled = step === steps.length-1
}

beginnerBtn.onclick=()=>{
mode="beginner"
modal.style.display="none"

requirements.innerHTML = requirementsList
prevBtn.style.display="inline-block"
nextBtn.style.display="inline-block"
step=0
loadStep()
}

intermediateBtn.onclick=()=>{
mode="intermediate"
modal.style.display="none"
prevBtn.style.display="none"
nextBtn.style.display="none"
requirements.innerHTML = requirementsList

instructions.innerHTML = `
<h3>Mission</h3>

<p>Try building the Create Account form yourself.</p>

<p>Click the <b>Hint</b> button if you need help.</p>

<button id="hintBtn">💡 Hint</button>

<button id="goBeginner">Too hard? Try Beginner</button>
`

document.getElementById("hintBtn").onclick = showHint

document.getElementById("goBeginner").onclick = ()=>{
mode="beginner"
step=0
loadStep()
}
}

advancedBtn.onclick=()=>{
mode="advanced"
modal.style.display="none"
prevBtn.style.display="none"
nextBtn.style.display="none"
requirements.innerHTML = requirementsList

instructions.innerHTML = `
<h3>Mission</h3>

<p>Build the Create Account page independently.</p>

<p>If this challenge feels difficult, you can switch to Intermediate mode for hints.</p>

<button id="goIntermediate">Go to Intermediate</button>
`

document.getElementById("goIntermediate").onclick = ()=>{
mode="intermediate"
intermediateBtn.onclick()
}
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



tabs.forEach(tab=>{

tab.onclick=()=>{

tabs.forEach(t=>t.classList.remove("active"))
tab.classList.add("active")

editors.forEach(e=>e.classList.remove("active"))

document.getElementById(tab.dataset.tab+"Editor").classList.add("active")

}

})



runCode.onclick = function(){

const html = htmlEditor.value;
const css = cssEditor.value;
const js = jsEditor.value;

/* Extract body content only */
let bodyContent = "";

const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if(match){
bodyContent = match[1];
}else{
bodyContent = html;
}

const previewPage = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>

<body>

${bodyContent}

<script>
${js}
<\/script>

</body>
</html>
`;

preview.srcdoc = previewPage;

};



const solution = `
<!DOCTYPE html>
<html>
<head>
<title>Create Account</title>
</head>

<body>

<h2>Create Account</h2>

<input type="text" placeholder="Full Name">

<input type="text" placeholder="Username">

<input type="email" placeholder="Email">

<input type="password" placeholder="Password">

<input type="number" placeholder="Age">

<input type="date">

<select>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<textarea placeholder="Address"></textarea>

<input type="tel" placeholder="Phone Number">

<button>Create Account</button>

</body>
</html>
`;

solutionBtn.onclick=()=>{
solutionModal.style.display="flex"
solutionCode.textContent=solution
}

closeSolution.onclick=()=>{
solutionModal.style.display="none"
}


closeHint.onclick = ()=>{
hintModal.style.display="none"
}

document.addEventListener("paste",e=>e.preventDefault())
document.addEventListener("copy",e=>e.preventDefault())
document.addEventListener("cut",e=>e.preventDefault())