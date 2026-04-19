const startBtn = document.getElementById("start-btn");
const proceedBtn = document.getElementById("proceed-btn");
const nextBtn = document.getElementById("next-btn");

const startScreen = document.getElementById("start-screen");
const warningModal = document.getElementById("warning-modal");
const questionScreen = document.getElementById("question-screen");

const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");

let questions = [];
let currentQuestion = 0;
let selectedOption = null;

let scores = {
  development: 0,
  security: 0,
  data: 0,
  ai: 0,
  cloud: 0,
  iot: 0
};



// =============================
// START BUTTON
// =============================
startBtn.onclick = () => {
  warningModal.classList.remove("hidden");
};



// =============================
// PROCEED BUTTON
// =============================
proceedBtn.onclick = async () => {
  warningModal.classList.add("hidden");
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");

  await loadAptitudeQuestions();

  if (questions.length > 0) {
    loadQuestion();
  } else {
    alert("No questions received from backend");
  }
};



// =============================
// FETCH QUESTIONS
// =============================
async function loadAptitudeQuestions() {
  try {
    const response = await fetch("http://localhost:5000/api/aptitude/questions");
    questions = await response.json();
    console.log("Fetched questions:", questions);
    currentQuestion = 0;
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}



// =============================
// RENDER QUESTION
// =============================
function loadQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;

  questionScreen.classList.add("fade-out");

  setTimeout(() => {

    nextBtn.disabled = true;
    selectedOption = null;
    optionsDiv.innerHTML = "";

    questionText.textContent = q.text;

    q.options.forEach(optionObj => {

      const div = document.createElement("div");
      div.className = "option";
      div.textContent = optionObj.text;

      div.onclick = () => {

        document.querySelectorAll(".option")
          .forEach(o => o.classList.remove("selected"));

        div.classList.add("selected");
        selectedOption = optionObj;
        nextBtn.disabled = false;
      };

      optionsDiv.appendChild(div);
    });

    questionScreen.classList.remove("fade-out");
    questionScreen.classList.add("fade-in");

  }, 300);
}



// =============================
// SAVE RESULTS (GLOBAL FUNCTION)
// =============================
async function submitResults() {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must log in first.");
    window.location.href = "login.html";
    return;
  }

  try {

    const response = await fetch("http://localhost:5000/api/result/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        scores
      })
    });

    const data = await response.json();
    console.log("Result saved:", data);

  } catch (error) {
    console.error("Error saving result:", error);
  }
}



// =============================
// NEXT BUTTON
// =============================
nextBtn.onclick = async () => {

  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  // Increase score ONCE
  scores[selectedOption.domain]++;

  currentQuestion++;

  if (currentQuestion < questions.length) {

    loadQuestion();

  } else {

    // Save results first
    await submitResults();

    // Redirect automatically
    window.location.href = "skill-profile.html";
  }
};