// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scrolling for navigation links
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
    // Close mobile menu if open
    navLinks.classList.remove("active");
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Animated counter for stats
function animateCounter(element, target) {
  let count = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(count);
    }
  }, 20);
}

// Stats counter animation
const statsSection = document.querySelector(".stats");
let statsAnimated = false;

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounter(document.getElementById("propertiesSold"), 1250);
        animateCounter(document.getElementById("happyClients"), 850);
        animateCounter(document.getElementById("yearsExperience"), 15);
        animateCounter(document.getElementById("awards"), 20);
      }
    });
  }, observerOptions);
  statsObserver.observe(statsSection);
}

// Contact form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Simple form validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Add click handlers for property cards
document.querySelectorAll(".property-card").forEach((card) => {
  card.addEventListener("click", function () {
    const title = this.querySelector(".property-title").textContent;
    const price = this.querySelector(".property-price").textContent;
    const location = this.querySelector(".property-location span").textContent;

    alert(
      `Property Details: \n\nTitle: ${title}\nPrice: ${price}\nLocation: ${location}\n\nContact us for more information!`
    );
  });
});

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  // Add entrance animations with staggered delays
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((el, index) => {
    // Only stagger the first few to avoid long delays on mobile
    if (index < 6) {
      el.style.animationDelay = `${index * 0.1}s`;
    }
  });

  console.log("Elite Homes website initialized successfully!");
});
