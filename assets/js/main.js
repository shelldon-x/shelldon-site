"use strict";
document.documentElement.classList.add("js");
const profile = window.PROFILE || {};
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
if (toggle && nav) {
  toggle.hidden = false;
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    closeMenu();
    // Place keyboard focus at the destination instead of a now-hidden menu item.
    const destination = document.querySelector(link.hash);
    if (destination) {
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header")) closeMenu();
  });
  window.matchMedia("(max-width: 700px)").addEventListener("change", closeMenu);
}

document.querySelectorAll("[data-profile]").forEach((link) => {
  const key = link.dataset.profile;
  const value = (profile[key] || "").trim();
  if (!value) return;
  if (key === "EMAIL") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
    link.href = "mailto:" + value;
  } else {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:") return;
      link.href = url.href;
    } catch {
      return;
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.hidden = false;
});
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  // Content is always visible, even if JavaScript or the observer fails.
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".expertise, .project, .human")
    .forEach((element) => observer.observe(element));
}

const qualityButton = document.querySelector("#quality-check");
if (qualityButton) {
  qualityButton.hidden = false;
  qualityButton.addEventListener("click", () => {
    const imagesReady = [...document.images].every(
      (img) => img.complete && img.naturalWidth > 0,
    );
    const noOverflow =
      document.documentElement.scrollWidth <= window.innerWidth;
    const result =
      imagesReady && noOverflow
        ? "✓ Foto carregada. Layout dentro dos limites."
        : "↳ Há um detalhe para revisar no layout ou nas imagens.";
    document.querySelector("#quality-result").textContent = result;
    qualityButton.textContent = result;
  });
}

// Optional analytics: nothing is fetched until valid IDs AND explicit consent exist.
const ga = /^G-[A-Z0-9]+$/.test(profile.GA4_ID || "") ? profile.GA4_ID : "";
const clarity = /^[a-z0-9]+$/.test(profile.CLARITY_ID || "")
  ? profile.CLARITY_ID
  : "";
if (ga || clarity) {
  const panel = document.querySelector("#analytics-consent");
  const settings = document.querySelector("#analytics-settings");
  const key = "shelldon-analytics-consent";
  let loaded = false;
  const readConsent = () => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const saveConsent = (value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Storage can be unavailable. */
    }
  };
  const script = (src) => {
    const node = document.createElement("script");
    node.src = src;
    node.async = true;
    document.head.append(node);
  };
  const enable = () => {
    if (loaded) return;
    loaded = true;
    if (ga) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", ga);
      script("https://www.googletagmanager.com/gtag/js?id=" + ga);
    }
    if (clarity) {
      window.clarity =
        window.clarity ||
        function () {
          (window.clarity.q = window.clarity.q || []).push(arguments);
        };
      window.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "granted",
      });
      script("https://www.clarity.ms/tag/" + clarity);
    }
  };
  if (readConsent() === "granted") enable();
  else if (readConsent() !== "denied") panel.hidden = false;
  settings.hidden = false;
  document.querySelector("#accept-analytics").addEventListener("click", () => {
    saveConsent("granted");
    panel.hidden = true;
    enable();
    settings.focus();
  });
  document.querySelector("#decline-analytics").addEventListener("click", () => {
    saveConsent("denied");
    panel.hidden = true;
    if (loaded) {
      if (ga) {
        window["ga-disable-" + ga] = true;
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
      if (clarity)
        window.clarity("consentv2", {
          ad_Storage: "denied",
          analytics_Storage: "denied",
        });
      location.reload();
    } else settings.focus();
  });
  settings.addEventListener("click", () => {
    panel.hidden = false;
    document.querySelector("#accept-analytics").focus();
  });
}
