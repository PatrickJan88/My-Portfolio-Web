"use client";

import { useEffect, useRef, useState } from "react";
import { type MotionValue } from "motion/react";

export interface ParticleScrollDissolveProps {
  text: string;
  subtext?: string;
  progress: MotionValue<number>;
  dissolveRange?: [number, number]; // [startProgress, endProgress], e.g. [0.05, 0.45]
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  textColor?: string;
  subFontFamily?: string;
  subFontSize?: string;
  subFontWeight?: number | string;
  subLetterSpacing?: string;
  subTextColor?: string;
  density?: number;
  size?: number;
  spread?: number;
  gravity?: number;
  drift?: number;
  swirl?: number;
  stagger?: number;
  fade?: number;
  className?: string;
}

function hash2(x: number, y: number): number {
  const sinVal = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return sinVal - Math.floor(sinVal);
}

export function ParticleScrollDissolve({
  text,
  subtext,
  progress,
  dissolveRange = [0.04, 0.5],
  fontFamily = "'Space Grotesk', 'Stack Sans Text', 'Inter', system-ui, -apple-system, sans-serif",
  fontSize = "clamp(5.5rem, 16vw, 11.5rem)",
  fontWeight = 900,
  letterSpacing = "-0.03em",
  textColor = "#e4e6ea",
  subFontFamily = "'TraditionalAmpersand', 'Inter', 'Space Grotesk', system-ui, -apple-system, sans-serif",
  subFontSize = "clamp(1rem, 2.3vw, 1.4rem)",
  subFontWeight = 700,
  subLetterSpacing = "0.24em",
  subTextColor = "#e4e6ea",
  density = 2.4,
  size = 1.6,
  spread = 260,
  gravity = -0.15,
  drift = 0.75,
  swirl = 65,
  stagger = 0.65,
  fade = 0.9,
  className = "",
}: ParticleScrollDissolveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Subscribe to motion value progress
  useEffect(() => {
    const unsubscribe = progress.on("change", (val) => {
      setCurrentProgress(val);
    });
    setCurrentProgress(progress.get());
    return () => unsubscribe();
  }, [progress]);

  // Particle simulation and rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let time = 0;
    let lastTime = performance.now();

    // Particle cache
    interface ParticlePoint {
      homeX: number;
      homeY: number;
      cellX: number;
      cellY: number;
      r: number;
      g: number;
      b: number;
      alpha: number;
      size: number;
      h1: number;
      h2: number;
      h3: number;
      h4: number;
      dirX: number;
      dirY: number;
      reach: number;
    }

    let particles: ParticlePoint[] = [];
    let isSampled = false;

    const sampleTextToParticles = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, 320);
      const h = Math.max(rect.height, 160);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Offscreen sampling canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.save();
      offCtx.scale(dpr, dpr);
      offCtx.clearRect(0, 0, w, h);

      // Compute font sizes
      const dummyTitle = document.createElement("div");
      dummyTitle.style.position = "absolute";
      dummyTitle.style.visibility = "hidden";
      dummyTitle.style.fontFamily = fontFamily;
      dummyTitle.style.fontSize = fontSize;
      dummyTitle.style.fontWeight = String(fontWeight);
      dummyTitle.style.letterSpacing = letterSpacing;
      dummyTitle.innerText = text;
      document.body.appendChild(dummyTitle);
      const computedTitleStyle = window.getComputedStyle(dummyTitle);
      const computedTitleFontSize = computedTitleStyle.fontSize;
      document.body.removeChild(dummyTitle);

      let computedSubFontSize = "18px";
      if (subtext) {
        const dummySub = document.createElement("div");
        dummySub.style.position = "absolute";
        dummySub.style.visibility = "hidden";
        dummySub.style.fontFamily = subFontFamily;
        dummySub.style.fontSize = subFontSize;
        dummySub.style.fontWeight = String(subFontWeight);
        dummySub.style.letterSpacing = subLetterSpacing;
        dummySub.innerText = subtext;
        document.body.appendChild(dummySub);
        const computedSubStyle = window.getComputedStyle(dummySub);
        computedSubFontSize = computedSubStyle.fontSize;
        document.body.removeChild(dummySub);
      }

      // Draw Main Title
      const titleY = subtext ? h * 0.42 : h * 0.5;
      offCtx.font = `${fontWeight} ${computedTitleFontSize} ${fontFamily}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = textColor;
      if (letterSpacing && letterSpacing !== "normal") {
        try {
          (offCtx as unknown as { letterSpacing: string }).letterSpacing = letterSpacing;
        } catch {}
      }
      offCtx.fillText(text, w / 2, titleY);

      // Draw Subtitle
      if (subtext) {
        const subY = titleY + parseFloat(computedTitleFontSize) * 0.52 + 18;
        offCtx.font = `${subFontWeight} ${computedSubFontSize} ${subFontFamily}`;
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillStyle = subTextColor;
        if (subLetterSpacing && subLetterSpacing !== "normal") {
          try {
            (offCtx as unknown as { letterSpacing: string }).letterSpacing = subLetterSpacing;
          } catch {}
        }
        offCtx.fillText(subtext, w / 2, subY);
      }

      offCtx.restore();

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;
      const step = Math.max(Math.round(density * dpr), 1);

      particles = [];
      let index = 0;

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const idx = (y * offscreen.width + x) * 4;
          const alpha = data[idx + 3] / 255;
          if (alpha > 0.15) {
            const homeX = x / dpr;
            const homeY = y / dpr;
            const cellX = Math.floor(homeX / density);
            const cellY = Math.floor(homeY / density);

            const h1 = hash2(cellX, cellY);
            const h2 = hash2(cellX + 1.7, cellY + 9.1);
            const h3 = hash2(cellX + 5.5, cellY + 2.9);
            const h4 = hash2(cellX + 8.4, cellY + 4.2);

            let dirX = h2 - 0.5;
            let dirY = h3 - 0.5;
            const len = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
            dirX /= len;
            dirY /= len;

            const reach = 0.08 + 0.92 * Math.pow(h4, 2.4);

            particles.push({
              homeX,
              homeY,
              cellX,
              cellY,
              r: data[idx],
              g: data[idx + 1],
              b: data[idx + 2],
              alpha,
              size: (size * (0.85 + 0.35 * h1)),
              h1,
              h2,
              h3,
              h4,
              dirX,
              dirY,
              reach,
            });
            index++;
          }
        }
      }
      isSampled = true;
    };

    sampleTextToParticles();

    const resizeObserver = new ResizeObserver(() => {
      sampleTextToParticles();
    });
    resizeObserver.observe(container);

    // Render loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      time += dt;

      if (!isSampled || particles.length === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Compute Normalized Dissolve Progress [0..1]
      const [startRange, endRange] = dissolveRange;
      const rawProgress = Math.min(Math.max((currentProgress - startRange) / (endRange - startRange), 0), 1);

      // Render each particle according to shader math
      const tt = time * drift;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Dissolve threshold per particle
        const d = p.h1 * stagger;
        const rowNorm = (p.homeY / h);
        
        // Progress wave moving across text
        const localProgress = rawProgress * 1.3 - rowNorm * 0.3;
        const t = Math.min(Math.max(1.0 - (localProgress - d) / Math.max(1.0 - d, 0.001), 0), 1);
        
        // Ease function e = 1 - (1 - t)^3
        const e = 1.0 - Math.pow(1.0 - t, 3.0);

        if (e > 0.9995 && rawProgress === 0) {
          // Fully assembled at home position
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
          ctx.fillRect(p.homeX - p.size * 0.5, p.homeY - p.size * 0.5, p.size, p.size);
          continue;
        }

        // Particle Scatter Physics
        const offX = p.dirX * spread * p.reach;
        let offY = p.dirY * spread * p.reach;
        offY += gravity * spread * (0.25 + 0.75 * p.h4);

        const scatX = p.homeX + offX;
        const scatY = p.homeY + offY;

        let posX = scatX + (p.homeX - scatX) * e;
        let posY = scatY + (p.homeY - scatY) * e;

        // Swirl
        const perpX = -p.dirY;
        const perpY = p.dirX;
        const swirlAngle = Math.sin(e * Math.PI);
        posX += perpX * (p.h2 - 0.5) * 2.0 * swirl * swirlAngle;
        posY += perpY * (p.h2 - 0.5) * 2.0 * swirl * swirlAngle;

        // Drift turbulence
        const amp = (1.0 - e) * (spread * 0.06 + 3.0);
        posX += Math.sin(tt * (4.0 + 5.0 * p.h2) + p.h3 * 40.0) * amp;
        posY += Math.cos(tt * (3.5 + 5.5 * p.h3) + p.h2 * 40.0) * amp;

        // Fade
        const alpha = p.alpha * (fade + (1.0 - fade) * e) * (1.0 - Math.pow(rawProgress, 2.5));
        if (alpha < 0.01) continue;

        // Size modulation
        const currentSize = p.size * (0.6 + 0.4 * e);

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, currentSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [
    text,
    subtext,
    currentProgress,
    dissolveRange,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textColor,
    subFontFamily,
    subFontSize,
    subFontWeight,
    subLetterSpacing,
    subTextColor,
    density,
    size,
    spread,
    gravity,
    drift,
    swirl,
    stagger,
    fade,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none z-10 block"
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 4px 32px rgba(0,0,0,0.85))",
        }}
      />
    </div>
  );
}

export default ParticleScrollDissolve;
