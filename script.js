let lastScrollY = window.scrollY;
const header = document.querySelector("header");
let isHidden = false;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 30 && !isHidden) {
    // Small scroll down, hide header
    header.style.opacity = "0";
    header.style.transform = "translateY(-100%)";
    header.style.pointerEvents = "none";
    isHidden = true;
  } else if (currentScrollY < lastScrollY && isHidden) {
    // Scroll up, show header
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
    header.style.pointerEvents = "auto";
    isHidden = false;
  }

  lastScrollY = currentScrollY;
});

function toggleMenu() {
  const navLinks = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");

  navLinks.classList.toggle("active");

  // Swap icon between ☰ and ✕
  if (hamburger.textContent === "☰") {
    hamburger.textContent = "✕";
  } else {
    hamburger.textContent = "☰";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ease = "power4.inOut";

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const href = link.getAttribute("href");

      if (href && !href.startsWith("#") && href !== window.location.pathname) {
        animateTransition().then(() => {
          window.location.href = href;
        });
      }
    });
  });

  revealTransition().then(() => {
    gsap.set(".block", {visibility: "hidden"});
  })

  function revealTransition() {
    return new Promise((resolve) => {
      gsap.set(".block", {scaleY: 1});
      gsap.to(".block", {
        scaleY: 0,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "start",
          grid: "auto",
          axis: "x",
        },
        ease: ease,
        onComplete: resolve,
      })
    });
  }

  function animateTransition() {
    return new Promise((resolve) => {
      gsap.set(".block", {visibility: "visible", scaleY: 0});
      gsap.to(".block", {
        scaleY: 1,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "start",
          grid: [2, 5],
          axis: "x",
        },
        ease: ease,
        onComplete: resolve,
      })
    });
  }
});