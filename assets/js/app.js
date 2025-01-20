// Getting DOM elements
const mouseCursor = document.querySelector(".cursor-effect");
const ctaLinks = document.querySelectorAll(".about-content a, .footer-links a, .more-about a");
const projectLinks = document.querySelectorAll(".project-box__link a ion-icon");
const checkbox = document.querySelector("input[name=theme]");
const serviceItems = document.querySelectorAll('.service-item');

// Mouse effect
const trail = document.createElement("div");
trail.classList.add("cursor-trail");
document.body.appendChild(trail);

let trailTimeout;

 window.addEventListener("mousemove", (e) => {
    mouseCursor.style.top = `${e.pageY}px`;
    mouseCursor.style.left = `${e.pageX}px`;

    // Move the trail
    trail.style.top = `${e.pageY}px`;
    trail.style.left = `${e.pageX}px`;
    
    // Show the trail
    trail.style.opacity = 1;

    // Clear previous timeout
    clearTimeout(trailTimeout);
    
    // Hide the trail after a short delay
    trailTimeout = setTimeout(() => {
        trail.style.opacity = 0;
    }, 200);
});

// Function to handle mouse cursor effects on links
const handleMouseOver = (link) => {
    link.addEventListener("mouseover", () => {
        mouseCursor.classList.add("link-grow");
        mouseCursor.style.backgroundColor = "rgba(255, 0, 0, 0.7)"; // Change color on hover
    });
    link.addEventListener("mouseleave", () => {
        mouseCursor.classList.remove("link-grow");
        mouseCursor.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Reset color
    });
};

// Apply mouse effects to CTA and project links
ctaLinks.forEach(handleMouseOver);
projectLinks.forEach(handleMouseOver);

// Click effect
window.addEventListener("click", (e) => {
    const clickEffect = document.createElement("div");
    clickEffect.classList.add("cursor-click");
    document.body.appendChild(clickEffect);
    
    clickEffect.style.top = `${e.pageY}px`;
    clickEffect.style.left = `${e.pageX}px`;

    // Remove the effect after animation
    setTimeout(() => {
        clickEffect.remove();
    }, 600);
});

// GSAP animations
function fadeOut() {
    TweenMax.to(".intro-btn", 1, { opacity: 0, y: -100 });
    TweenMax.to(".text", 1, { y: "-100%" });
    TweenMax.to(".slider", 2, { y: "-100%", delay: 1, ease: Expo.easeInOut });
    TweenMax.to(".slider-2", 2, { y: "-100%", delay: 1.4, ease: Power2.easeInOut });
    TweenMax.to(".intro", 2, { y: "-100%", delay: 2, ease: Power2.easeInOut }, "-=.5");
    TweenMax.to(".content", 2, { y: 0, ease: Power2.easeInOut });
}

// Timeline for animations
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.4 })
  .from(".services-heading h2", { y: 300, opacity: 0, duration: 1 }, "-=1")
  .fromTo(".landing-text h1", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.5 })
  .fromTo(".landing-text h5", { opacity: 0 }, { opacity: 1, duration: 1 })
  .fromTo(".effect-1, .effect-2, .effect-3, .effect-4", { opacity: 0 }, { opacity: 1, duration: 1 })
  .fromTo(".inner", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=1");

// Dark theme toggle
checkbox.addEventListener("change", () => {
    trans();
    document.documentElement.setAttribute("data-theme", checkbox.checked ? "light" : "dark");
});

const trans = () => {
    document.documentElement.classList.add("transition");
    setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1200);
};

// Scroll-triggered animations using a single observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, { threshold: 0.5 });

// Initialize service items for scroll-triggered animations
serviceItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
    observer.observe(item);
});

function toggleDetails(card) {
  const description = card.querySelector('.skill-description');
  if (description.style.display === 'block') {
      description.style.display = 'none'; // Hide the description
  } else {
      description.style.display = 'block'; // Show the description
  }
}