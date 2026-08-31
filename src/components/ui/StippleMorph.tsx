import React, { useEffect, useRef, useState } from "react";

export interface StippleMorphProps {
  imageSrc?: string;
  className?: string;
  width?: number;
  height?: number;
  dotColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  maxParticles?: number;
  repulsionRadius?: number;
  repulsionForce?: number;
  springStiffness?: number;
  damping?: number;
  invertLuminance?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  randomPhase: number;
}

export function StippleMorph({
  imageSrc = "/contact/me.webp",
  className = "",
  width = 440,
  height = 480,
  dotColor = "#17191c",
  accentColor = "#2F5BF9",
  backgroundColor = "transparent",
  maxParticles = 2400,
  repulsionRadius = 80,
  repulsionForce = 6,
  springStiffness = 0.045,
  damping = 0.86,
  invertLuminance = false,
}: StippleMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -9999,
    y: -9999,
    isInside: false,
  });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      if (!isMounted) return;

      // 1. Scan the raw image to detect the subject's actual bounding box (head to torso)
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

          // Subject detection: non-transparent and non-pure-white pixels
          if (a > 0.15 && lum < 0.94) {
            if (px < minX) minX = px;
            if (px > maxX) maxX = px;
            if (py < minY) minY = py;
            if (py > maxY) maxY = py;
            foundSubject = true;
          }
        }
      }

      // Crop tightly around the subject with minimal top padding so the head touches the top edge
      let srcX = 0;
      let srcY = 0;
      let srcW = rawW;
      let srcH = rawH;

      if (foundSubject && maxX > minX && maxY > minY) {
        const padX = (maxX - minX) * 0.06;
        const padTop = (maxY - minY) * 0.015; // Very small top padding so head aligns right to the top
        const padBottom = (maxY - minY) * 0.04;

        srcX = Math.max(0, minX - padX);
        srcY = Math.max(0, minY - padTop);
        srcW = Math.min(rawW - srcX, maxX - minX + padX * 2);
        srcH = Math.min(rawH - srcY, maxY - minY + padTop + padBottom);
      }

      // 2. Render cropped subject onto target dimensions (anchored top)
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const targetW = width;
      const targetH = height;
      offscreen.width = targetW;
      offscreen.height = targetH;

      const subjectAspect = srcW / srcH;
      const targetAspect = targetW / targetH;

      let drawW = targetW;
      let drawH = targetH;
      let destX = 0;
      let destY = 0;

      if (subjectAspect > targetAspect) {
        drawW = targetW;
        drawH = targetW / subjectAspect;
        destX = 0;
        destY = 0; // Top anchored
      } else {
        drawH = targetH;
        drawW = targetH * subjectAspect;
        destX = (targetW - drawW) / 2; // Horizontally centered
        destY = 0; // Top anchored
      }

      offCtx.clearRect(0, 0, targetW, targetH);
      offCtx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, drawW, drawH);

      try {
        setPhotoUrl(offscreen.toDataURL());
      } catch {
        setPhotoUrl(imageSrc);
      }

      const imgData = offCtx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      // Extract high quality stipple points based on luminance & density sampling
      const candidatePoints: { x: number; y: number; lum: number; alpha: number }[] = [];
      const step = 4; // grid step size for dense sampling

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const idx = (y * targetW + x) * 4;
          const a = data[idx + 3] / 255;
          if (a < 0.15) continue; // transparent pixel

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Stipple probability: darker areas have higher density in dark-dot mode
          const probability = invertLuminance ? lum : 1 - lum;

          // Add jittered candidates based on density
          if (Math.random() < probability * 0.95 + 0.05) {
            const jitterX = x + (Math.random() - 0.5) * step * 0.9;
            const jitterY = y + (Math.random() - 0.5) * step * 0.9;
            candidatePoints.push({
              x: jitterX,
              y: jitterY,
              lum,
              alpha: a,
            });
          }
        }
      }

      // If candidates exceed maxParticles, randomly sample uniformly
      let sampled = candidatePoints;
      if (candidatePoints.length > maxParticles) {
        sampled = [...candidatePoints]
          .sort(() => Math.random() - 0.5)
          .slice(0, maxParticles);
      }

      // Initialize particles with entry dispersion coordinates
      particlesRef.current = sampled.map((pt) => {
        // Disperse outward from center on entry
        const angle = Math.random() * Math.PI * 2;
        const scatterDist = Math.random() * 250 + 60;
        const startX = pt.x + Math.cos(angle) * scatterDist;
        const startY = pt.y + Math.sin(angle) * scatterDist;

        const baseRad = (1 - pt.lum) * 1.6 + 0.8;

        return {
          x: startX,
          y: startY,
          originX: pt.x,
          originY: pt.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: baseRad,
          baseRadius: baseRad,
          color: dotColor,
          baseAlpha: Math.min(1, pt.alpha * (1.1 - pt.lum * 0.3)),
          alpha: 0,
          randomPhase: Math.random() * Math.PI * 2,
        };
      });

      setIsLoaded(true);
    };

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [imageSrc, width, height, dotColor, maxParticles, invertLuminance]);

  // Main 60fps render & physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse Repulsion Physics
        if (mouse.isInside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius && dist > 0.001) {
            const normX = dx / dist;
            const normY = dy / dist;
            const force = (1 - dist / repulsionRadius) * repulsionForce;

            p.vx += normX * force;
            p.vy += normY * force;
          }
        }

        // 2. Ambient Micro-Breathing
        const breathe = Math.sin(time + p.randomPhase) * 0.35;
        const targetOriginX = p.originX + breathe;
        const targetOriginY = p.originY + breathe * 0.5;

        // 3. Spring Return Force to Origin
        const springX = (targetOriginX - p.x) * springStiffness;
        const springY = (targetOriginY - p.y) * springStiffness;

        p.vx += springX;
        p.vy += springY;

        // 4. Velocity Damping & Position Update
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        // 5. Fade In Transition on Initial Scatter Return
        if (p.alpha < p.baseAlpha) {
          p.alpha = Math.min(p.baseAlpha, p.alpha + 0.025);
        }

        // 6. Dynamic Color / Glow near cursor
        const distToMouse = mouse.isInside ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 9999;
        const isNearMouse = distToMouse < repulsionRadius * 0.9;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isNearMouse) {
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = Math.min(1, p.alpha * 1.3);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
        }

        ctx.fill();
        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    isLoaded,
    width,
    height,
    backgroundColor,
    accentColor,
    repulsionRadius,
    repulsionForce,
    springStiffness,
    damping,
  ]);

  // Pointer event handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;

    mouseRef.current = {
      x: clientX * scaleX,
      y: clientY * scaleY,
      isInside: true,
    };
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    setIsHovered(false);
  };

  // Disperse on click / tap for tactile delight
  const handleClick = () => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const angle = Math.random() * Math.PI * 2;
      const pulseForce = Math.random() * 8 + 3;
      p.vx += Math.cos(angle) * pulseForce;
      p.vy += Math.sin(angle) * pulseForce;
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative select-none overflow-hidden cursor-crosshair group ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* Original Photo Layer (fades in smoothly on hover) */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-0">
        <img
          src={photoUrl || imageSrc}
          alt="Portrait"
          className={`w-full h-full object-contain transition-all duration-500 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
          }`}
        />
      </div>

      {/* Stipple Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={`relative z-10 w-full h-full object-contain pointer-events-none block transition-opacity duration-500 ease-out ${
          isHovered ? "opacity-40" : "opacity-100"
        }`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default StippleMorph;
