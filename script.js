class EnterpriseAetherStudio {
  constructor() {
    this.generateBtn = document.getElementById("generate-btn");
    this.exportBtn = document.getElementById("export-btn");
    this.closeModalBtn = document.getElementById("close-modal");
    this.modalOverlay = document.getElementById("export-modal");
    this.modalCopyBtn = document.getElementById("modal-copy-btn");
    this.exportCodeBlock = document.getElementById("export-code");
    this.matrix = document.querySelector(".palette-matrix");
    this.toast = document.getElementById("toast");
    this.toastMsg = document.getElementById("toast-msg");
    
    this.currentPalette = [];
    this.currentExportTab = "css";
    this.toastTimeout = null;

    this.initEvents();
    this.generateBalancedPalette();
  }

  initEvents() {
    this.generateBtn.addEventListener("click", () => this.generateBalancedPalette());
    
    // Spacebar shortcut to generate
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        this.generateBalancedPalette();
      }
    });

    this.matrix.addEventListener("click", (e) => {
      const card = e.target.closest(".color-card");
      if (!card) return;
      const hex = card.dataset.hex;
      this.copyToClipboard(hex);
    });

    // Export Modal Controls
    this.exportBtn.addEventListener("click", () => this.openExportModal());
    this.closeModalBtn.addEventListener("click", () => this.closeExportModal());
    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) this.closeExportModal();
    });

    // Modal Tabs
    document.querySelector(".tab-buttons").addEventListener("click", (e) => {
      if (!e.target.classList.contains("tab-btn")) return;
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      this.currentExportTab = e.target.dataset.target;
      this.updateExportCodeContent();
    });

    this.modalCopyBtn.addEventListener("click", () => {
      this.copyToClipboard(this.exportCodeBlock.textContent, "Export config copied");
      this.closeExportModal();
    });
  }

  // Generates visually harmonic palettes using HSL color mapping
  generateBalancedPalette() {
    const baseHue = Math.floor(Math.random() * 360);
    const roles = ["Base Dark", "Primary Core", "Accent Light", "Supporting", "Highlight"];
    
    this.currentPalette = roles.map((role, idx) => {
      let h = (baseHue + (idx * 45)) % 360;
      let s = Math.floor(Math.random() * 40) + 50; // 50-90% saturation
      let l = Math.floor(Math.random() * 45) + 25; // 25-70% lightness
      
      if (idx === 0) l = 12; // Force dark foundation
      if (idx === 4) l = 85; // Force light highlight

      return { role, hex: this.hslToHex(h, s, l) };
    });

    this.renderMatrix();
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  renderMatrix() {
    this.matrix.innerHTML = "";

    this.currentPalette.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "color-card";
      card.dataset.hex = item.hex;

      card.innerHTML = `
        <div class="color-swatch" style="background-color: ${item.hex}">
          <span class="copy-badge"><i class="far fa-copy"></i> Copy HEX</span>
        </div>
        <div class="color-details">
          <span class="color-role">${item.role}</span>
          <button class="hex-display" type="button">
            <span>${item.hex}</span>
            <i class="far fa-copy"></i>
          </button>
        </div>
      `;
      this.matrix.appendChild(card);
    });
  }

  openExportModal() {
    this.modalOverlay.hidden = false;
    this.updateExportCodeContent();
  }

  closeExportModal() {
    this.modalOverlay.hidden = true;
  }

  updateExportCodeContent() {
    let output = "";
    if (this.currentExportTab === "css") {
      output = `:root {\n` + this.currentPalette.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.role} */`).join("\n") + `\n}`;
    } else if (this.currentExportTab === "tailwind") {
      output = `// tailwind.config.js\ncolors: {\n` + this.currentPalette.map((c, i) => `  'palette-${i + 1}': '${c.hex}',`).join("\n") + `\n}`;
    } else if (this.currentExportTab === "json") {
      const jsonObj = {};
      this.currentPalette.forEach((c, i) => jsonObj[`color_${i + 1}`] = { role: c.role, hex: c.hex });
      output = JSON.stringify(jsonObj, null, 2);
    }
    this.exportCodeBlock.textContent = output;
  }

  async copyToClipboard(text, customMessage = null) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        this.showToast(customMessage || `Copied token: ${text}`);
      } else {
        this.fallbackCopy(text, customMessage);
      }
    } catch (err) {
      this.fallbackCopy(text, customMessage);
    }
  }

  fallbackCopy(text, customMessage) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      this.showToast(customMessage || `Copied token: ${text}`);
    } catch (e) {
      this.showToast("Clipboard write blocked by browser context");
    }
    document.body.removeChild(textarea);
  }

  showToast(message) {
    clearTimeout(this.toastTimeout);
    this.toastMsg.textContent = message;
    this.toast.classList.add("show");
    this.toastTimeout = setTimeout(() => {
      this.toast.classList.remove("show");
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new EnterpriseAetherStudio();
});
