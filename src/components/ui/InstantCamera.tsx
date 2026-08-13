import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";

import cameraModelImage from "../../assets/camera model.webp";
import pixelCatsImage from "../../assets/pixel-cats 2.webp";

export function InstantCamera() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger effect ONCE when the section enters view (25% in view)
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.25,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[520px] mx-auto flex flex-col items-center justify-start pt-4 pb-24"
    >
      <div className="relative w-full flex flex-col items-center justify-start">
        {/* Photo Card - Positioned behind camera exit slot, slides out ~32px past camera bottom and remains fixed */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={
            isInView
              ? { y: 174, opacity: 1, rotate: [0, -1.5, 0] }
              : { y: 0, opacity: 0 }
          }
          transition={{
            duration: 2.8,
            ease: [0.25, 0.1, 0.25, 1], // Smooth steady printer mechanism motion
            opacity: { duration: 0.8, ease: "easeOut" },
          }}
          className="absolute top-[180px] sm:top-[215px] z-10 pointer-events-auto origin-top flex justify-center"
        >
          <Link to="/contact" className="block group">
            <div className="w-[220px] sm:w-[260px] bg-white p-3.5 sm:p-4 pb-7 shadow-[0_18px_40px_rgba(0,0,0,0.18)] rounded-xs border border-neutral-200/90 flex flex-col group-hover:scale-[1.03] transition-transform duration-300">
              <div className="w-full h-[190px] sm:h-[225px] bg-neutral-100 flex items-center justify-center mb-3 relative overflow-hidden border border-neutral-200/60 rounded-xs">
                <img
                  src={pixelCatsImage}
                  alt="Let's Fika!"
                  className="w-full h-full object-cover select-none"
                />
                {/* Glossy sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
              <div className="flex flex-col items-center justify-center relative mt-0.5">
                <div
                  className="flex items-center gap-1.5 justify-center w-full"
                  style={{ fontFamily: '"Press Start 2P", monospace' }}
                >
                  <span className="text-[#e26d66] text-[11px] sm:text-[12px] leading-none">♥</span>
                  <span className="text-[#3b2a25] text-[11px] sm:text-[12px] leading-none tracking-tight">LET'S FIKA!</span>
                  <span className="text-[#e26d66] text-[11px] sm:text-[12px] leading-none">♥</span>
                </div>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-400 font-sans normal-case tracking-normal opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Click to contact
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Camera Asset Image - Foreground (z-20) */}
        <div className="relative z-20 w-[400px] sm:w-[480px] drop-shadow-2xl pointer-events-none select-none">
          <img
            src={cameraModelImage}
            alt="Instant Camera"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}



