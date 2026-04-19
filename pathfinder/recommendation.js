const topDomainEl = document.getElementById("topDomain");
const secondDomainEl = document.getElementById("secondDomain");
const explanationEl = document.getElementById("explanationText");

async function loadRecommendation() {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/recommendation", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await response.json();
    renderChart(data);

  } catch (error) {
    console.error("Recommendation Error:", error);
  }
}

function renderChart(data) {

  const { finalScores, recommendedDomain, secondRecommendation } = data;

  topDomainEl.textContent =
    "🥇 Best Fit: " + recommendedDomain.toUpperCase();

  secondDomainEl.textContent =
    "Strong Secondary: " + secondRecommendation.toUpperCase();

  const ctx = document.getElementById("careerChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(finalScores).map(d => d.toUpperCase()),
      datasets: [{
        data: Object.values(finalScores),
        backgroundColor: [
          "#4A90E2",
          "#E94E77",
          "#50C878",
          "#9B59B6",
          "#F39C12",
          "#16A085"
        ],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom"
        }
      },
      cutout: "65%"
    }
  });

  generateExplanation(recommendedDomain);
}

function generateExplanation(top) {

  const explanations = {
    development:
      "Your logical thinking and structured problem-solving indicate strong potential in software development. Your skills and aptitude show alignment with building scalable digital systems.",
    security:
      "Your analytical mindset and attention to system structure suggest high potential in cybersecurity and threat analysis domains.",
    data:
      "Your pattern recognition and statistical alignment show promise in data science and analytical roles.",
    ai:
      "Your reasoning ability and technical inclination align with artificial intelligence and machine learning pathways.",
    cloud:
      "Your infrastructure awareness and systems thinking indicate strength in cloud engineering and distributed systems.",
    iot:
      "Your hardware and embedded systems alignment suggest strong potential in IoT and system integration."
  };

  explanationEl.textContent = explanations[top];
}

loadRecommendation();