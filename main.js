
/* ========================================
   PORTFOLIO - MAIN JAVASCRIPT
   Md Miraj Hossan Sajid
======================================== */


/* ========================================
   1. PREMIUM CUSTOM CURSOR
======================================== */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const mouseGlow = document.querySelector(".mouse-glow");

const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (finePointer && cursorDot && cursorOutline) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let outlineX = mouseX;
    let outlineY = mouseY;

    let cursorActive = false;

    window.addEventListener("pointermove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorActive = true;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        if (mouseGlow) {
            mouseGlow.style.left = `${mouseX}px`;
            mouseGlow.style.top = `${mouseY}px`;
        }

        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        if (mouseGlow) {
            mouseGlow.style.opacity = "1";
        }

    });

    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.16;
        outlineY += (mouseY - outlineY) * 0.16;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    // Cursor hover effect
    const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, .spotlight-card"
    );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("hover");
        });

    });


    // Cursor click effect
    document.addEventListener("mousedown", () => {
        cursorOutline.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
        cursorOutline.classList.remove("click");
    });


    // Hide cursor when leaving the window
    document.addEventListener("mouseleave", () => {

        if (!cursorActive) return;

        cursorDot.style.opacity = "0";
        cursorOutline.style.opacity = "0";

        if (mouseGlow) {
            mouseGlow.style.opacity = "0";
        }

    });

    document.addEventListener("mouseenter", () => {

        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";

        if (mouseGlow) {
            mouseGlow.style.opacity = "1";
        }

    });

}


/* ========================================
   2. TYPING ANIMATION
======================================== */

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


/* ========================================
   3. INTERACTIVE SPOTLIGHT CARDS
======================================== */

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


/* ========================================
   4. MOBILE NAVBAR
======================================== */

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


    // Close menu after clicking a navigation link
    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside
    document.addEventListener("click", (e) => {

        const clickedInsideNavbar =
            navLinks.contains(e.target) ||
            menuToggle.contains(e.target);

        if (!clickedInsideNavbar) {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* ========================================
   5. ACTIVE NAVIGATION
======================================== */

let currentPage = window.location.pathname
    .split("/")
    .pop();

if (!currentPage || currentPage === "") {
    currentPage = "index.html";
}

document.querySelectorAll(".nav-link").forEach(link => {

    const linkPage = link.getAttribute("href");

    link.classList.toggle(
        "on",
        linkPage === currentPage
    );

});


/* ========================================
   6. SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(`

    .section-heading,

    .education-card,
    .about-card,

    .leadership-section,
    .leadership-card,

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
        threshold: 0.10,
        rootMargin: "0px 0px -30px 0px"
    });


    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 0.08}s`
        );

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ========================================
   7. CURRENT YEAR
======================================== */

const yearElements = document.querySelectorAll(
    "#year, #currentYear"
);

yearElements.forEach(element => {

    element.textContent = new Date().getFullYear();

});


/* ========================================
   8. REDUCED MOTION SUPPORT
======================================== */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}
