const revealItems = document.querySelectorAll(".reveal");
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero-full");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  observer.observe(item);
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const updateHeaderState = () => {
  if (!header || !hero) return;
  const heroHeight = hero.offsetHeight;
  if (heroHeight === 0) {
    header.classList.remove("scrolled");
    return;
  }
  const threshold = Math.max(0, heroHeight - header.offsetHeight - 40);
  if (window.scrollY > threshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", updateHeaderState);
window.addEventListener("resize", updateHeaderState);
updateHeaderState();
