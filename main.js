
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
        "Cybersecurity Enthusiast"
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
    .contact-note,
    .contact-form,
    .reveal

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


/* ========================================
   9. ENHANCEMENTS (v2)
======================================== */
(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // scroll progress bar + navbar state + back-to-top
    const bar = Object.assign(document.createElement("div"), { className: "scroll-progress" });
    const top = Object.assign(document.createElement("button"), { className: "to-top", textContent: "↑", ariaLabel: "Back to top" });
    document.body.append(bar, top);
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    const nav = document.querySelector(".navbar");
    let ticking = false;
    function onScroll() {
        const max = root.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        nav && nav.classList.toggle("scrolled", window.scrollY > 30);
        top.classList.toggle("show", window.scrollY > 600);
        ticking = false;
    }
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    // background orbs follow the mouse a little
    if (!reduce) addEventListener("pointermove", e => {
        root.style.setProperty("--px", (e.clientX / innerWidth - 0.5).toFixed(3));
        root.style.setProperty("--py", (e.clientY / innerHeight - 0.5).toFixed(3));
    }, { passive: true });

    // magnetic buttons
    if (finePointer && !reduce) {
        document.querySelectorAll(".btn, .nav-contact, .project-button").forEach(b => {
            b.addEventListener("pointermove", e => {
                const r = b.getBoundingClientRect();
                b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.25}px`;
            });
            b.addEventListener("pointerleave", () => { b.style.translate = ""; });
        });
    }

    // count-up numbers (projects + certificates pages)
    const counters = document.querySelectorAll(".project-stats h3, .count-number");
    if (counters.length && "IntersectionObserver" in window && !reduce) {
        const io = new IntersectionObserver(es => es.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target, m = el.textContent.trim().match(/^(\d+)(.*)$/);
            io.unobserve(el);
            if (!m) return;
            const end = +m[1], len = m[1].length, t0 = performance.now();
            (function step(t) {
                const p = Math.min((t - t0) / 1100, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
                el.textContent = String(v).padStart(len, "0") + m[2];
                if (p < 1) requestAnimationFrame(step);
            })(t0);
        }), { threshold: 0.6 });
        counters.forEach(c => io.observe(c));
    }

    // smooth page transitions between internal pages
    document.addEventListener("click", e => {
        const a = e.target.closest("a[href]");
        if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
        const u = new URL(a.href, location.href);
        if (!/^(https?|file):$/.test(u.protocol)) return;
        if (u.origin !== location.origin || u.pathname === location.pathname) return;
        e.preventDefault();
        document.body.classList.add("leaving");
        setTimeout(() => { location.href = a.href; }, 220);
    });
    addEventListener("pageshow", () => document.body.classList.remove("leaving"));
})();


/* ========================================
   10. GMAIL "LET'S TALK" + CONTACT FORM
======================================== */
(() => {
    // 1) Paste your free Web3Forms access key here (see instructions). Until then the form opens your email app.
    const WEB3FORMS_KEY = "70850bf5-e1ce-4a41-8c74-2613807df88d";
    const enc = encodeURIComponent;

    function openMail(to, subject, body) {
        if (finePointer) {   // desktop: Gmail compose in a new tab
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`, "_blank", "noopener");
        } else {             // phone/tablet: default mail app
            location.href = `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
        }
    }

    // every mailto link (Let's Talk, email cards, buttons) opens Gmail on desktop
    document.addEventListener("click", e => {
        const a = e.target.closest('a[href^="mailto:"]');
        if (!a || !finePointer) return;
        e.preventDefault();
        const u = new URL(a.href);
        openMail(decodeURIComponent(u.pathname), u.searchParams.get("subject") || "", u.searchParams.get("body") || "");
    });

    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("formStatus");
    const btn = form.querySelector("button[type=submit]");
    const say = (t, c = "") => { status.textContent = t; status.className = "form-status " + c; };

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(form));
        if (d.botcheck) return;
        const name = d.name.trim(), email = d.email.trim(), msg = d.message.trim();
        if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) return say("Please add your name, a valid email and a message.", "err");
        const subject = d.subject.trim() || `Portfolio message from ${name}`;

        if (WEB3FORMS_KEY === "YOUR_ACCESS_KEY") { // (only used if the key is removed)
            openMail("mdmirajhossansajidpc@gmail.com", subject, `${msg}\n\n- ${name} (${email})`);
            return say("Opening your email app...");
        }
        btn.disabled = true; say("Sending...");
        try {
            const r = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ access_key: WEB3FORMS_KEY, name, email, subject, message: msg, from_name: "Portfolio Website" })
            });
            if (!(await r.json()).success) throw new Error("failed");
            form.reset(); say("Thank you! Your message has been sent.", "ok");
        } catch { say("Could not send. Please email me directly instead.", "err"); }
        finally { btn.disabled = false; }
    });
})();
