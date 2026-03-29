# Remenex Marquee

**Remenex Marquee** is a lightweight, reusable infinite marquee (continuous scrolling) component for Webflow projects, powered by Embla Carousel.

It provides **smooth, seamless, linear scrolling** without snapping or easing, fully controlled via custom HTML attributes.

---

## ✨ Features

* Infinite loop (continuous scrolling)
* Ultra smooth movement (no easing / no snapping)
* Horizontal & vertical support
* Reverse direction
* Pause on hover
* Pause on interaction
* Responsive disable (breakpoint support)
* Reduced motion support (accessibility)
* Automatic content duplication
* Multiple instances per page
* JavaScript API control

---

## 📦 Installation

### 1. Include Embla + Auto Scroll plugin

```html
<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
<script src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"></script>
```

---

### 2. Include Remenex Marquee

```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/remenex-scripts@1.0.0/marquee/remenex-marquee.js"></script>
```

---

### 3. Add CSS

```css
[remenex-marquee] {
  overflow: hidden;
  position: relative;
}

[remenex-viewport] {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

[remenex-container] {
  display: flex;
  gap: var(--remenex-gap, 48px);
  will-change: transform;
}

[remenex-slide] {
  flex: 0 0 auto;
}

[remenex-marquee][data-remenex-axis="y"] [remenex-container] {
  flex-direction: column;
}
```

---

## 🧩 HTML Structure

```html
<div remenex-marquee>
  <div remenex-viewport>
    <div remenex-container>
      <div remenex-slide>Item 1</div>
      <div remenex-slide>Item 2</div>
      <div remenex-slide>Item 3</div>
    </div>
  </div>
</div>
```

---

## ⚙️ Options (Custom Attributes)

All options are configured via **custom HTML attributes** in Webflow.

---

### Core Options

| Attribute           | Type    | Default    | Description                |
| ------------------- | ------- | ---------- | -------------------------- |
| `remenex-speed`     | number  | 1          | Scroll speed               |
| `remenex-gap`       | number  | 48         | Space between slides (px)  |
| `remenex-direction` | string  | horizontal | `horizontal` or `vertical` |
| `remenex-reverse`   | boolean | false      | Reverse direction          |

---

### Behavior

| Attribute           | Type    | Default | Description              |
| ------------------- | ------- | ------- | ------------------------ |
| `remenex-loop`      | boolean | true    | Infinite loop            |
| `remenex-drag`      | boolean | false   | Enable dragging          |
| `remenex-drag-free` | boolean | true    | Momentum scrolling       |
| `remenex-align`     | string  | start   | `start`, `center`, `end` |
| `remenex-dir`       | string  | ltr     | `ltr` or `rtl`           |

---

### Interaction

| Attribute                      | Type    | Default | Description         |
| ------------------------------ | ------- | ------- | ------------------- |
| `remenex-pause-on-hover`       | boolean | false   | Pause on hover      |
| `remenex-pause-on-interaction` | boolean | true    | Pause on click/drag |

---

### Advanced

| Attribute                    | Type    | Default | Description                    |
| ---------------------------- | ------- | ------- | ------------------------------ |
| `remenex-start-delay`        | number  | 0       | Delay before start             |
| `remenex-duplicate`          | number  | 1       | Number of content duplications |
| `remenex-breakpoint-disable` | number  | null    | Disable below screen width     |
| `remenex-active`             | boolean | true    | Enable/disable component       |

---

### Accessibility

| Attribute                | Type   | Default | Description          |
| ------------------------ | ------ | ------- | -------------------- |
| `remenex-reduced-motion` | string | pause   | `pause` or `disable` |

---

## 🔧 Examples

### Basic marquee

```html
<div remenex-marquee remenex-speed="1">
```

---

### Vertical marquee

```html
<div remenex-marquee remenex-direction="vertical">
```

---

### Reverse + hover pause

```html
<div remenex-marquee remenex-reverse remenex-pause-on-hover>
```

---

### Disable on mobile

```html
<div remenex-marquee remenex-breakpoint-disable="767">
```

---

## 🧠 JavaScript API

```js
const marquee = RemenexMarquee.get('[remenex-marquee]');

marquee.play();
marquee.stop();
marquee.reset();
marquee.isPlaying();
marquee.reInit();
marquee.destroy();
```

---

## ⚡ Recommended Setup

```html
<div
  remenex-marquee
  remenex-speed="1"
  remenex-gap="32"
  remenex-pause-on-hover="true"
  remenex-duplicate="2"
>
```

---

## 🚀 Roadmap

* Edge fade (mask effect)
* Multi-row sync support
* CMS auto-detection
* Lazy initialization (Intersection Observer)
* Advanced interaction controls

---

## 🏷️ License

MIT © Remenex

---

## 👤 Author

Built by **Remenex** for scalable Webflow development.
