(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.querySelector(".site-loader");
  const loaderLine = document.querySelector(".loader-line span");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const body = document.body;

  document.getElementById("year").textContent = new Date().getFullYear();

  function closeMenu() {
    menuToggle?.classList.remove("active");
    mobileMenu?.classList.remove("open");
    mobileMenu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("open");
    menuToggle.classList.toggle("active", open);
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    menuToggle.setAttribute("aria-expanded", String(open));
    body.classList.toggle("menu-open", open);
  });

  mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  if (reduceMotion || typeof gsap === "undefined") {
    loader?.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({
    onComplete: () => loader?.remove()
  });

  intro.to(loaderLine, { scaleX: 1, duration: 1.1, ease: "power3.inOut" })
    .to(".site-loader", { yPercent: -100, duration: .9, ease: "power4.inOut" }, "+=.15")
    .from(".hero-meta > *, .hero-kicker", { y: 20, opacity: 0, duration: .6, stagger: .08, ease: "power3.out" }, "-=.25")
    .from(".hero-title span", { yPercent: 110, opacity: 0, duration: 1, stagger: .1, ease: "power4.out" }, "-=.45")
    .from(".hero-intro, .circle-link", { y: 25, opacity: 0, duration: .7, stagger: .12, ease: "power3.out" }, "-=.5");

  gsap.to(".marquee-track", {
    xPercent: -25,
    ease: "none",
    scrollTrigger: { trigger: ".hero-marquee", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  gsap.utils.toArray(".section-label").forEach(label => {
    gsap.from(label.children, {
      y: 14, opacity: 0, duration: .6, stagger: .08, ease: "power3.out",
      scrollTrigger: { trigger: label, start: "top 88%" }
    });
  });

  gsap.utils.toArray(".statement h2, .materials-intro h2, .section-heading h2, .process-intro h2, .experience-top h2, .contact-heading h2").forEach(el => {
    gsap.from(el, {
      y: 55, opacity: 0, duration: .9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%" }
    });
  });

  gsap.utils.toArray(".about-copy > *, .materials-intro p").forEach(el => {
    gsap.from(el, {
      y: 25, opacity: 0, duration: .7, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  gsap.utils.toArray(".expertise-row").forEach((row, i) => {
    gsap.from(row, {
      y: 30, opacity: 0, duration: .7, delay: i * .04, ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 90%" }
    });
  });

  gsap.utils.toArray(".material-card").forEach((card, i) => {
    gsap.from(card, {
      y: 35, opacity: 0, duration: .7, delay: i * .05, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 88%" }
    });
  });

  gsap.utils.toArray(".work-card").forEach((card, i) => {
    gsap.from(card, {
      y: 45, opacity: 0, duration: .8, delay: i * .07, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 87%" }
    });
  });

  gsap.utils.toArray(".work-visual").forEach(visual => {
    gsap.to(visual, {
      backgroundPosition: "50% 65%",
      ease: "none",
      scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  gsap.utils.toArray(".process-grid > div, .timeline-item, .partners-grid > div").forEach((item, i) => {
    gsap.from(item, {
      y: 30, opacity: 0, duration: .7, delay: (i % 4) * .06, ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 88%" }
    });
  });

  // Subtle custom cursor on pointer devices.
  const cursor = document.querySelector(".cursor");
  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    const xTo = gsap.quickTo(cursor, "x", { duration: .25, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: .25, ease: "power3" });
    window.addEventListener("pointermove", e => {
      xTo(e.clientX); yTo(e.clientY);
      gsap.to(cursor, { opacity: .85, duration: .2, overwrite: true });
    });
    document.querySelectorAll("a, button, .magnetic-card").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 1.15, duration: .25 }));
      el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: .25 }));
    });
    document.querySelectorAll(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * .18;
        const dy = (e.clientY - (r.top + r.height / 2)) * .18;
        gsap.to(el, { x: dx, y: dy, duration: .35, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.5)" }));
    });
  }

  // Prevent browser jump from anchors from feeling abrupt while keeping native accessibility.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  // Refresh ScrollTrigger after fonts/layout settle.
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
