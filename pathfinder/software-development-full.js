const zones = document.querySelectorAll(".zone");
const overlay = document.getElementById("roomOverlay");
const roomBody = document.getElementById("roomBody");
const closeBtn = document.querySelector(".close-btn");

const roomContent = {
  what: `
    <h1>What is Software Development?</h1>
    <p>
      Software development is the process of turning ideas into real digital products
      like apps, websites, games, and systems people use every day.
    </p>
    <p>
      It involves thinking, designing, coding, testing, fixing, and improving software
      continuously.
    </p>
  `,
  tools: `
    <h1>Tools & Technologies</h1>
    <p>
      Developers use programming languages, frameworks, and tools to build software.
    </p>
    <ul>
      <li>HTML, CSS, JavaScript</li>
      <li>Python, Java</li>
      <li>Git & GitHub</li>
    </ul>
  `,
  build: `
    <h1>What Developers Do</h1>
    <p>
      Developers design features, write code, test functionality, fix bugs,
      and release updates.
    </p>
  `,
  growth: `
    <h1>Career Growth</h1>
    <p>
      From beginner to senior roles, developers grow through learning and experience.
    </p>
  `,
  companies: `
    <h1>Where Developers Work</h1>
    <p>
      Developers work in startups, IT companies, product firms, and remotely.
    </p>
  `
};

zones.forEach(zone => {
  zone.addEventListener("click", () => {
    const room = zone.dataset.room;
    roomBody.innerHTML = roomContent[room];
    overlay.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
