import { motion } from "motion/react";
import photo1 from "../../assets/Photo 1.jpg";
import photo2 from "../../assets/Photo 2.jpg";
import photo3 from "../../assets/Photo 3.jpg";
import photo4 from "../../assets/Photo 4.jpg";
import photo5 from "../../assets/Photo 5.jpeg";
import photo6 from "../../assets/Photo 6.jpg";

const photos = [
  { id: 1, url: photo1, style: { left: "2%", top: "10%" }, rotation: -12, maxW: "w-[180px] md:w-[220px]" },
  { id: 2, url: photo2, style: { left: "8%", top: "50%" }, rotation: 8, maxW: "w-[240px] md:w-[280px]" },
  { id: 3, url: photo3, style: { left: "15%", top: "75%" }, rotation: -5, maxW: "w-[160px] md:w-[200px]" },
  { id: 4, url: photo4, style: { right: "2%", top: "10%" }, rotation: 15, maxW: "w-[220px] md:w-[260px]" },
  { id: 5, url: photo5, style: { right: "10%", top: "55%" }, rotation: -8, maxW: "w-[260px] md:w-[300px]" },
  { id: 6, url: photo6, style: { right: "4%", top: "80%" }, rotation: 10, maxW: "w-[200px] md:w-[240px]" },
];

const stickers = [
  { id: 1, text: "Pets", color: "#7AA474", style: { left: "62%", top: "45%" }, rotation: -8 },
  { id: 2, text: "Coffee++", color: "#71A5C1", style: { left: "25%", top: "35%" }, rotation: -15 },
  { id: 3, text: "Curious", color: "#DA7C7C", style: { right: "8%", top: "35%" }, rotation: 25 },
  { id: 4, text: "Moments", color: "#FFAB00", style: { left: "45%", top: "20%" }, rotation: 10 },
];

export function FloatingScrapbook() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* SVG Definitions for the sticker effects */}
      {stickers.map((sticker) => (
        <svg key={`def-${sticker.id}`} width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <filter id={`sticker-effect-${sticker.id}`} x="-20%" y="-20%" width="140%" height="140%">
              {/* Colored Background */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="5.5" result="blur1" />
              <feComponentTransfer in="blur1" result="bgAlpha">
                <feFuncA type="linear" slope="20" intercept="-0.5" />
              </feComponentTransfer>
              <feFlood floodColor={sticker.color} result="bgColor" />
              <feComposite in="bgColor" in2="bgAlpha" operator="in" result="bgOut" />

              {/* Drop shadow */}
              <feDropShadow in="bgOut" dx="0" dy="6" stdDeviation="4" floodOpacity="0.25" result="shadow" />

              {/* Merge them all */}
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="bgOut" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      ))}

      {photos.map((photo, i) => (
        <motion.div
          key={`photo-${photo.id}`}
          drag
          dragMomentum={false}
          className={`absolute h-fit bg-white p-3 pb-10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing pointer-events-auto flex flex-col justify-center items-center ${photo.maxW}`}
          style={{ ...photo.style }}
          initial={{ rotate: photo.rotation }}
          whileHover={{ scale: 1.05, zIndex: 40 }}
          whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0 }}
        >
          <img src={photo.url} alt={`Scrapbook ${i}`} className="w-full h-auto object-cover select-none pointer-events-none border border-neutral-100" />
        </motion.div>
      ))}

      {stickers.map((sticker) => (
        <motion.div
          key={`sticker-${sticker.id}`}
          drag
          dragMomentum={false}
          className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{ ...sticker.style }}
          initial={{ rotate: sticker.rotation }}
          whileHover={{ scale: 1.1, zIndex: 40 }}
          whileDrag={{ scale: 1.2, zIndex: 50, rotate: 0 }}
        >
          <div className="p-6 pointer-events-none" style={{ filter: `url(#sticker-effect-${sticker.id})` }}>
            <span className="inline-block text-2xl lg:text-3xl font-medium font-serif tracking-tight whitespace-nowrap text-white select-none">
              {sticker.text}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
