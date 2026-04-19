const cube = document.querySelector(".cube");
const buttons = document.querySelectorAll(".cube-controls button");

/*
Button order (VERY IMPORTANT – matches HTML order):
0 → What is this?
1 → Core Areas
2 → Skills
3 → Who is this for?
4 → Back to Domains
*/

buttons[0].addEventListener("click", () => {
  // LEFT FACE
  cube.style.transform = "rotateY(90deg)";
});

buttons[1].addEventListener("click", () => {
  // TOP FACE
  cube.style.transform = "rotateX(-90deg)";
});

buttons[2].addEventListener("click", () => {
  // RIGHT FACE
  cube.style.transform = "rotateY(-90deg)";
});

buttons[3].addEventListener("click", () => {
  // BOTTOM FACE
  cube.style.transform = "rotateX(90deg)";
});

buttons[4].addEventListener("click", () => {
  // BACK TO CAREER DOMAINS
  window.location.href = "career-domains.html";
});
