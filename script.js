const cards = [...document.querySelectorAll(".card")];
const buttons = [...document.querySelectorAll(".filter")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const counter = document.getElementById("counter");

let visibleCards = cards;
let currentIndex = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;
    visibleCards = category === "all"
      ? cards
      : cards.filter(card => card.classList.contains(category));

    cards.forEach(card => {
      card.classList.toggle("hidden", !visibleCards.includes(card));
    });
  });
});

function openLightbox(card) {
  currentIndex = visibleCards.indexOf(card);
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const card = visibleCards[currentIndex];
  const img = card.querySelector("img");

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = card.querySelector("h3").textContent;
  counter.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(visibleCards.length).padStart(2, "0")}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveImage(step) {
  currentIndex = (currentIndex + step + visibleCards.length) % visibleCards.length;
  updateLightbox();
}

cards.forEach(card => {
  card.addEventListener("click", () => openLightbox(card));
});

document.querySelector(".close").addEventListener("click", closeLightbox);
document.querySelector(".prev").addEventListener("click", () => moveImage(-1));
document.querySelector(".next").addEventListener("click", () => moveImage(1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveImage(-1);
  if (event.key === "ArrowRight") moveImage(1);
});
