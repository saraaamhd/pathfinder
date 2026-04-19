const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Software Development?</h2>
      <p>
        Software development is the process of creating applications, websites,
        and systems that people use every day.
      </p>
      <p>
        Developers design, build, test, and maintain software — just like
        architects build and maintain buildings.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>Developer Roles</h2>
      <ul>
        <li><b>Frontend:</b> What users see and interact with</li>
        <li><b>Backend:</b> Logic, databases, servers</li>
        <li><b>Full Stack:</b> Both frontend & backend</li>
        <li><b>Tester / QA:</b> Ensures quality and reliability</li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Technologies</h2>
      <p>Languages: HTML, CSS, JavaScript, Python, Java</p>
      <p>Frameworks: React, Node.js, Django</p>
      <p>Tools: Git, GitHub, VS Code</p>
    `;
  }

  if (type === "salary") {
    content.innerHTML = `
      <h2>Salary & Compensation</h2>
      <p>Freshers: ₹3–8 LPA</p>
      <p>Mid-level: ₹10–20 LPA</p>
      <p>Senior: ₹25+ LPA</p>
    `;
  }

  if (type === "companies") {
    content.innerHTML = `
      <h2>Top Hiring Companies</h2>
      <p>Google, Microsoft, Amazon, Infosys, TCS, Startups</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>Junior Developer → Senior → Lead → Architect / Manager</p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
