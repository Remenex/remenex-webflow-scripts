import { addCorners, draw } from "https://esm.sh/@monokai/monoco";

const BREAKPOINTS = {
  mobile: 767,
  tablet: 991,
};

function getCurrentDevice() {
  const w = window.innerWidth;
  if (w <= BREAKPOINTS.mobile) return "mobile";
  if (w <= BREAKPOINTS.tablet) return "tablet";
  return "desktop";
}

function parseBool(value, fallback = false) {
  if (value == null || value === "") return fallback;
  return value === "true";
}

function parseNumber(value, fallback) {
  if (value == null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseRadius(value, fallback = 24) {
  if (!value) return fallback;

  if (value.includes(",")) {
    const vals = value
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => Number.isFinite(v));
    return vals.length ? vals : fallback;
  }

  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseBorder(value) {
  if (!value) return undefined;

  const parts = value.split(",").map((v) => v.trim());
  if (parts.length < 2) return undefined;

  const size = Number(parts[0]);
  const color = parts[1];

  if (!Number.isFinite(size) || !color) return undefined;
  return [size, color];
}

function getResponsiveAttr(el, baseName) {
  const device = getCurrentDevice();

  if (device === "mobile") {
    return (
      el.getAttribute(`remenex-${baseName}-mobile`) ??
      el.getAttribute(`remenex-${baseName}-tablet`) ??
      el.getAttribute(`remenex-${baseName}`)
    );
  }

  if (device === "tablet") {
    return (
      el.getAttribute(`remenex-${baseName}-tablet`) ??
      el.getAttribute(`remenex-${baseName}`)
    );
  }

  return el.getAttribute(`remenex-${baseName}`);
}

function getSquircleOptions(el) {
  const radius = parseRadius(getResponsiveAttr(el, "radius"), 24);
  const smoothing = parseNumber(getResponsiveAttr(el, "smoothing"), 1);
  const background = getResponsiveAttr(el, "bg") || undefined;
  const border = parseBorder(getResponsiveAttr(el, "border"));
  const clip = parseBool(getResponsiveAttr(el, "clip"), true);

  return {
    borderRadius: radius,
    smoothing,
    clip,
    background,
    border,
  };
}

function getHoverBorderColor(el) {
  return getResponsiveAttr(el, "hover-border-color") || undefined;
}

function getHoverBgColor(el) {
  return getResponsiveAttr(el, "hover-bg-color") || undefined;
}

function drawNormalState(el) {
  draw(el, getSquircleOptions(el));
}

function drawHoverState(el) {
  const options = getSquircleOptions(el);
  const hoverBorder = getHoverBorderColor(el);
  const hoverBg = getHoverBgColor(el);

  const nextOptions = { ...options };

  if (hoverBorder && options.border) {
    nextOptions.border = [options.border[0], hoverBorder];
  }

  if (hoverBg) {
    nextOptions.background = hoverBg;
  }

  draw(el, nextOptions);
}

function bindHoverEvents(el) {
  if (el.dataset.remenexSquircleHoverBound === "true") return;

  const onEnter = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      drawHoverState(el);
    }
  };

  const onLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      drawNormalState(el);
    }
  };

  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);
  el.dataset.remenexSquircleHoverBound = "true";
}

function applySquircle(el) {
  const options = getSquircleOptions(el);
  const hoverBorder = getHoverBorderColor(el);
  const hoverBg = getHoverBgColor(el);

  if (!el.dataset.remenexSquircleInitialized) {
    addCorners(el, {
      ...options,
      observe: true,
    });

    el.dataset.remenexSquircleInitialized = "true";

    if (hoverBorder || hoverBg) {
      bindHoverEvents(el);
    }

    return;
  }

  draw(el, options);

  if (hoverBorder || hoverBg) {
    bindHoverEvents(el);
  }
}

function applyAllSquircles() {
  document.querySelectorAll("[remenex-squircle]").forEach(applySquircle);
}

let resizeTimeout;
function onResponsiveUpdate() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    applyAllSquircles();
  }, 120);
}

window.RemenexSquircle = {
  init: applyAllSquircles,
  reInit: applyAllSquircles,
  getAll() {
    return document.querySelectorAll("[remenex-squircle]");
  },
};

window.addEventListener("DOMContentLoaded", applyAllSquircles);
window.addEventListener("resize", onResponsiveUpdate);
