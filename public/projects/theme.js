(() => {
  try {
    const saved = localStorage.getItem("theme");
    if (!saved) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch {
    // no-op
  }

  // Safety: strip leading "// " from visible labels if any page still has them.
  // (Helps if a cached/older HTML is opened.)
  const strip = (s) => (typeof s === "string" ? s.replace(/^\s*\/\/\s+/, "") : s);
  const nodes = document.querySelectorAll("a.nav-btn, figcaption, .mono, p, span, div");
  nodes.forEach((el) => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
      const t = el.textContent || "";
      const next = strip(t);
      if (next !== t) el.textContent = next;
    }
  });
})();

