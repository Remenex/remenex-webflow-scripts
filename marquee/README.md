# Remenex Marquee

**Remenex Marquee** is a lightweight, reusable infinite marquee component for Webflow projects, powered by Embla Carousel.

It creates **smooth, continuous, linear scrolling** without snapping or easing, and is fully controlled through custom HTML attributes.

---

## Features

* Infinite continuous scroll
* Smooth marquee-style movement
* Horizontal and vertical support
* Reverse direction
* Pause on hover
* Pause on interaction
* Breakpoint-based disable
* Reduced motion support
* Automatic content duplication
* Multiple marquees on the same page
* JavaScript API support

---

## Installation

### 1. Add the required Embla libraries

```html
<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
<script src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"></script>
```

### 2. Add Remenex Marquee CSS

You have **two options**.

#### Option A — Use the hosted CSS file

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Remenex/remenex-webflow-scripts@1.0.6/marquee/remenex-marquee.css">
```

#### Option B — Write the CSS manually

If you prefer not to load the hosted CSS file, use this:

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

### 3. Add Remenex Marquee JS

```html
<script src="https://cdn.jsdelivr.net/gh/Remenex/remenex-webflow-scripts@1.0.6/marquee/remenex-marquee.js"></script>
```

---

## Webflow Setup

### Add CSS in the Head

In Webflow, go to:

**Site Settings → Custom Code → Inside `<head>`**

Then add either:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Remenex/remenex-webflow-scripts@1.0.6/marquee/remenex-marquee.css">
```

or your own manual CSS.

### Add Scripts Before `</body>`

In Webflow, go to:

**Site Settings → Custom Code → Before `</body>`**

Then add:

```html
<script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script>
<script src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Remenex/remenex-webflow-scripts@1.0.6/marquee/remenex-marquee.js"></script>
```

You can also place these in **Page Settings** instead if you only want the marquee on a specific page.

---

## HTML Structure

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

## Options

All options are controlled through custom HTML attributes.

### Core Options

| Attribute           | Type    | Default      | Description                |
| ------------------- | ------- | ------------ | -------------------------- |
| `remenex-speed`     | number  | `1`          | Scroll speed               |
| `remenex-gap`       | number  | `48`         | Space between slides in px |
| `remenex-direction` | string  | `horizontal` | `horizontal` or `vertical` |
| `remenex-reverse`   | boolean | `false`      | Reverses scroll direction  |

### Behavior

| Attribute           | Type    | Default | Description                     |
| ------------------- | ------- | ------- | ------------------------------- |
| `remenex-loop`      | boolean | `true`  | Enables infinite loop           |
| `remenex-drag`      | boolean | `false` | Enables dragging                |
| `remenex-drag-free` | boolean | `true`  | Enables momentum-style dragging |
| `remenex-align`     | string  | `start` | `start`, `center`, or `end`     |
| `remenex-dir`       | string  | `ltr`   | `ltr` or `rtl`                  |

### Interaction

| Attribute                      | Type    | Default | Description             |
| ------------------------------ | ------- | ------- | ----------------------- |
| `remenex-pause-on-hover`       | boolean | `false` | Pauses on hover         |
| `remenex-pause-on-interaction` | boolean | `true`  | Pauses on click or drag |

### Advanced

| Attribute                    | Type    | Default | Description                           |
| ---------------------------- | ------- | ------- | ------------------------------------- |
| `remenex-start-delay`        | number  | `0`     | Delay before auto-scroll starts       |
| `remenex-duplicate`          | number  | `1`     | Number of extra content duplications  |
| `remenex-breakpoint-disable` | number  | `null`  | Disables marquee below a screen width |
| `remenex-active`             | boolean | `true`  | Enables or disables the component     |

### Accessibility

| Attribute                | Type   | Default | Description          |
| ------------------------ | ------ | ------- | -------------------- |
| `remenex-reduced-motion` | string | `pause` | `pause` or `disable` |


## 📱 Responsiveness

Remenex Marquee supports responsive spacing through custom attributes, allowing you to control the gap between slides across different screen sizes.

---

### Breakpoints

The following breakpoints are used:

* **Desktop** → default (above 991px)
* **Tablet** → ≤ 991px
* **Mobile** → ≤ 767px

---

### Available Attributes

| Attribute              | Description                     |
| ---------------------- | ------------------------------- |
| `remenex-gap`          | Default gap (desktop)           |
| `remenex-tablet-gap`   | Gap on tablet screens           |
| `remenex-mobile-gap`   | Gap on mobile (vertical axis)   |
| `remenex-mobile-h-gap` | Gap on mobile (horizontal axis) |

---

### Example

```html
<div
  remenex-marquee
  remenex-gap="48"
  remenex-tablet-gap="32"
  remenex-mobile-gap="16"
  remenex-mobile-h-gap="12"
>
```

---

### How It Works

* The script automatically detects the current screen width
* It selects the appropriate gap value based on breakpoints
* Spacing is applied via inline styles (`margin-right` or `margin-bottom`)
* No CSS media queries are required

---

### Fallback Behavior

If a specific value is not provided:

* Tablet falls back to `remenex-gap`
* Mobile falls back to:

  * `remenex-mobile-h-gap` → horizontal
  * `remenex-mobile-gap` → vertical
  * then `remenex-tablet-gap`
  * then `remenex-gap`

---

### Notes

* Works for both horizontal and vertical marquees
* Ensures consistent spacing across duplicated slide sets
* Fully controlled via attributes — no additional CSS needed

---

## Examples

### Basic marquee

```html
<div remenex-marquee remenex-speed="1">
  <div remenex-viewport>
    <div remenex-container>
      <div remenex-slide>Logo 1</div>
      <div remenex-slide>Logo 2</div>
      <div remenex-slide>Logo 3</div>
    </div>
  </div>
</div>
```

### Vertical marquee

```html
<div remenex-marquee remenex-direction="vertical" remenex-speed="0.8">
  <div remenex-viewport>
    <div remenex-container>
      <div remenex-slide>Card 1</div>
      <div remenex-slide>Card 2</div>
      <div remenex-slide>Card 3</div>
    </div>
  </div>
</div>
```

### Reverse direction with hover pause

```html
<div remenex-marquee remenex-reverse="true" remenex-pause-on-hover="true">
  <div remenex-viewport>
    <div remenex-container>
      <div remenex-slide>Item 1</div>
      <div remenex-slide>Item 2</div>
      <div remenex-slide>Item 3</div>
    </div>
  </div>
</div>
```

### Disable on mobile

```html
<div remenex-marquee remenex-breakpoint-disable="767">
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

## JavaScript API

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

## Recommended Setup

```html
<div
  remenex-marquee
  remenex-speed="1"
  remenex-gap="32"
  remenex-pause-on-hover="true"
  remenex-duplicate="2"
>
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

## Notes

* Add the CSS in the page or site `<head>`
* Add the script tags before `</body>`
* Make sure Embla is loaded before `remenex-marquee.js`
* If you update the script in the future, publish a new version and update the CDN version number

---

## License

MIT © Remenex

---

## Author

Built by **Remenex** for scalable Webflow development.
