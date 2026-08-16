"use client";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useContext } from "react";
import { useSpring } from "@react-spring/web";

import { cn } from "@/lib/utils";
import { BentoHoverContext } from "./magnified-bento";

const GLOBE_CONFIG: Omit<COBEOptions, "width" | "height"> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.082, 0.365, 0.988],
  glowColor: [1, 1, 1],
  markers: [],
};

const baseMarkers = [
  { location: [14.5995, 120.9842], size: 0.03 },
  { location: [19.076, 72.8777], size: 0.04 },
  { location: [23.8103, 90.4125], size: 0.03 },
  { location: [30.0444, 31.2357], size: 0.03 },
  { location: [39.9042, 116.4074], size: 0.04 },
  { location: [35.6762, 139.6503], size: 0.04 },
  { location: [-23.5505, -46.6333], size: 0.04 },
  { location: [19.4326, -99.1332], size: 0.04 },
  { location: [40.7128, -74.006], size: 0.04 },
  { location: [34.0522, -118.2437], size: 0.04 },
  { location: [37.7749, -122.4194], size: 0.04 },
  { location: [41.8781, -87.6298], size: 0.03 },
  { location: [51.5074, -0.1278], size: 0.04 },
  { location: [48.8566, 2.3522], size: 0.03 },
  { location: [52.52, 13.405], size: 0.03 },
  { location: [22.3193, 114.1694], size: 0.04 },
  { location: [1.3521, 103.8198], size: 0.04 },
  { location: [4.2105, 101.9758], size: 0.03 },
  { location: [3.139, 101.6869], size: 0.03 },
  { location: [29.7604, -95.3698], size: 0.03 },
  { location: [39.7392, -104.9903], size: 0.03 },
  { location: [41.3851, 2.1734], size: 0.03 },
  { location: [39.4699, -0.3774], size: 0.03 },
  { location: [40.4168, -3.7038], size: 0.03 },
  { location: [42.8333, 12.8333], size: 0.03 },
  { location: [41.9028, 12.4964], size: 0.03 },
  { location: [34.6937, 135.5022], size: 0.03 },
  { location: [35.0116, 135.7681], size: 0.03 },
];

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: Omit<COBEOptions, "width" | "height">;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const isHovered = useContext(BentoHoverContext);
  const isHoveredRef = useRef(isHovered);
  
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let animationFrameId: number;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    let t = 0;
    const render = () => {
      if (isHoveredRef.current || pointerInteracting.current !== null) {
        t += 0.02;
        if (!pointerInteracting.current) phi += 0.005;
      }
      
      const pulsingMarkers = baseMarkers.map((marker, i) => ({
        location: marker.location as [number, number],
        size: marker.size * (0.6 + 0.4 * Math.sin(t + i * 1.3)),
      }));

      globe.update({
        phi: phi + r.get(),
        width: width * 2,
        height: width * 2,
        markers: pulsingMarkers,
      });
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, [r, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 ease-in-out cursor-grab",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
