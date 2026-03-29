# Remenex Squircle

**Remenex Squircle** is a lightweight, attribute-driven squircle (smooth corner radius) utility for Webflow, powered by Monoco.

It allows you to create **high-quality rounded shapes (squircles)** with full control over radius, smoothing, borders, backgrounds, hover states, and responsive behavior — all directly from HTML attributes.

---

## ✨ Features

- Smooth squircle corners (superellipse-based)
- Responsive radius, smoothing, background, and border
- Hover states (background + border color)
- Supports multiple radius values (per-corner)
- Works with any element
- Automatic redraw on resize
- Attribute-based configuration (no JS needed per instance)
- Multiple instances per page
- Lightweight and flexible

---

## 📦 Installation

### 1. Add Remenex Squircle script

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/Remenex/remenex-webflow-scripts@1.0.0/squircle/remenex-squircle.js"
></script>
```

---

## 🧩 HTML Usage

```html
<div
  remenex-squircle
  remenex-radius="24"
  remenex-smoothing="1"
  remenex-bg="#111111"
  remenex-border="1,#2b2b2b"
>
  Content
</div>
```

---

## ⚙️ Attributes

All configuration is done via custom HTML attributes.

---

### Radius

| Attribute               | Description      |
| ----------------------- | ---------------- |
| `remenex-radius`        | Default radius   |
| `remenex-radius-tablet` | Radius on tablet |
| `remenex-radius-mobile` | Radius on mobile |

Supports:

```html
remenex-radius="24" remenex-radius="24,24,0,0"
```

---

### Smoothing

| Attribute                  | Description             |
| -------------------------- | ----------------------- |
| `remenex-smoothing`        | Default smoothing (0–1) |
| `remenex-smoothing-tablet` | Tablet smoothing        |
| `remenex-smoothing-mobile` | Mobile smoothing        |

---

### Background

| Attribute           | Description       |
| ------------------- | ----------------- |
| `remenex-bg`        | Background color  |
| `remenex-bg-tablet` | Tablet background |
| `remenex-bg-mobile` | Mobile background |

---

### Border

```html
remenex-border="1,#ffffff"
```

| Attribute               | Description    |
| ----------------------- | -------------- |
| `remenex-border`        | `[size,color]` |
| `remenex-border-tablet` | Tablet border  |
| `remenex-border-mobile` | Mobile border  |

---

### Hover

| Attribute                    | Description           |
| ---------------------------- | --------------------- |
| `remenex-hover-border-color` | Border color on hover |
| `remenex-hover-bg-color`     | Background on hover   |

---

### Behavior

| Attribute      | Description                              |
| -------------- | ---------------------------------------- |
| `remenex-clip` | Clip content inside shape (`true/false`) |

---

## 📱 Responsiveness

Remenex Squircle automatically adapts based on screen width:

- **Desktop** → default values
- **Tablet ≤ 991px** → `-tablet` attributes
- **Mobile ≤ 767px** → `-mobile` attributes

Fallback order:

- Mobile → Tablet → Desktop

---

## 🔧 Examples

### Basic squircle

```html
<div remenex-squircle remenex-radius="24" remenex-bg="#111"></div>
```

---

### Responsive radius

```html
<div
  remenex-squircle
  remenex-radius="32"
  remenex-radius-tablet="24"
  remenex-radius-mobile="16"
></div>
```

---

### With border

```html
<div remenex-squircle remenex-radius="24" remenex-border="1,#ffffff"></div>
```

---

### Hover effect

```html
<div
  remenex-squircle
  remenex-bg="#111"
  remenex-hover-bg-color="#1a1a1a"
  remenex-border="1,#333"
  remenex-hover-border-color="#ff6b00"
></div>
```

---

### Per-corner radius

```html
<div remenex-squircle remenex-radius="24,24,0,0"></div>
```

---

## 🧠 JavaScript API

```js
RemenexSquircle.init();
RemenexSquircle.reInit();
RemenexSquircle.getAll();
```

---

## ⚠️ Notes

- This script uses **ES modules**, so it must be loaded with `type="module"`
- Works only on published Webflow sites (not fully in Designer)
- Automatically re-renders on window resize
- Hover effects apply only on devices that support hover

---

## 🚀 Roadmap

- Animation support
- Dynamic smoothing transitions
- Gradient borders
- Mask-based performance mode
- CMS auto-detection

---

## 🏷️ License

MIT © Remenex

---

## 👤 Author

Built by **Remenex** for scalable Webflow development.
