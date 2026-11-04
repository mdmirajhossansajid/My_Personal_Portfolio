
// ========================================
// 1. MOUSE FOLLOWING EFFECT
// ========================================

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const mouseGlow = document.querySelector(".mouse-glow");

const finePointer = window.matchMedia("(pointer: fine)").matches;

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

if (finePointer) {
    window.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        document.body.style.setProperty("--mx", `${mouseX}px`);
        document.body.style.setProperty("--my", `${mouseY}px`);

        if (cursorDot) {
            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        if (mouseGlow) {
            mouseGlow.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        if (cursorOutline) {
            cursorOutline.style.transform =
                `translate3d(${outlineX}px, ${outlineY}px, 0)`;
        }

        requestAnimationFrame(animateCursor);
    }

    if (cursorOutline) {
        animateCursor();
    }
}


// ========================================
// 2. TYPING ANIMATION
// ========================================

const typingElement =
    document.querySelector("#typingText") ||
    document.querySelector(".role");

if (typingElement) {
    const roles = [
        "Front-End Developer",
        "ML Enthusiast",
        "Web Developer",
        "C++ Problem Solver",
        "Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        typingElement.textContent =
            currentRole.substring(0, charIndex);

        if (!deleting) {
            charIndex++;

            if (charIndex > currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1300);
                return;
            }
        } else {
            charIndex--;

            if (charIndex < 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                charIndex = 0;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 85);
    }

    typeEffect();
}


// ========================================
// 3. INTERACTIVE SPOTLIGHT CARDS
// ========================================

const spotlightCards =
    document.querySelectorAll(".spotlight-card");

if (finePointer) {
    spotlightCards.forEach(card => {
        card.addEventListener("pointermove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--spot-x", `${x}px`);
            card.style.setProperty("--spot-y", `${y}px`);
        });
    });
}


// ========================================
// 4. MOBILE NAVBAR
// ========================================

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

        const isExpanded =
            menuToggle.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isExpanded)
        );
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ========================================
// 5. ACTIVE NAVIGATION
// ========================================

let currentPage = window.location.pathname
    .split("/")
    .pop();

if (!currentPage) {
    currentPage = "index.html";
}

document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");

    link.classList.toggle(
        "on",
        linkPage === currentPage
    );
});


// ========================================
// 6. SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(`
    .section-heading,
    .education-card,
    .about-card,
    .skill-card,
    .research-card,
    .project-preview-card,
    .contact-box,
    .projects-hero,
    .page-intro,
    .project-card,
    .competitive-card,
    .github-more,
    .projects-cta,
    .certificate-card,
    .certificate-cta,
    .contact-intro,
    .contact-card,
    .contact-note
`);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.10
    });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// ========================================
// 7. CURRENT YEAR
// ========================================

const yearElements = document.querySelectorAll(
    "#year, #currentYear"
);

yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});
