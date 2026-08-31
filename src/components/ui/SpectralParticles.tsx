import { useEffect, useRef } from "react";

export interface SpectralParticlesProps {
  className?: string;
  particleCount?: number;
  engine?: "atomic" | "kinetic" | "nebula" | "hypernova";
  colorScheme?: "electric" | "monochrome" | "spectral" | "cyan";
  speed?: number;
  containmentRadius?: number;
  glowIntensity?: number;
  interactive?: boolean;
}

interface AtomicParticle {
  // 3D Orbital Coordinates
  theta: number; // orbital angle
  phi: number; // elevation angle
  radius: number; // base orbital radius
  targetRadius: number; // equilibrium shell radius
  orbitalSpeed: number; // angular velocity
  inclination: number; // orbit tilt plane
  spinAxisX: number;
  spinAxisY: number;

  // Real projected coordinates
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;

  // Physical properties
  vx: number;
  vy: number;
  vz: number;
  charge: number; // -1 to +1
  size: number;
  baseAlpha: number;
  energy: number; // excited state 0 to 1
  color: string;
  glowColor: string;
}

export function SpectralParticles({
  className = "",
  particleCount = 450,
  engine = "atomic",
  colorScheme = "electric",
  speed = 1.0,
  containmentRadius = 320,
  glowIntensity = 1.2,
  interactive = true,
}: SpectralParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Color paletting for 3 specific colors: 1. #F3F7FF, 2. #FF7523, 3. #2F5BF9
    const getParticleColors = (charge: number, energy: number) => {
      if (colorScheme === "monochrome") {
        return {
          core: "rgba(243, 247, 255, 0.95)",
          glow: "rgba(243, 247, 255, 0.35)",
          arc: "rgba(243, 247, 255, 0.25)",
        };
      }
      if (colorScheme === "spectral") {
        const hue = (charge * 60 + energy * 180 + 190) % 360;
        return {
          core: `hsla(${hue}, 90%, 85%, 0.9)`,
          glow: `hsla(${hue}, 80%, 60%, 0.3)`,
          arc: `hsla(${hue}, 85%, 70%, 0.22)`,
        };
      }
      // Tri-color Palette: #F3F7FF (White), #FF7523 (Orange), #2F5BF9 (Blue)
      if (charge > 0.33) {
        return {
          core: "rgba(255, 117, 35, 0.98)", // #FF7523 - Electric Orange
          glow: "rgba(255, 117, 35, 0.45)",
          arc: "rgba(255, 145, 80, 0.35)",
        };
      } else if (charge < -0.33) {
        return {
          core: "rgba(47, 91, 249, 0.98)", // #2F5BF9 - Vivid Sapphire Blue
          glow: "rgba(47, 91, 249, 0.45)",
          arc: "rgba(85, 125, 255, 0.35)",
        };
      } else {
        return {
          core: "rgba(243, 247, 255, 0.98)", // #F3F7FF - Bright Frost White
          glow: "rgba(243, 247, 255, 0.4)",
          arc: "rgba(243, 247, 255, 0.3)",
        };
      }
    };

    // State for mouse interaction & shockwaves
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      speed: 0,
      lastX: width / 2,
      lastY: height / 2,
    };

    const shockwaves: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      life: number;
    }> = [];

    // Initialize Atomic Electron / Ion Particles with wide spatial distribution
    const particles: AtomicParticle[] = [];
    const count = Math.min(particleCount, window.innerWidth < 768 ? 160 : particleCount);

    for (let i = 0; i < count; i++) {
      const charge = (Math.random() - 0.5) * 2;
      const energy = Math.random();
      const shellIndex = i % 6; // 6 discrete expansive atomic shells
      // Wider radial distribution and variance between dots
      const baseR = (containmentRadius * 0.4) + shellIndex * (containmentRadius * 0.28) + (Math.random() - 0.5) * 140;
      const colors = getParticleColors(charge, energy);

      // Random spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const inclination = (Math.random() - 0.5) * Math.PI * 0.95;

      particles.push({
        theta,
        phi,
        radius: baseR,
        targetRadius: baseR,
        orbitalSpeed: ((Math.random() * 0.006 + 0.0025) * (Math.random() > 0.5 ? 1 : -1) * speed) / (shellIndex * 0.3 + 1),
        inclination,
        spinAxisX: Math.cos(inclination),
        spinAxisY: Math.sin(inclination),
        x: width / 2,
        y: height / 2,
        z: 0,
        prevX: width / 2,
        prevY: height / 2,
        vx: 0,
        vy: 0,
        vz: 0,
        charge,
        size: Math.random() * 1.8 + 0.9,
        baseAlpha: Math.random() * 0.5 + 0.45,
        energy,
        color: colors.core,
        glowColor: colors.glow,
      });
    }

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      if (!mouse.isHovered) {
        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Mouse Pointer Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      if (rawX >= -80 && rawX <= width + 80 && rawY >= -80 && rawY <= height + 80) {
        mouse.targetX = Math.max(0, Math.min(width, rawX));
        mouse.targetY = Math.max(0, Math.min(height, rawY));
        mouse.isHovered = true;
      } else {
        mouse.isHovered = false;
        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        shockwaves.push({
          x: clickX,
          y: clickY,
          radius: 10,
          maxRadius: Math.max(width, height) * 0.65,
          strength: 1.0,
          life: 1.0,
        });

        // Excite nearby particles
        particles.forEach((p) => {
          const dx = p.x - clickX;
          const dy = p.y - clickY;
          const dist = Math.hypot(dx, dy);
          if (dist < 400) {
            p.energy = 1.0;
            const pushAngle = Math.atan2(dy, dx);
            const force = (1 - dist / 400) * 14;
            p.vx += Math.cos(pushAngle) * force;
            p.vy += Math.sin(pushAngle) * force;
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    // Main Render Loop
    let time = 0;
    const render = () => {
      time += 0.016 * speed;

      // Smooth mouse center tracking with gentle, cinematic elastic dampening
      const lerpSpeed = mouse.isHovered ? 0.035 : 0.018;
      mouse.x += (mouse.targetX - mouse.x) * lerpSpeed;
      mouse.y += (mouse.targetY - mouse.y) * lerpSpeed;

      const mouseDeltaX = mouse.x - mouse.lastX;
      const mouseDeltaY = mouse.y - mouse.lastY;
      mouse.speed = Math.hypot(mouseDeltaX, mouseDeltaY);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Clear with subtle accumulation for soft light rendering
      ctx.clearRect(0, 0, width, height);

      // Render & Update Active Shockwaves
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += (sw.maxRadius - sw.radius) * 0.05 + 2;
        sw.life -= 0.02;

        if (sw.life <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(sIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 220, 255, ${sw.life * 0.35 * sw.strength})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const centerX = mouse.x;
      const centerY = mouse.y;

      // Update Particle Physics & Positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Quantum Orbital Motion
        p.theta += p.orbitalSpeed * (1 + p.energy * 0.8);
        p.phi += p.orbitalSpeed * 0.3;

        // 2. High-frequency Electric Jitter (Gentle micro-discharges)
        const jitterFreq = time * 3.2 + i;
        const electricJitterX = Math.sin(jitterFreq * 3.7) * (0.6 + p.energy * 1.6);
        const electricJitterY = Math.cos(jitterFreq * 4.3) * (0.6 + p.energy * 1.6);
        const electricJitterZ = Math.sin(jitterFreq * 2.9) * (0.6 + p.energy * 1.6);

        // 3. Containment Physics (Harmonic Spring Force to Orbital Shell)
        // Calculate 3D sphere coordinate rotated around inclination
        const r = p.radius + Math.sin(time * 1.2 + i * 0.5) * 10 * (1 + p.energy);
        const raw3DX = r * Math.sin(p.phi) * Math.cos(p.theta);
        const raw3DY = r * Math.sin(p.phi) * Math.sin(p.theta);
        const raw3DZ = r * Math.cos(p.phi);

        // 3D Rotation Matrix for Orbit Tilt
        const cosInc = Math.cos(p.inclination + time * 0.04);
        const sinInc = Math.sin(p.inclination + time * 0.04);
        const rotX = raw3DX;
        const rotY = raw3DY * cosInc - raw3DZ * sinInc;
        const rotZ = raw3DY * sinInc + raw3DZ * cosInc;

        // 4. Perspective Projection
        const fov = 600;
        const scale = fov / (fov + rotZ);
        const targetProjX = centerX + (rotX + electricJitterX) * scale;
        const targetProjY = centerY + (rotY + electricJitterY) * scale;

        // 5. Velocity & Momentum dampening (gentle, floating response)
        p.vx = (targetProjX - p.x) * 0.055 + p.vx * 0.88;
        p.vy = (targetProjY - p.y) * 0.055 + p.vy * 0.88;

        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.z = rotZ;

        // Cool down excited state
        if (p.energy > 0.05) {
          p.energy *= 0.96;
        }

        // Mouse proximity excitation
        if (mouse.isHovered && mouse.speed > 1.5) {
          const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distToMouse < containmentRadius * 0.7) {
            p.energy = Math.min(1.0, p.energy + (1 - distToMouse / (containmentRadius * 0.7)) * 0.15);
          }
        }
      }

      // Draw Electric Arc Discharges between Close Ionized Pairs
      ctx.globalCompositeOperation = "lighter";

      const arcDistThreshold = window.innerWidth < 768 ? 42 : 55;
      for (let i = 0; i < particles.length; i += 2) {
        const p1 = particles[i];
        for (let j = i + 1; j < Math.min(particles.length, i + 12); j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < arcDistThreshold) {
            const alpha = (1 - dist / arcDistThreshold) * 0.3 * (0.4 + (p1.energy + p2.energy) * 0.6);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            // Add electric jagged midpoint
            if (dist > 15 && (p1.energy > 0.3 || p2.energy > 0.3)) {
              const midX = (p1.x + p2.x) * 0.5 + (Math.random() - 0.5) * 6;
              const midY = (p1.y + p2.y) * 0.5 + (Math.random() - 0.5) * 6;
              ctx.lineTo(midX, midY);
            }

            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(130, 225, 255, ${alpha * glowIntensity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw Individual Particles (Core & Luminous Halo)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const depthAlpha = Math.max(0.15, (p.z + containmentRadius) / (containmentRadius * 2));
        const finalAlpha = Math.min(1.0, p.baseAlpha * depthAlpha * (1 + p.energy * 0.8));
        const renderSize = Math.max(0.6, p.size * (0.85 + (p.z / containmentRadius) * 0.3) * (1 + p.energy * 0.4));

        // 1. Soft Ambient Halo Glow
        const haloRadius = renderSize * (3.5 + p.energy * 3);
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloRadius);
        glowGrad.addColorStop(0, p.glowColor.replace(/[\d.]+\)$/, `${finalAlpha * 0.6 * glowIntensity})`));
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. High-energy Sharp Core
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${finalAlpha})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, renderSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [particleCount, engine, colorScheme, speed, containmentRadius, glowIntensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}

export default SpectralParticles;
