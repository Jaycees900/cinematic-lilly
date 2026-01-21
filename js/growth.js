/* =====================================================
   GROWTH.JS
   Controls:
   - multiple lily generation
   - staggered organic growth
   - ambient motion
   - bloom sparkles
===================================================== */

const lilyField = document.getElementById("lily-field");
const STAR_COLORS = [
  "rgba(200,230,255,0.9)",
  "rgba(255,210,240,0.9)",
  "rgba(180,220,255,0.8)"
];

/* ---------- CONFIG ---------- */
const LILY_COUNT = 7;
const GROWTH_SPREAD = 1200; // ms delay difference

/* ---------- CREATE LILY ---------- */
function createLily(index) {
  const lily = document.createElement("div");
  lily.className = "lily";
  lily.style.animationDelay = `${index * 0.4}s`;

  /* Stem */
  const stem = document.createElement("div");
  stem.className = "stem";
  stem.style.animationDelay = `${index * 0.6}s`;

  /* Leaves */
  const leafL = document.createElement("div");
  leafL.className = "leaf left";
  leafL.style.setProperty("--rot", "-28deg");
  leafL.style.animationDelay = `${1.8 + index * 0.4}s`;

  const leafR = document.createElement("div");
  leafR.className = "leaf right";
  leafR.style.setProperty("--rot", "32deg");
  leafR.style.animationDelay = `${2.3 + index * 0.4}s`;

  /* Flower */
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.style.animationDelay = `${4.4 + index * 0.6}s`;

  /* Petals */
  for (let i = 0; i < 6; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    flower.appendChild(petal);
  }

  lily.appendChild(stem);
  lily.appendChild(leafL);
  lily.appendChild(leafR);
  lily.appendChild(flower);

  lilyField.appendChild(lily);

  /* Bloom reaction */
  setTimeout(() => {
    bloomSparkles(lily);
  }, 5200 + index * 600);

  addSway(lily);
}

/* ---------- SPAWN ALL ---------- */
function growLilies() {
  for (let i = 0; i < LILY_COUNT; i++) {
    setTimeout(() => {
      createLily(i);
    }, i * GROWTH_SPREAD);
  }
}

/* ---------- SWAY MOTION ---------- */
function addSway(el) {
  const sway = [
    { transform: "rotate(-0.6deg)" },
    { transform: "rotate(0.6deg)" },
    { transform: "rotate(-0.4deg)" }
  ];

  el.animate(sway, {
    duration: 6000 + Math.random() * 4000,
    easing: "ease-in-out",
    iterations: Infinity
  });
}

/* ---------- BLOOM SPARKLES ---------- */
function bloomSparkles(lily) {
  const rect = lily.getBoundingClientRect();

  for (let i = 0; i < 16; i++) {
    const star = document.createElement("div");
    star.className = "particle";

    star.style.left =
      rect.left + rect.width / 2 + (Math.random() * 80 - 40) + "px";
    star.style.top =
      rect.top + 40 + Math.random() * 40 + "px";

    star.style.background =
      STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

    star.style.setProperty("--float-speed", 4 + Math.random() * 3 + "s");

    document.body.appendChild(star);

    setTimeout(() => star.remove(), 6000);
  }
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  growLilies();
});
      
