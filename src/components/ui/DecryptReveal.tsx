import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createRectCache } from "./rect-cache";

export interface DecryptRevealProps {
  children?: ReactNode;
  imageSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  softness?: number;
  cell?: number;
  aspect?: number;
  charset?: string;
  colored?: number;
  color?: string;
  brightness?: number;
  legibility?: number;
  contrast?: number;
  exposure?: number;
  scramble?: number;
  scrambleSpeed?: number;
  edgeWidth?: number;
  edgeFlicker?: number;
  edgeGlow?: number;
  edgeTint?: number;
  aberration?: number;
  passthrough?: number;
  threshold?: number;
  background?: string;
  smoothing?: number;
}

const PRINTABLE_ASCII =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/";

/**
 * Universal High-Performance Decrypt Reveal Component:
 * Features a real-time ASCII cipher matrix mesh with dynamic cursor repulsion,
 * radial decryption wavefront, smooth glitch flicker, chromatic aberration,
 * and high-contrast photo reveal.
 */
export function DecryptReveal({
  children,
  imageSrc,
  className = "",
  style,
  radius = 280,
  cell = 12,
  charset = PRINTABLE_ASCII,
  color = "#2F5BF9",
  background = "#ffffff",
  scrambleSpeed = 12,
  passthrough = 0.08,
}: DecryptRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const pointerRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    active: number;
    targetActive: number;
  }>({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: 0,
    targetActive: 0,
  });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const sampleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load and cache the portrait image
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;

      // Crop tightly to subject's top
      const rawW = img.naturalWidth || img.width;
      const rawH = img.naturalHeight || img.height;
      const scanCanvas = document.createElement("canvas");
      scanCanvas.width = rawW;
      scanCanvas.height = rawH;
      const scanCtx = scanCanvas.getContext("2d", { willReadFrequently: true });
      if (!scanCtx) return;

      scanCtx.drawImage(img, 0, 0);
      const rawImgData = scanCtx.getImageData(0, 0, rawW, rawH).data;

      let minX = rawW;
      let minY = rawH;
      let maxX = 0;
      let maxY = 0;
      let foundSubject = false;

      for (let py = 0; py < rawH; py += 2) {
        for (let px = 0; px < rawW; px += 2) {
          const idx = (py * rawW + px) * 4;
          const a = rawImgData[idx + 3] / 255;
          const r = rawImgData[idx];
          const g = rawImgData[idx + 1];
          const b = rawImgData[idx + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (a > 0.15 && lum < 0.94) {
            if (px < minX) minX = px;
            if (px > maxX) maxX = px;
            if (py < minY) minY = py;
            if (py > maxY) maxY = py;
            foundSubject = true;
          }
        }
      }

      let srcX = 0;
      let srcY = 0;
      let srcW = rawW;
      let srcH = rawH;

      if (foundSubject && maxX > minX && maxY > minY) {
        // Tight crop directly to subject bounds (head top to torso bottom)
        srcX = minX;
        srcY = minY;
        srcW = maxX - minX;
        srcH = maxY - minY;
      }

      const sampleW = 600;
      const sampleH = Math.max(100, Math.round(600 * (srcH / Math.max(1, srcW))));
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = sampleW;
      sampleCanvas.height = sampleH;
      const sCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (sCtx) {
        sCtx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, sampleW, sampleH);
        sampleCanvasRef.current = sampleCanvas;
        setImageLoaded(true);
      }
    };
  }, [imageSrc]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const rectCache = createRectCache(container);

    const resize = () => {
      const rect = rectCache.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const chars = charset.split("");
    const charsLen = chars.length;

    const render = (now: number) => {
      lastTime = now;

      // Pointer smoothing
      const p = pointerRef.current;
      p.x += (p.targetX - p.x) * 0.18;
      p.y += (p.targetY - p.y) * 0.18;
      p.active += (p.targetActive - p.active) * 0.15;

      const rect = rectCache.current;
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      if (sampleCanvasRef.current && imageLoaded) {
        const sCanvas = sampleCanvasRef.current;
        const sCtx = sCanvas.getContext("2d");
        if (!sCtx) return;

        const sampleW = sCanvas.width;
        const sampleH = sCanvas.height;
        const subjectAspect = sampleW / sampleH;

        // Scale subject to span exactly from top (y=0) to bottom (y=height)
        const drawH = height;
        const drawW = drawH * subjectAspect;
        const destX = (width - drawW) / 2;
        const destY = 0;

        ctx.save();

        // 1. Draw base / underlying photo
        ctx.globalAlpha = Math.max(passthrough, 0.04);
        ctx.drawImage(sCanvas, destX, destY, drawW, drawH);

        // 2. Draw revealed photo with soft radial gradient mask (no hard circle shape)
        if (p.active > 0.005) {
          const effRadius = radius * p.active;
          
          // Offscreen reveal mask with smooth feathered edge
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = width;
          maskCanvas.height = height;
          const mCtx = maskCanvas.getContext("2d");
          if (mCtx) {
            // Draw photo
            mCtx.drawImage(sCanvas, destX, destY, drawW, drawH);

            // Apply soft radial gradient feather as destination-in
            mCtx.globalCompositeOperation = "destination-in";
            const radGrad = mCtx.createRadialGradient(
              p.x,
              p.y,
              Math.max(0, effRadius * 0.35),
              p.x,
              p.y,
              effRadius
            );
            radGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
            radGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.95)");
            radGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.45)");
            radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            mCtx.fillStyle = radGrad;
            mCtx.fillRect(0, 0, width, height);

            // Draw soft masked reveal onto main canvas
            ctx.globalAlpha = 1.0;
            ctx.drawImage(maskCanvas, 0, 0);
          }
        }

        // 3. Draw Decrypt Matrix Glyph Grid (Monochrome Ink)
        const sampleData = sCtx.getImageData(0, 0, sampleW, sampleH).data;
        const cellSize = cell;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        ctx.font = `600 ${cellSize * 0.92}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const tSec = now * 0.001 * scrambleSpeed;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const posX = c * cellSize + cellSize / 2;
            const posY = r * cellSize + cellSize / 2;

            // Map grid position onto subject bounding frame
            const normX = (posX - destX) / drawW;
            const normY = (posY - destY) / drawH;

            if (normX < 0 || normX >= 1 || normY < 0 || normY >= 1) continue;

            const sx = Math.floor(normX * sampleW);
            const sy = Math.floor(normY * sampleH);
            const sIdx = (sy * sampleW + sx) * 4;

            const pr = sampleData[sIdx];
            const pg = sampleData[sIdx + 1];
            const pb = sampleData[sIdx + 2];
            const pa = sampleData[sIdx + 3] / 255;
            const lum = (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255;

            // Skip white/empty outer space
            if (pa < 0.1 || lum > 0.93) continue;

            // Calculate distance to decrypt pointer
            const dist = Math.hypot(posX - p.x, posY - p.y);
            const effRadius = radius * p.active;

            // Soft visibility factor for glyphs (fades smoothly away near cursor, no abrupt cut)
            let glyphAlpha = 1;
            if (p.active > 0.005) {
              if (dist < effRadius * 0.5) {
                // Fully revealed photo area -> hide cipher
                continue;
              } else if (dist < effRadius) {
                // Feathered transition zone
                const factor = (dist - effRadius * 0.5) / (effRadius * 0.5);
                glyphAlpha = Math.pow(factor, 1.4);
              }
            }

            // Pseudo-random character selection
            const hash = Math.sin(c * 12.9898 + r * 78.233 + Math.floor(tSec)) * 43758.5453;
            const charIdx = Math.floor(Math.abs(hash) % charsLen);
            const char = chars[charIdx];

            // Dark high-contrast ink monochrome text matching luminance
            const darkness = 1 - lum;
            const finalAlpha = Math.min(1, darkness * 1.35) * glyphAlpha;
            
            if (finalAlpha <= 0.02) continue;

            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(23, 25, 28, ${finalAlpha})`;
            ctx.globalAlpha = finalAlpha;

            ctx.fillText(char, posX, posY);
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      rectCache.destroy();
    };
  }, [cell, charset, color, imageLoaded, passthrough, radius, scrambleSpeed]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerRef.current.targetX = e.clientX - rect.left;
    pointerRef.current.targetY = e.clientY - rect.top;
    pointerRef.current.targetActive = 1;
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.targetActive = 0;
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none overflow-hidden cursor-default ${className}`}
      style={{ touchAction: "none", ...style }}
    >
      {/* Decrypt Reveal Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none block"
        style={{ width: "100%", height: "100%" }}
      />

      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export default DecryptReveal;
