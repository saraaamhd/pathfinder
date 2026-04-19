const cards = document.querySelectorAll(".card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.querySelector(".carousel-dots");

let activeIndex = 0; // start with software developer in center (adjust if needed)
cards.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");

  dot.addEventListener("click", () => {
    activeIndex = index;
    updateCarousel();
    updateDots();
  });

  dotsContainer.appendChild(dot);
});

/* Apply positions based on activeIndex */
function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove(
      "active",
      "left",
      "right",
      "far-left",
      "far-right",
      "back"
    );

    let diff = index - activeIndex;

    // circular correction
    if (diff > cards.length / 2) diff -= cards.length;
    if (diff < -cards.length / 2) diff += cards.length;

    if (diff === 0) {
      card.classList.add("active");
    } else if (diff === -1) {
      card.classList.add("left");
    } else if (diff === 1) {
      card.classList.add("right");
    } else if (diff === -2) {
      card.classList.add("far-left");
    } else if (diff === 2) {
      card.classList.add("far-right");
    } else if (Math.abs(diff) === 3) {
      // ONLY ONE deepest card
      card.classList.add("back");
    }
    // IMPORTANT: no else case
  });
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}


/* Arrow navigation */
prevBtn.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % cards.length;
  updateCarousel();
});

/* Card click behavior */
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index === activeIndex) {
      // Open domain page
      const link = card.getAttribute("data-link");
      window.location.href = link;
    } else {
      // Bring clicked card to center
      activeIndex = index;
      updateCarousel();
    }
  });
});

/* Initial load */
updateCarousel();
