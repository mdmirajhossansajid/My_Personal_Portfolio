
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

if (currentPage === "event.html") currentPage = "certificates.html";

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
    if (!reduce && finePointer) addEventListener("pointermove", e => {
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


/* ========================================
   11. DAY / NIGHT THEME TOGGLE
======================================== */
(() => {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    const moon = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    const sun = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    function apply(theme) {
        root.dataset.theme = theme;
        if (meta) meta.content = theme === "light" ? "#f3f6fc" : "#080c18";
        const b = document.querySelector(".theme-toggle");
        if (b) {
            b.setAttribute("aria-label", theme === "light" ? "Switch to night mode" : "Switch to day mode");
            b.title = theme === "light" ? "Night mode" : "Day mode";
        }
        document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    }

    const btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.innerHTML = moon + sun;
    const container = document.querySelector(".nav-container");
    const burger = document.querySelector(".menu-toggle");
    if (container) container.insertBefore(btn, burger || null);

    btn.addEventListener("click", () => {
        const next = root.dataset.theme === "light" ? "dark" : "light";
        try { localStorage.setItem("theme", next); } catch (e) { }
        apply(next);
    });

    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { }
    apply(saved === "light" ? "light" : "dark");
    window.addEventListener("storage", e => { if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) apply(e.newValue); });
})();


/* ========================================
   12. CSE BACKGROUND: graph network + code tokens
======================================== */
(() => {
    const host = document.querySelector(".background-effects");
    if (!host) return;

    const cv = document.createElement("canvas");
    cv.className = "cse-canvas";
    cv.setAttribute("aria-hidden", "true");
    host.prepend(cv);
    const ctx = cv.getContext("2d");

    // touch devices / reduced motion: draw once, no per-frame animation (keeps scrolling smooth)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || !finePointer;
    const TOKENS = ["0", "1", "{ }", "</>", "O(n)", "git", "int", "#include", "for", "0x1F", "&&", "=>",
        "SELECT", "malloc", "BFS", "DFS", "sudo", "TCP", "ls -l", "NULL"];

    let W = 0, H = 0, nodes = [], tokens = [], packets = [], cols = [];
    let mx = -9999, my = -9999, raf = 0;

    const rand = (a, b) => a + Math.random() * (b - a);
    const light = () => document.documentElement.dataset.theme === "light";

    function makeToken(anywhere) {
        return {
            x: rand(0, W),
            y: anywhere ? rand(0, H) : H + 20,
            v: rand(.12, .38),
            s: rand(11, 17),
            t: TOKENS[(Math.random() * TOKENS.length) | 0],
            a: rand(.07, .17)
        };
    }

    function resize() {
        // mobile address bar show/hide fires resize: ignore small height-only changes
        if (W && W === window.innerWidth && Math.abs(H - window.innerHeight) < 160) return;
        const dpr = Math.min(window.devicePixelRatio || 1, finePointer ? 1.5 : 1);
        W = window.innerWidth;
        H = window.innerHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const n = Math.min(finePointer ? 70 : 32, Math.round(W * H / 20000));
        nodes = Array.from({ length: n }, () => ({
            x: rand(0, W), y: rand(0, H),
            vx: rand(-.22, .22), vy: rand(-.22, .22), r: rand(1, 2.2)
        }));
        const t = Math.min(26, Math.round(W * H / 50000));
        tokens = Array.from({ length: t }, () => makeToken(true));
        packets = [];
        cols = [];
        if (W > 700) {   // binary rain along both screen edges
            const zone = W * 0.11;
            for (let x = 8; x < W; x += 24) {
                if (x < zone || x > W - zone) cols.push({
                    x, y: rand(-H, H), v: rand(.7, 1.7), len: rand(7, 16),
                    s: Array.from({ length: 18 }, () => (Math.random() < .5 ? "0" : "1"))
                });
            }
        }
        draw(false);
    }

    function draw(animate) {
        ctx.clearRect(0, 0, W, H);
        const L = light();
        const lineRGB = L ? "37,99,235" : "96,165,250";
        const nodeRGB = L ? "29,78,216" : "147,197,253";
        const LINK = 130, MOUSE = 170;

        // code tokens drifting upward
        ctx.textBaseline = "middle";
        for (const k of tokens) {
            if (animate) {
                k.y -= k.v;
                if (k.y < -20) Object.assign(k, makeToken(false));
            }
            ctx.font = `${k.s}px "JetBrains Mono", monospace`;
            ctx.fillStyle = `rgba(${lineRGB},${L ? k.a * .8 : k.a})`;
            ctx.fillText(k.t, k.x, k.y);
        }

        // binary rain (edges)
        if (cols.length) {
            ctx.font = '13px "JetBrains Mono", monospace';
            for (const c of cols) {
                if (animate) {
                    c.y += c.v;
                    if (Math.random() < .04) c.s[(Math.random() * c.s.length) | 0] = Math.random() < .5 ? "0" : "1";
                    if (c.y - c.len * 16 > H) { c.y = rand(-200, 0); c.v = rand(.7, 1.7); }
                }
                for (let i = 0; i < c.len; i++) {
                    const a = (1 - i / c.len) * (L ? .26 : .22);
                    ctx.fillStyle = `rgba(${i === 0 ? nodeRGB : lineRGB},${i === 0 ? a * 1.8 : a})`;
                    ctx.fillText(c.s[i % c.s.length], c.x, c.y - i * 16);
                }
            }
        }

        // move nodes
        if (animate) {
            for (const p of nodes) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
                if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
                const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
                if (d < 110 && d > 0) { p.x += dx / d * .6; p.y += dy / d * .6; }
            }
        }

        // edges between close nodes
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < LINK) {
                    if (animate && packets.length < 16 && Math.random() < .0016) packets.push({ a, b, t: 0, s: rand(.012, .03) });
                    ctx.strokeStyle = `rgba(${lineRGB},${(1 - d / LINK) * (L ? .3 : .22)})`;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                }
            }
            // link to the mouse
            const dm = Math.hypot(a.x - mx, a.y - my);
            if (dm < MOUSE) {
                ctx.strokeStyle = `rgba(${lineRGB},${(1 - dm / MOUSE) * .55})`;
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
            }
        }

        // nodes
        ctx.fillStyle = `rgba(${nodeRGB},${L ? .55 : .6})`;
        for (const p of nodes) {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        }

        // data packets travelling along the graph edges
        if (packets.length) {
            const PRGB = L ? "124,58,237" : "196,181,253";
            for (let i = packets.length - 1; i >= 0; i--) {
                const k = packets[i];
                if (animate) k.t += k.s;
                const dist = Math.hypot(k.a.x - k.b.x, k.a.y - k.b.y);
                if (k.t >= 1 || dist > LINK * 1.15) { packets.splice(i, 1); continue; }
                const x = k.a.x + (k.b.x - k.a.x) * k.t, y = k.a.y + (k.b.y - k.a.y) * k.t;
                const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
                g.addColorStop(0, `rgba(${PRGB},.9)`);
                g.addColorStop(1, `rgba(${PRGB},0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(x, y, 9, 0, 6.2832); ctx.fill();
            }
        }
    }

    function loop() {
        draw(true);
        raf = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener("mouseleave", () => { mx = my = -9999; });

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    document.addEventListener("themechange", () => { if (reduce) draw(false); });

    resize();
    if (!reduce) {
        loop();
        document.addEventListener("visibilitychange", () => {
            cancelAnimationFrame(raf);
            if (!document.hidden) loop();
        });
    }
})();


/* ========================================
   13. CERTIFICATE IMAGES + LIGHTBOX
======================================== */
(() => {
    const imgs = document.querySelectorAll("img[data-img]");
    if (!imgs.length) return;
    const exts = ["jpg", "jpeg", "png", "webp"];

    imgs.forEach(img => {
        let i = 0;
        img.addEventListener("load", () => img.classList.add("loaded"));
        const next = () => {
            if (i >= exts.length) {
                const fig = img.closest(".certificate-thumb");
                if (fig) fig.classList.add("empty");
                return;
            }
            img.src = `${img.dataset.img}.${exts[i++]}`;
        };
        img.addEventListener("error", next);
        next();
    });

    function openBox(src, alt) {
        const box = document.createElement("div");
        box.className = "lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-label", alt);
        box.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img alt="">';
        box.querySelector("img").src = src;
        box.querySelector("img").alt = alt;
        const close = () => {
            box.remove();
            document.body.classList.remove("modal-open");
            document.removeEventListener("keydown", onKey);
        };
        const onKey = e => { if (e.key === "Escape") close(); };
        box.addEventListener("click", e => { if (e.target !== box.querySelector("img")) close(); });
        document.addEventListener("keydown", onKey);
        document.body.classList.add("modal-open");
        document.body.appendChild(box);
        box.querySelector(".lightbox-close").focus();
    }

    // 3D tilt + moving shine on certificate images
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !calm) {
        document.querySelectorAll(".certificate-thumb").forEach(fig => {
            fig.addEventListener("pointermove", e => {
                const r = fig.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
                fig.style.setProperty("--ry", `${((x - .5) * 12).toFixed(2)}deg`);
                fig.style.setProperty("--rx", `${((.5 - y) * 10).toFixed(2)}deg`);
                fig.style.setProperty("--sx", `${(x * 100).toFixed(1)}%`);
                fig.style.setProperty("--sy", `${(y * 100).toFixed(1)}%`);
            });
            fig.addEventListener("pointerleave", () => {
                fig.style.setProperty("--rx", "0deg");
                fig.style.setProperty("--ry", "0deg");
            });
        });
    }

    document.querySelectorAll(".certificate-thumb").forEach(fig => {
        fig.addEventListener("click", () => {
            const img = fig.querySelector("img");
            if (img && img.currentSrc) openBox(img.currentSrc, img.alt);
        });
    });
})();


/* ========================================
   14. NOTES PAGE: search + PDF viewer + download with name/email
======================================== */
(() => {
    const grid = document.getElementById("notesGrid");
    if (!grid) return;

    // Same Web3Forms key as the contact form: every download request lands in your inbox.
    const WEB3FORMS_KEY = "70850bf5-e1ce-4a41-8c74-2613807df88d";

    const cards = [...grid.querySelectorAll(".note-card")];
    const input = document.getElementById("notesSearch");
    const count = document.getElementById("notesCount");
    const empty = document.getElementById("notesEmpty");

    const driveId = href => { const m = (href || "").match(/\/file\/d\/([^/?#]+)/); return m ? m[1] : null; };
    const isDummy = href => !/^https?:/i.test(href || "") || /DUMMY|PASTE/i.test(href);

    // cards without a real link yet
    cards.forEach(c => {
        if (isDummy(c.dataset.drive)) {
            c.classList.add("pending");
            c.querySelectorAll(".note-btn").forEach(b => { b.disabled = true; });
            const r = c.querySelector(".note-read");
            if (r) r.innerHTML = "Link coming soon";
        }
    });

    function update() {
        const q = (input.value || "").trim().toLowerCase();
        let shown = 0;
        cards.forEach(c => {
            const hit = !q || c.textContent.toLowerCase().includes(q);
            c.style.display = hit ? "" : "none";
            if (hit) shown++;
        });
        count.textContent = `${shown} of ${cards.length} notes`;
        empty.hidden = shown !== 0;
    }
    input.addEventListener("input", update);
    update();

    function lockScroll(on) { document.body.classList.toggle("modal-open", on); }

    /* ---- read online ---- */
    function openViewer(title, href, id) {
        const v = document.createElement("div");
        v.className = "viewer";
        v.setAttribute("role", "dialog");
        v.setAttribute("aria-label", title);
        v.innerHTML = `
            <div class="viewer-box">
                <div class="viewer-bar">
                    <strong></strong>
                    <span style="display:flex;align-items:center;gap:16px">
                        <a target="_blank" rel="noopener noreferrer">Open in Drive ↗</a>
                        <button class="viewer-close" aria-label="Close">✕</button>
                    </span>
                </div>
                <iframe title="" allow="autoplay"></iframe>
            </div>`;
        v.querySelector("strong").textContent = title;
        v.querySelector("a").href = href;
        const f = v.querySelector("iframe");
        f.title = title;
        f.src = `https://drive.google.com/file/d/${id}/preview`;
        const close = () => { v.remove(); lockScroll(false); document.removeEventListener("keydown", onKey); };
        const onKey = e => { if (e.key === "Escape") close(); };
        v.addEventListener("click", e => { if (e.target === v) close(); });
        v.querySelector(".viewer-close").addEventListener("click", close);
        document.addEventListener("keydown", onKey);
        lockScroll(true);
        document.body.appendChild(v);
    }

    /* ---- download: ask name + email first ---- */
    function startDownload(href, id, file) {
        if (id) {
            const a = document.createElement("a");
            a.href = `https://drive.google.com/uc?export=download&id=${id}`;
            a.download = file;
            a.rel = "noopener";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            window.open(href, "_blank", "noopener");
        }
    }

    function openDownloadForm(card) {
        const file = card.dataset.file || "notes.pdf";
        const title = card.querySelector("h3").textContent;
        const href = card.dataset.drive;
        const id = driveId(href);
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem("notesUser") || "{}"); } catch (e) { }

        const m = document.createElement("div");
        m.className = "dl-modal";
        m.setAttribute("role", "dialog");
        m.setAttribute("aria-modal", "true");
        m.setAttribute("aria-label", "Download " + file);
        m.innerHTML = `
            <form class="dl-box" novalidate>
                <button type="button" class="lightbox-close dl-close" aria-label="Close">✕</button>
                <span class="dl-file"></span>
                <h3>Before you download</h3>
                <p>Tell me who is using these notes. It takes five seconds.</p>
                <label>Your name
                    <input type="text" name="name" required autocomplete="name" placeholder="Your name">
                </label>
                <label>Your Gmail
                    <input type="email" name="email" required autocomplete="email" placeholder="you@gmail.com">
                </label>
                <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
                <button class="btn btn-primary dl-submit" type="submit">Download PDF <span>↓</span></button>
                <p class="form-status dl-status" role="status" aria-live="polite"></p>
            </form>`;
        m.querySelector(".dl-file").textContent = file;
        const form = m.querySelector("form");
        form.name.value = saved.name || "";
        form.email.value = saved.email || "";
        const status = m.querySelector(".dl-status");
        const submit = m.querySelector(".dl-submit");
        const say = (t, c = "") => { status.textContent = t; status.className = "form-status dl-status " + c; };

        const close = () => { m.remove(); lockScroll(false); document.removeEventListener("keydown", onKey); };
        const onKey = e => { if (e.key === "Escape") close(); };
        m.addEventListener("click", e => { if (e.target === m) close(); });
        m.querySelector(".dl-close").addEventListener("click", close);
        document.addEventListener("keydown", onKey);

        form.addEventListener("submit", async e => {
            e.preventDefault();
            const d = Object.fromEntries(new FormData(form));
            if (d.botcheck) return;
            const name = d.name.trim(), email = d.email.trim();
            if (!name || !/^\S+@\S+\.\S+$/.test(email)) return say("Please enter your name and a valid email.", "err");
            try { localStorage.setItem("notesUser", JSON.stringify({ name, email })); } catch (e2) { }

            submit.disabled = true;
            say("Preparing your download...");
            let logged = true;
            try {
                const r = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_KEY,
                        subject: `Notes download: ${file}`,
                        from_name: "Portfolio Notes Download",
                        name, email,
                        message: `${name} (${email}) downloaded ${file} (${title}).`
                    })
                });
                logged = (await r.json()).success;
            } catch (err) { logged = false; }

            startDownload(href, id, file);   // never block the student if logging fails
            say(logged ? "Thanks! Your download has started." : "Download started.", "ok");
            setTimeout(close, 1400);
        });

        lockScroll(true);
        document.body.appendChild(m);
        (form.name.value ? form.email : form.name).focus();
    }

    cards.forEach(c => {
        c.querySelector(".note-read").addEventListener("click", () => {
            if (c.classList.contains("pending")) return;
            const href = c.dataset.drive, id = driveId(href);
            const title = c.dataset.file || c.querySelector("h3").textContent;
            if (id) openViewer(title, href, id); else window.open(href, "_blank", "noopener");
        });
        c.querySelector(".note-dl").addEventListener("click", () => {
            if (!c.classList.contains("pending")) openDownloadForm(c);
        });
    });
})();


