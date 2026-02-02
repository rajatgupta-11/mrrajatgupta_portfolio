import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  vy: number;
  baseOpacity: number;
  twinkleSeed: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
  ttl: number; // ms
  createdAt: number;
  length: number;
};

const getIsDark = () => document.documentElement.classList.contains("dark");

const getHslVar = (name: string) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? `hsl(${raw} / 1)` : null;
};

const getHslVarWithAlpha = (name: string, alpha: number) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? `hsl(${raw} / ${alpha})` : null;
};

export const GalaxyBackground = ({ quality = "auto" }: { quality?: "auto" | "low" | "normal" } = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;

    let isDark = getIsDark();
    const themeObserver = new MutationObserver(() => {
      isDark = getIsDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const stars: Star[] = [];
    const meteors: Meteor[] = [];

    let nextMeteorAt = performance.now() + 2500 + Math.random() * 4500;
    let raf = 0;
    let running = true;
    let lastDrawAt = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      // Background canvas: keep DPR at 1 for performance.
      canvas.width = width;
      canvas.height = height;

      // Re-seed stars based on area for consistent density.
      stars.length = 0;
      const isSmall = width < 640 || height < 520;
      const q = quality === "auto" ? (isSmall ? "low" : "normal") : quality;
      const minStars = q === "low" ? 45 : 70;
      const maxStars = q === "low" ? 120 : 160;
      const denom = q === "low" ? 16000 : 12000;
      const target = Math.max(minStars, Math.min(maxStars, Math.floor((width * height) / denom)));
      for (let i = 0; i < target; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.7 + 0.2,
          vy: Math.random() * 0.22 + 0.06,
          baseOpacity: Math.random() * 0.8 + 0.2,
          twinkleSeed: Math.random() * Math.PI * 2,
        });
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (anyVisible && !running) {
          running = true;
          raf = requestAnimationFrame(animate);
        } else if (!anyVisible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { root: null, threshold: 0.01 }
    );
    io.observe(canvas);

    const spawnMeteor = (now: number) => {
      // Start near top-right area and streak down-left.
      const x = width * (0.45 + Math.random() * 0.55);
      const y = height * (0.05 + Math.random() * 0.25);
      const speed = 9 + Math.random() * 6;
      const angle = (Math.PI * 7) / 6 + (Math.random() - 0.5) * 0.25; // ~210°
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      meteors.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        ttl: 900 + Math.random() * 650,
        createdAt: now,
        length: 140 + Math.random() * 120,
      });
    };

    const drawBackgroundGlow = () => {
      // Subtle galaxy glow. Keep light mode very gentle.
      const centerX = width * 0.45;
      const centerY = height * 0.35;
      const radius = Math.max(width, height) * 0.9;

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      if (isDark) {
        gradient.addColorStop(0, "rgba(10, 28, 18, 0.26)");
        gradient.addColorStop(0.55, "rgba(0, 0, 0, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.06)");
        gradient.addColorStop(0.6, "rgba(16, 185, 129, 0.00)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = (now: number) => {
      if (!running) return;

      // Throttle FPS a bit on small screens to reduce jank.
      const isSmall = width < 640 || height < 520;
      const q = quality === "auto" ? (isSmall ? "low" : "normal") : quality;
      const minFrameMs = q === "low" ? 1000 / 36 : 1000 / 50;
      if (lastDrawAt && now - lastDrawAt < minFrameMs) {
        raf = requestAnimationFrame(animate);
        return;
      }
      lastDrawAt = now;

      ctx.clearRect(0, 0, width, height);
      drawBackgroundGlow();

      // Theme-derived colors
      const starRgb = isDark ? "255,255,255" : "0,0,0";
      const primaryGlow = getHslVarWithAlpha("--primary", isDark ? 0.55 : 0.25) ?? "rgba(16,185,129,0.45)";
      const primaryLine = getHslVar("--primary") ?? "#10b981";

      // Stars
      const t = now / 1000;
      for (const s of stars) {
        s.y -= s.vy;
        if (s.y < -2) {
          s.y = height + 2;
          s.x = Math.random() * width;
        }

        const twinkle = 0.65 + 0.35 * Math.sin(t * 1.3 + s.twinkleSeed);
        const base = isDark ? 0.85 : 0.18;
        const a = Math.max(0, Math.min(1, s.baseOpacity * twinkle * base));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb}, ${a})`;
        ctx.fill();
      }

      // Shooting stars
      if (now >= nextMeteorAt && width > 0 && height > 0) {
        spawnMeteor(now);
        nextMeteorAt = now + 3200 + Math.random() * 6500;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const age = now - m.createdAt;
        m.life = age / m.ttl;
        if (m.life >= 1) {
          meteors.splice(i, 1);
          continue;
        }

        // Move
        m.x += m.vx;
        m.y += m.vy;

        // Fade in/out
        const fade = m.life < 0.15 ? m.life / 0.15 : (1 - m.life) / 0.85;
        const alpha = Math.max(0, Math.min(1, fade)) * (isDark ? 0.75 : 0.35);

        const lx = m.x - (m.vx / Math.max(1e-3, Math.hypot(m.vx, m.vy))) * m.length;
        const ly = m.y - (m.vy / Math.max(1e-3, Math.hypot(m.vx, m.vy))) * m.length;

        ctx.save();
        ctx.lineWidth = isDark ? 2.2 : 1.5;
        ctx.lineCap = "round";
        ctx.shadowBlur = isDark ? 18 : 8;
        ctx.shadowColor = primaryGlow;

        const grad = ctx.createLinearGradient(lx, ly, m.x, m.y);
        grad.addColorStop(0, `rgba(0,0,0,0)`);
        grad.addColorStop(0.6, getHslVarWithAlpha("--primary", alpha * 0.45) ?? `rgba(16,185,129,${alpha * 0.45})`);
        grad.addColorStop(1, getHslVarWithAlpha("--primary", alpha) ?? `rgba(16,185,129,${alpha})`);
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Tiny head sparkle
        ctx.fillStyle = primaryLine;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(m.x, m.y, isDark ? 2.2 : 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
    };
  }, [quality]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

