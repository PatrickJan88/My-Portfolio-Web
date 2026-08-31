import { useEffect, useRef } from "react";

interface AsciiFlowTrailProps {
  className?: string;
  charSet?: string;
  particleCount?: number;
  trailLife?: number;
  fontSize?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  charIdx: number;
  angle: number;
  speed: number;
  intensity: number;
}

export function AsciiFlowTrail({
  className = "",
  charSet = " .·:;+*#%@█",
  trailLife = 45,
  fontSize = 13,
  color = "rgba(255, 255, 255, ",
}: AsciiFlowTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const maxParticles = 240;

    let mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      isMoving: false,
      lastMoveTime: 0,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Track mouse / touch position relative to the canvas
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const currentX = clientX - rect.left;
      const currentY = clientY - rect.top;

      // Only process if within or reasonably near the container
      if (
        currentX < -50 ||
        currentX > width + 50 ||
        currentY < -50 ||
        currentY > height + 50
      ) {
        return;
      }

      const now = performance.now();
      const dt = Math.max(1, now - (mouse.lastMoveTime || now));

      const vx = ((currentX - (mouse.prevX === -1000 ? currentX : mouse.prevX)) / dt) * 16;
      const vy = ((currentY - (mouse.prevY === -1000 ? currentY : mouse.prevY)) / dt) * 16;

      mouse.prevX = mouse.x === -1000 ? currentX : mouse.x;
      mouse.prevY = mouse.y === -1000 ? currentY : mouse.y;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.vx = vx;
      mouse.vy = vy;
      mouse.isMoving = true;
      mouse.lastMoveTime = now;

      // Calculate speed
      const speed = Math.hypot(vx, vy);
      const spawnCount = Math.min(6, Math.max(1, Math.floor(speed * 0.4)));

      // Spawn particles along the motion vector
      for (let i = 0; i < spawnCount; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }

        const progress = i / spawnCount;
        const interpX = mouse.prevX + (mouse.x - mouse.prevX) * progress;
        const interpY = mouse.prevY + (mouse.y - mouse.prevY) * progress;

        const angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.2;
        const pSpeed = (Math.random() * 0.6 + 0.4) * (speed * 0.25 + 1.5);
        const life = trailLife * (0.7 + Math.random() * 0.6);

        particles.push({
          x: interpX + (Math.random() - 0.5) * 16,
          y: interpY + (Math.random() - 0.5) * 16,
          vx: Math.cos(angle) * pSpeed * 0.35 + (Math.random() - 0.5) * 0.8,
          vy: Math.sin(angle) * pSpeed * 0.35 + (Math.random() - 0.5) * 0.8,
          life,
          maxLife: life,
          size: fontSize * (0.85 + Math.random() * 0.35),
          charIdx: Math.floor(Math.random() * charSet.length),
          angle: Math.random() * Math.PI * 2,
          speed: pSpeed,
          intensity: Math.min(1, speed / 15 + 0.3),
        });
      }
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;

      ctx.clearRect(0, 0, width, height);

      // Render & update active flow particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Fluid flow turbulence using curl simulation
        const noiseAngle =
          Math.sin(p.x * 0.008 + time) * 2 + Math.cos(p.y * 0.008 + time) * 2;
        p.vx += Math.cos(noiseAngle) * 0.08;
        p.vy += Math.sin(noiseAngle) * 0.08;

        // Apply friction & update position
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.45 * p.intensity;

        // Select character mapped to density/life
        const charStep = Math.min(
          charSet.length - 1,
          Math.floor((1 - lifeRatio) * (charSet.length - 1) * 0.9 + (p.charIdx % 3))
        );
        const char = charSet[charStep] || charSet[0];

        ctx.font = `600 ${p.size}px 'Space Grotesk', 'Courier New', monospace`;
        ctx.fillStyle = `${color}${Math.max(0.02, alpha)})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(char, p.x, p.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [charSet, trailLife, fontSize, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 ${className}`}
    />
  );
}

export default AsciiFlowTrail;
