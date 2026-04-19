const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Artificial Intelligence?</h2>
      <p>
        Artificial Intelligence is a field of computer science
        where machines are trained to think, learn, and make decisions
        like humans.
      </p>
      <p>
        AI powers chatbots, recommendation systems, voice assistants,
        self-driving cars, and more.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>AI Roles</h2>
      <ul>
        <li><b>AI Engineer</b></li>
        <li><b>Machine Learning Engineer</b></li>
        <li><b>AI Researcher</b></li>
        <li><b>Data Scientist</b></li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Technologies</h2>
      <p>Python, NumPy, Pandas</p>
      <p>TensorFlow, PyTorch, Scikit-learn</p>
      <p>Math, statistics, algorithms</p>
    `;
  }

  if (type === "salary") {
    content.innerHTML = `
      <h2>Salary & Compensation</h2>
      <p>Freshers: ₹6–12 LPA</p>
      <p>Mid-level: ₹15–30 LPA</p>
      <p>Senior: ₹40+ LPA</p>
    `;
  }

  if (type === "companies") {
    content.innerHTML = `
      <h2>Top Hiring Companies</h2>
      <p>Google, OpenAI, Microsoft, Amazon, Meta, AI startups</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>
        AI Engineer → Senior AI Engineer → AI Architect →
        Research Lead / AI Scientist
      </p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
