import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

import pixelCatsImage from "../../assets/pixel-cats 2.webp";

const photos = [pixelCatsImage];

export function InstantCamera() {
  const [isPrinted, setIsPrinted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(photos[0]);

  useEffect(() => {
    // Pick a random photo on mount
    setCurrentPhoto(photos[Math.floor(Math.random() * photos.length)]);
  }, []);

  const handleShutterClick = () => {
    if (isPrinted) return; // Don't print twice
    
    // Trigger Flash
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 200);

    // Trigger Print
    setIsPrinted(true);
  };

  return (
    <div className="relative w-full max-w-[320px] mx-auto flex flex-col items-center justify-center py-2 pb-0">
      {/* Flash Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 filter drop-shadow-xl flex flex-col items-center">
        {/* Shutter Button wrapper to maintain a stable hit area */}
        <button
          onClick={handleShutterClick}
          disabled={isPrinted}
          className={`absolute -top-6 right-6 w-16 h-10 z-0 focus:outline-none group ${
            isPrinted ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Take photo"
        >
          <div
            className={`absolute bottom-2 left-2 w-12 h-6 bg-red-500 rounded-t-lg transition-all duration-150 origin-bottom ${
              isPrinted ? "opacity-50" : "group-hover:bg-red-400 group-active:scale-y-50 group-active:translate-y-[2px]"
            }`}
          />
        </button>

        {/* Viewfinder block */}
        <div className="absolute -top-6 left-12 w-16 h-8 bg-neutral-200 rounded-t-lg z-0" />

        {/* Camera Body */}
        <div className="w-64 h-48 bg-[#F4F4F5] rounded-3xl p-4 relative z-10 shadow-[inset_0_-8px_12px_rgba(0,0,0,0.1),_0_20px_25px_-5px_rgba(0,0,0,0.1)] border-b-4 border-neutral-300">
          
          {/* Flash Bulb */}
          <div className="absolute top-6 left-6 w-10 h-8 bg-neutral-800 rounded flex items-center justify-center shadow-inner">
            <div className="w-8 h-4 bg-yellow-100/80 rounded-sm" />
          </div>

          {/* Rainbow Stripe (Classic Polaroid vibe) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-32 flex flex-col rounded overflow-hidden opacity-80">
            <div className="flex-1 bg-red-500" />
            <div className="flex-1 bg-orange-400" />
            <div className="flex-1 bg-yellow-400" />
            <div className="flex-1 bg-green-500" />
            <div className="flex-1 bg-blue-500" />
          </div>

          {/* Lens */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-neutral-800 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.3)] border-4 border-neutral-700">
            <div className="w-20 h-20 bg-neutral-900 rounded-full border border-neutral-700 relative overflow-hidden">
              {/* Lens Reflections */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-white/20 rounded-full blur-[2px]" />
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black/50" />
            </div>
          </div>

          {/* Photo Mask Container */}
          <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-[240px] h-[320px] overflow-hidden z-20 pointer-events-none flex flex-col items-center justify-start pt-1">
            {/* The Printed Photo */}
            <motion.div
              className="pointer-events-auto origin-top"
              initial={{ y: -300 }}
              animate={
                isPrinted
                  ? { y: 0, rotate: [-2, 3, -1, 0] }
                  : { y: -300 }
              }
              transition={{
                y: { type: "spring", stiffness: 100, damping: 15 },
                rotate: { duration: 1.5, ease: "easeInOut", delay: 0.1 }
              }}
            >
              <Link to="/contact" className="block group">
                <div className="w-[180px] h-[220px] bg-white p-3 pb-8 shadow-xl rounded-sm border border-neutral-200 flex flex-col group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-full flex-1 bg-neutral-100 flex items-center justify-center mb-4 relative overflow-hidden border border-neutral-200">
                    <img 
                      src={currentPhoto} 
                      alt="Captured Memory" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Photo Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                  <div className="flex flex-col items-center justify-center relative mt-1">
                    <div className="flex items-center gap-[6px] justify-center w-full" style={{ fontFamily: '"Press Start 2P", monospace', display: 'flex', alignItems: 'center' }}>
                      <span className="text-[#e26d66] text-[10px] leading-none mb-0.5">♥</span>
                      <span className="text-[#3b2a25] text-[10px] leading-none tracking-tight pt-[1px]">LET'S FIKA!</span>
                      <span className="text-[#e26d66] text-[10px] leading-none mb-0.5">♥</span>
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-neutral-400 font-sans normal-case tracking-normal opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Click to contact
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Output Slot (Bottom lip covering the photo) */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 h-3 bg-neutral-800 rounded-lg shadow-inner z-30" />
        </div>
      </div>
    </div>
  );
}
