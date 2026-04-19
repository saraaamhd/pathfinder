const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Data & Analytics?</h2>
      <p>
        Data & Analytics is about collecting, cleaning, analyzing,
        and interpreting data to support better decisions.
      </p>
      <p>
        Analysts help organizations understand patterns, trends,
        and performance using data.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>Analytics Roles</h2>
      <ul>
        <li><b>Data Analyst</b></li>
        <li><b>Business Analyst</b></li>
        <li><b>BI Analyst</b></li>
        <li><b>Reporting Analyst</b></li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Technologies</h2>
      <p>Excel, SQL, Python</p>
      <p>Power BI, Tableau</p>
      <p>Data visualization & reporting tools</p>
    `;
  }

  if (type === "salary") {
    content.innerHTML = `
      <h2>Salary & Compensation</h2>
      <p>Freshers: ₹4–8 LPA</p>
      <p>Mid-level: ₹10–18 LPA</p>
      <p>Senior: ₹20+ LPA</p>
    `;
  }

  if (type === "companies") {
    content.innerHTML = `
      <h2>Top Hiring Companies</h2>
      <p>Consulting firms, IT companies, startups, analytics firms</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>
        Junior Analyst → Data Analyst → Senior Analyst →
        Analytics Manager → Data Lead
      </p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
