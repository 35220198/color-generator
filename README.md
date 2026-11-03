# 🎨 Aether Studio v3.0 — Enterprise Color Design System

A professional, high-performance web application designed to generate harmonized color palettes, calculate professional color tokens, and export design schemas instantly. Built with clean enterprise-grade architecture and a modern glassmorphic interface.

---

## 📁 Project Structure & Files

Your project requires three clean, separate files saved inside the same directory:

1. **`index.html`** — The semantic application shell containing the top navigation bar, studio control panel, interactive color swatch matrix, export modal dialog, and global toast notifications.
2. **`style.css`** — A scalable design-token system utilizing CSS custom properties, smooth cubic-bezier transitions, deep ambient glows, responsive layouts, and dark-mode glassmorphic styling.
3. **`script.js`** — An object-oriented ES6 application class handling algorithmic color harmony generation (via HSL mapping), DOM event delegation, robust clipboard fallbacks, keyboard shortcuts, and multi-format configuration exports (CSS, Tailwind, JSON).

---

## 🚀 How to Run Locally

Because modern web browsers enforce strict security policies (`CORS`) that block local file-to-file communication when opening via the standard `file://` protocol:

1. Open your project folder in a modern code editor like **VS Code**.
2. Install the **Live Server** extension (if you haven't already).
3. Right-click on `index.html` and select **"Open with Live Server"**, or click **"Go Live"** at the bottom right of your VS Code status bar.

---

## ✨ Key Global Features

* **Algorithmic Harmony Generation:** Automatically synthesizes pleasing, balanced color schemes using an HSL-to-Hex mathematical mapping algorithm.
* **Instant Clipboard Copying:** Click any color card or hex token to copy it instantly to your clipboard, backed by an ultra-reliable fallback buffer.
* **Keyboard Shortcuts:** Press the **`Spacebar`** anywhere on the screen to instantly synthesize a brand-new palette.
* **Export Suite:** Click **Export Config** to view and copy your active palette formatted directly for **CSS Custom Properties**, **Tailwind CSS configuration**, or **JSON data**.
* **Global Accessibility:** Built with full semantic tags, ARIA roles, and high-contrast styling.
