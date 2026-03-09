document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("hidden");
    });
  }
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.dataset.theme = savedTheme;
    if (savedTheme === "dark") {
      themeToggle.classList.add("dark");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      themeToggle.setAttribute("aria-pressed", "false");
    }
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // Default to system preference if no saved theme
    body.dataset.theme = "dark";
    themeToggle.classList.add("dark");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    themeToggle.setAttribute("aria-pressed", "false");
  }
  themeToggle.addEventListener("click", () => {
    if (body.dataset.theme === "dark") {
      body.dataset.theme = "light";
      themeToggle.classList.remove("dark");
      themeToggle.setAttribute("aria-pressed", "false");
      localStorage.setItem("theme", "light");
    } else {
      body.dataset.theme = "dark";
      themeToggle.classList.add("dark");
      themeToggle.setAttribute("aria-pressed", "true");
      localStorage.setItem("theme", "dark");
    }
  });
  // Header Scroll Effect
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
  // Carousel Logic
  const carouselSlides = document.getElementById("carousel-slides");
  const carouselPrevBtn = document.getElementById("carousel-prev");
  const carouselNextBtn = document.getElementById("carousel-next");
  const carouselDotsContainer = document.getElementById("carousel-dots");
  const slides = carouselSlides ? carouselSlides.children : [];
  let currentIndex = 0;
  if (carouselSlides && slides.length > 0) {
    function updateCarousel() {
      if (carouselSlides) {
        carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      updateDots();
    }
    function updateDots() {
      if (carouselDotsContainer) {
        carouselDotsContainer.innerHTML = "";
        for (let i = 0; i < slides.length; i++) {
          const dot = document.createElement("span");
          dot.classList.add("dot");
          if (i === currentIndex) {
            dot.classList.add("active");
          }
          dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
          });
          carouselDotsContainer.appendChild(dot);
        }
      }
    }
    carouselPrevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });
    carouselNextBtn.addEventListener("click", () => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });
    updateCarousel(); // Initialize carousel
  }
  // MotionSystem Class for Staggered Animations & Magnetic Effects
  class MotionSystem {
    constructor() {
      this.initStaggeredAnimations();
    }
    initStaggeredAnimations() {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      // Observe only staggered elements for a clean, predictable reveal sequence.
      document.querySelectorAll(".stagger-item").forEach((item) => {
        observer.observe(item);
      });
    }
  }
  new MotionSystem();
});