/* ========================================
   16. EVENT DETAILS PAGE (event.html?e=cert-01)
   Text lives in event.html (<template id="cert-01">), photos in images/events/cert-01/ (1.jpg, 2.jpg ...)
======================================== */
(() => {
    const page = document.getElementById("eventPage");
    if (!page) return;

    const exts = ["jpg", "jpeg", "png", "webp"];
    const MAX = 20;
    const $ = id => document.getElementById(id);

    function probe(base, name) {
        return new Promise(resolve => {
            let e = 0;
            const img = new Image();
            img.onload = () => resolve(img.src);
            img.onerror = () => { if (e < exts.length) img.src = `${base}/${name}.${exts[e++]}`; else resolve(null); };
            img.onerror();
        });
    }

    function lightbox(src, alt) {
        const box = document.createElement("div");
        box.className = "lightbox";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-label", alt);
        box.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img alt="">';
        box.querySelector("img").src = src;
        box.querySelector("img").alt = alt;
        const close = () => { box.remove(); document.body.classList.remove("modal-open"); document.removeEventListener("keydown", onKey); };
        const onKey = e => { if (e.key === "Escape") close(); };
        box.addEventListener("click", e => { if (e.target !== box.querySelector("img")) close(); });
        document.addEventListener("keydown", onKey);
        document.body.classList.add("modal-open");
        document.body.appendChild(box);
        box.querySelector(".lightbox-close").focus();
    }

    const all = [...document.querySelectorAll("template.event-data")];
    const id = (new URLSearchParams(location.search).get("e") || "").trim();
    const idx = all.findIndex(t => t.id === id);

    if (idx < 0) {
        $("evTitle").textContent = "Event not found";
        $("evKicker").textContent = "// 404";
        $("evMissing").hidden = false;
        $("evNav").innerHTML = '<a class="event-nav-link" href="certificates.html">← All certificates</a>';
        return;
    }

    const tpl = all[idx];
    const title = tpl.dataset.title;
    document.title = `${title} | Md Miraj Hossan Sajid`;
    $("evTitle").textContent = title;
    $("evKicker").textContent = `// EVENT ${String(idx + 1).padStart(2, "0")} / ${String(all.length).padStart(2, "0")}`;

    // meta chips + certificate link
    const meta = $("evMeta");
    [tpl.dataset.type, tpl.dataset.issuer].forEach(t => {
        if (!t) return;
        const s = document.createElement("span");
        s.textContent = t;
        meta.appendChild(s);
    });
    if (/^https?:/i.test(tpl.dataset.link || "")) {
        const a = document.createElement("a");
        a.href = tpl.dataset.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "View Certificate ↗";
        meta.appendChild(a);
    }

    // story
    $("evStory").appendChild(tpl.content.cloneNode(true));

    // certificate image
    probe("images/certificates", id).then(src => {
        if (!src) return;
        const fig = $("evCert");
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Certificate: ${title}`;
        img.addEventListener("click", () => lightbox(src, img.alt));
        fig.appendChild(img);
        fig.hidden = false;
    });

    // event photos: load 1, 2, 3 ... until one is missing (avoids dozens of failed requests)
    (async () => {
        const grid = $("evPhotos");
        for (let i = 1; i <= MAX; i++) {
            const src = await probe(`images/events/${id}`, i);
            if (!src) break;
            const fig = document.createElement("figure");
            const img = document.createElement("img");
            img.src = src;
            img.alt = `${title} picture ${i}`;
            img.loading = "lazy";
            img.addEventListener("click", () => lightbox(src, img.alt));
            fig.appendChild(img);
            grid.appendChild(fig);
            $("evPhotosWrap").hidden = false;
        }
    })();

    // previous / next event
    const nav = $("evNav");
    const mk = (t, dir) => {
        const a = document.createElement("a");
        a.className = "event-nav-link " + dir;
        a.href = `event.html?e=${t.id}`;
        a.innerHTML = dir === "prev" ? "<small>← Previous</small>" : "<small>Next →</small>";
        const b = document.createElement("strong");
        b.textContent = t.dataset.title;
        a.appendChild(b);
        return a;
    };
    if (idx > 0) nav.appendChild(mk(all[idx - 1], "prev"));
    if (idx < all.length - 1) nav.appendChild(mk(all[idx + 1], "next"));
})();
