const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Cloud Computing?</h2>
      <p>
        Cloud computing allows you to use servers, storage, databases,
        and software over the internet instead of owning physical machines.
      </p>
      <p>
        It lets companies scale quickly, reduce costs, and access services
        from anywhere in the world.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>Cloud Roles</h2>
      <ul>
        <li><b>Cloud Engineer</b></li>
        <li><b>Cloud Administrator</b></li>
        <li><b>Cloud Architect</b></li>
        <li><b>DevOps Engineer</b></li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Platforms</h2>
      <p>AWS (Amazon Web Services)</p>
      <p>Microsoft Azure</p>
      <p>Google Cloud Platform</p>
      <p>Docker, Kubernetes</p>
    `;
  }

  if (type === "salary") {
    content.innerHTML = `
      <h2>Salary & Compensation</h2>
      <p>Freshers: ₹5–10 LPA</p>
      <p>Mid-level: ₹12–22 LPA</p>
      <p>Senior: ₹30+ LPA</p>
    `;
  }

  if (type === "companies") {
    content.innerHTML = `
      <h2>Top Hiring Companies</h2>
      <p>Amazon, Microsoft, Google, IBM, Accenture, cloud startups</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>
        Cloud Engineer → Senior Engineer → Cloud Architect →
        Cloud Solutions Lead
      </p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
