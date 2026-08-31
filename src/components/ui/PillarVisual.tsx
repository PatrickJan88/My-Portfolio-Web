import { motion } from "motion/react";

export interface PillarMedia {
  type?: "image" | "video";
  src: string;
  alt?: string;
}

interface PillarVisualProps {
  index: number;
  media?: PillarMedia;
}

export function PillarVisual({ index, media }: PillarVisualProps) {
  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center select-none rounded-[32px] overflow-hidden bg-transparent">
      
      {/* 1. Custom User Media (Video or Image) seamlessly embedded without border or shadow */}
      {media?.src ? (
        <motion.div
          key={media.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center rounded-[32px] overflow-hidden"
        >
          {media.type === "video" ? (
            <video
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none rounded-[32px]"
            />
          ) : (
            <img
              src={media.src}
              alt={media.alt || `Pillar visual ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none rounded-[32px]"
              referrerPolicy="no-referrer"
            />
          )}
        </motion.div>
      ) : (
        /* 2. Default Visuals */
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* 01: 3D Orbital Sphere & Satellite (matching reference screenshot) */}
          {index === 0 && (
            <motion.div
              key="visual-sphere"
              initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.88, rotate: 6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Subtle ambient drop glow */}
              <div className="absolute w-56 h-56 bg-black/40 rounded-full blur-2xl transform translate-y-6" />

              <svg
                viewBox="0 0 400 400"
                className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                fill="none"
              >
                <defs>
                  {/* Primary Large Sphere 3D Metallic Gradient */}
                  <radialGradient id="mainSphereGrad" cx="38%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#9da0a8" />
                    <stop offset="25%" stopColor="#767982" />
                    <stop offset="55%" stopColor="#4f525a" />
                    <stop offset="85%" stopColor="#2c2e35" />
                    <stop offset="100%" stopColor="#191a1e" />
                  </radialGradient>

                  {/* Satellite Sphere 3D Metallic Gradient */}
                  <radialGradient id="satSphereGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#a8abb4" />
                    <stop offset="35%" stopColor="#7c7f89" />
                    <stop offset="70%" stopColor="#464850" />
                    <stop offset="100%" stopColor="#222328" />
                  </radialGradient>

                  {/* Curved Specular Reflection for Main Sphere */}
                  <linearGradient id="mainSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                  </linearGradient>

                  {/* Specular Highlight for Satellite Sphere */}
                  <radialGradient id="satSpecular" cx="35%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Orbit Dashed Trajectory Ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  stroke="#575962"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  opacity="0.6"
                />

                {/* Main Planetary Metallic Sphere */}
                <circle cx="195" cy="205" r="76" fill="url(#mainSphereGrad)" />

                {/* Main Sphere Curved Specular Light Reflection */}
                <path
                  d="M 160 162 C 180 152, 196 166, 186 186 C 172 196, 150 186, 160 162 Z"
                  fill="url(#mainSpecular)"
                  opacity="0.85"
                />

                {/* Orbiting Satellite Sphere on upper right */}
                <g transform="translate(276, 134)">
                  <circle cx="0" cy="0" r="22" fill="url(#satSphereGrad)" />
                  <ellipse cx="-4" cy="-5" rx="5" ry="4" fill="url(#satSpecular)" />
                </g>
              </svg>
            </motion.div>
          )}

          {/* 02: 3D Compass / Prism Visual */}
          {index === 1 && (
            <motion.div
              key="visual-compass"
              initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.88, rotate: 6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute w-56 h-56 bg-black/40 rounded-full blur-2xl transform translate-y-6" />
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                fill="none"
              >
                <defs>
                  <radialGradient id="compassRingDark" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#9da0a8" />
                    <stop offset="45%" stopColor="#686b74" />
                    <stop offset="85%" stopColor="#3b3d45" />
                    <stop offset="100%" stopColor="#22242a" />
                  </radialGradient>
                  <radialGradient id="compassDialDark" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#3a3c44" />
                    <stop offset="65%" stopColor="#26282e" />
                    <stop offset="100%" stopColor="#1a1b1f" />
                  </radialGradient>
                  <linearGradient id="needleLightDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d2d5de" />
                    <stop offset="100%" stopColor="#828590" />
                  </linearGradient>
                  <linearGradient id="needleDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f525a" />
                    <stop offset="100%" stopColor="#27282d" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="115" fill="url(#compassRingDark)" />
                <circle cx="200" cy="200" r="95" fill="url(#compassDialDark)" />
                <polygon points="200,120 216,200 200,200" fill="url(#needleLightDark)" />
                <polygon points="200,120 184,200 200,200" fill="url(#needleDarkGrad)" />
                <polygon points="200,280 216,200 200,200" fill="url(#needleDarkGrad)" />
                <polygon points="200,280 184,200 200,200" fill="url(#needleLightDark)" />
                <circle cx="200" cy="200" r="10" fill="#d2d5de" />
              </svg>
            </motion.div>
          )}

          {/* 03: 3D Intersecting Rings / Torus */}
          {index === 2 && (
            <motion.div
              key="visual-torus"
              initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.88, rotate: 6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute w-56 h-56 bg-black/40 rounded-full blur-2xl transform translate-y-6" />
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                fill="none"
              >
                <defs>
                  <linearGradient id="ringGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a8abb4" />
                    <stop offset="50%" stopColor="#5b5d66" />
                    <stop offset="100%" stopColor="#24252a" />
                  </linearGradient>
                  <linearGradient id="ringGradB" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8d909a" />
                    <stop offset="50%" stopColor="#494b54" />
                    <stop offset="100%" stopColor="#1b1c20" />
                  </linearGradient>
                </defs>
                <ellipse cx="200" cy="180" rx="90" ry="45" stroke="url(#ringGradA)" strokeWidth="18" fill="none" transform="rotate(-20 200 180)" />
                <ellipse cx="200" cy="220" rx="90" ry="45" stroke="url(#ringGradB)" strokeWidth="18" fill="none" transform="rotate(25 200 220)" />
              </svg>
            </motion.div>
          )}

          {/* 04: 3D Crystal / Polyhedron Visual */}
          {index === 3 && (
            <motion.div
              key="visual-crystal"
              initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.88, rotate: 6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute w-56 h-56 bg-black/40 rounded-full blur-2xl transform translate-y-6" />
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                fill="none"
              >
                <defs>
                  <linearGradient id="polyFacetA" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a3a6af" />
                    <stop offset="100%" stopColor="#676a73" />
                  </linearGradient>
                  <linearGradient id="polyFacetB" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#676a73" />
                    <stop offset="100%" stopColor="#3c3e46" />
                  </linearGradient>
                  <linearGradient id="polyFacetC" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3c3e46" />
                    <stop offset="100%" stopColor="#1e1f24" />
                  </linearGradient>
                </defs>
                <polygon points="200,90 280,180 200,210" fill="url(#polyFacetA)" />
                <polygon points="200,90 120,180 200,210" fill="url(#polyFacetB)" />
                <polygon points="120,180 200,310 200,210" fill="url(#polyFacetC)" />
                <polygon points="280,180 200,310 200,210" fill="url(#polyFacetB)" />
              </svg>
            </motion.div>
          )}

        </div>
      )}
    </div>
  );
}

export default PillarVisual;
