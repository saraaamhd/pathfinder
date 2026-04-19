const modal = document.getElementById("modalOverlay");
const content = document.getElementById("modalContent");

function openModal(type) {
  modal.style.display = "flex";

  if (type === "what") {
    content.innerHTML = `
      <h2>What is Internet of Things (IoT)?</h2>
      <p>
        The Internet of Things connects physical objects like sensors,
        machines, and devices to the internet so they can collect and
        exchange data.
      </p>
      <p>
        Examples include smart homes, wearable devices, smart cities,
        and industrial automation.
      </p>
    `;
  }

  if (type === "roles") {
    content.innerHTML = `
      <h2>IoT Roles</h2>
      <ul>
        <li><b>IoT Developer</b></li>
        <li><b>Embedded Systems Engineer</b></li>
        <li><b>Hardware Engineer</b></li>
        <li><b>IoT Solutions Architect</b></li>
      </ul>
    `;
  }

  if (type === "tools") {
    content.innerHTML = `
      <h2>Tools & Technologies</h2>
      <p>Arduino, Raspberry Pi</p>
      <p>C, C++, Python</p>
      <p>MQTT, HTTP, Sensors & Microcontrollers</p>
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
      <p>Intel, Bosch, Siemens, Qualcomm, product startups</p>
    `;
  }

  if (type === "growth") {
    content.innerHTML = `
      <h2>Career Growth</h2>
      <p>
        IoT Engineer → Senior Engineer → IoT Architect →
        Smart Systems Lead
      </p>
    `;
  }
}

function closeModal() {
  modal.style.display = "none";
}
