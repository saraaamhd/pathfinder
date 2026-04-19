const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Cybersecurity?</h2>
      <p>
        Cybersecurity is the practice of protecting computers, networks,
        servers, and data from attacks, unauthorized access, and damage.
      </p>
      <p>
        Cybersecurity professionals act like digital guards who protect
        information from hackers.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>Cybersecurity Roles</h2>
      <ul>
        <li><b>Security Analyst</b></li>
        <li><b>Penetration Tester (Ethical Hacker)</b></li>
        <li><b>SOC Analyst</b></li>
        <li><b>Blue Team / Red Team</b></li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Technologies</h2>
      <p>Wireshark, Metasploit, Nmap</p>
      <p>Firewalls, IDS/IPS</p>
      <p>Linux, Networking basics</p>
    `;
  }

  if (type === "salary") {
    content.innerHTML = `
      <h2>Salary & Compensation</h2>
      <p>Freshers: ₹4–10 LPA</p>
      <p>Mid-level: ₹12–25 LPA</p>
      <p>Senior: ₹30+ LPA</p>
    `;
  }

  if (type === "companies") {
    content.innerHTML = `
      <h2>Top Hiring Companies</h2>
      <p>Google, Amazon, IBM, Deloitte, EY, Security startups</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>
        SOC Analyst → Security Engineer → Security Architect →
        CISO
      </p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
