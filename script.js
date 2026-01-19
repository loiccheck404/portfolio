// Image Carousel for Projects
function changeSlide(button, direction) {
  const card = button.closest(".project-card");
  const carousel = card.querySelector(".project-carousel");
  const images = carousel.querySelectorAll(".carousel-image");
  let currentIndex = 0;

  // Find current active image
  images.forEach((img, index) => {
    if (img.classList.contains("active")) {
      currentIndex = index;
    }
  });

  // Remove active class from current image
  images[currentIndex].classList.remove("active");

  // Calculate new index
  let newIndex = currentIndex + direction;
  if (newIndex >= images.length) newIndex = 0;
  if (newIndex < 0) newIndex = images.length - 1;

  // Add active class to new image
  images[newIndex].classList.add("active");
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
  document.querySelectorAll(".project-carousel").forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-image");
    let currentIndex = 0;

    images.forEach((img, index) => {
      if (img.classList.contains("active")) {
        currentIndex = index;
      }
    });

    images[currentIndex].classList.remove("active");
    let newIndex = (currentIndex + 1) % images.length;
    images[newIndex].classList.add("active");
  });
}, 5000);

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger menu
  const spans = menuToggle.querySelectorAll("span");
  if (navLinks.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(8px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe project cards
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe skill items
document.querySelectorAll(".skill-item").forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = `all 0.5s ease ${index * 0.05}s`;
  observer.observe(item);
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  if (window.scrollY > 50) {
    if (isDark) {
      navbar.style.background = "rgba(17, 24, 39, 0.98)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
    }
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  } else {
    if (isDark) {
      navbar.style.background = "rgba(17, 24, 39, 0.95)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  }
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

// Update navbar on theme change
function updateNavbar() {
  const navbar = document.querySelector(".navbar");
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    navbar.style.background = "rgba(17, 24, 39, 0.95)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
}

// Initialize navbar
updateNavbar();

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateNavbar();
});
