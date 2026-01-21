/* =====================================================
   STARS.JS
   Procedural star generation with depth
===================================================== */

const starField = document.getElementById("star-field");

const STAR_COUNT = 180;

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  const sizeRand = Math.random();
  if (sizeRand < 0.6) star.classList.add("small");
  else if (sizeRand < 0.9) star.classList.add("medium");
  else star.classList.add("large");

  const layerRand = Math.random();
  if (layerRand < 0.4) star.classList.add("layer1");
  else if (layerRand < 0.75) star.classList.add("layer2");
  else star.classList.add("layer3");

  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";

  star.style.setProperty("--twinkle-speed",
    2 + Math.random() * 5 + "s");

  starField.appendChild(star);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < STAR_COUNT; i++) {
    createStar();
  }
});
