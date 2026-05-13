import { motion } from "motion/react";
import photo1 from "../../assets/Photo 1.jpg";
import photo2 from "../../assets/Photo 2.webp";
import photo3 from "../../assets/Photo 3.webp";
import photo4 from "../../assets/Photo 4.webp";
import photo5 from "../../assets/Photo 5.webp";
import photo6 from "../../assets/Photo 6.webp";

import sticker1 from "../../assets/Sticker 1.webp";
import sticker2 from "../../assets/Sticker 2.webp";
import sticker3 from "../../assets/Sticker 3.webp";
import sticker4 from "../../assets/Sticker 4.webp";
import sticker5 from "../../assets/Sticker 5.webp";
import sticker6 from "../../assets/Sticker 6.webp";

const photos = [
  { id: 1, url: photo1, style: { left: "2%", top: "10%" }, rotation: -12, maxW: "w-[180px] md:w-[220px]" },
  { id: 2, url: photo2, style: { left: "8%", top: "50%" }, rotation: 8, maxW: "w-[240px] md:w-[280px]" },
  { id: 3, url: photo3, style: { left: "15%", top: "75%" }, rotation: -5, maxW: "w-[160px] md:w-[200px]" },
  { id: 4, url: photo4, style: { right: "2%", top: "10%" }, rotation: 15, maxW: "w-[220px] md:w-[260px]" },
  { id: 5, url: photo5, style: { right: "10%", top: "55%" }, rotation: -8, maxW: "w-[260px] md:w-[300px]" },
  { id: 6, url: photo6, style: { right: "4%", top: "80%" }, rotation: 10, maxW: "w-[200px] md:w-[240px]" },
];

const stickers = [
  { id: 1, url: sticker1, style: { left: "62%", top: "45%" }, rotation: -8, maxW: "w-[64px] h-[64px]" },
  { id: 2, url: sticker2, style: { left: "25%", top: "35%" }, rotation: -15, maxW: "w-[64px] h-[64px]" },
  { id: 3, url: sticker3, style: { right: "8%", top: "35%" }, rotation: 25, maxW: "w-[64px] h-[64px]" },
  { id: 4, url: sticker4, style: { left: "45%", top: "20%" }, rotation: 10, maxW: "w-[64px] h-[64px]" },
  { id: 5, url: sticker5, style: { left: "12%", top: "60%" }, rotation: -12, maxW: "w-[64px] h-[64px]" },
  { id: 6, url: sticker6, style: { right: "15%", top: "65%" }, rotation: 18, maxW: "w-[64px] h-[64px]" },
];

export function FloatingScrapbook() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
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
          className={`absolute cursor-grab active:cursor-grabbing pointer-events-auto ${sticker.maxW}`}
          style={{ ...sticker.style }}
          initial={{ rotate: sticker.rotation }}
          whileHover={{ scale: 1.1, zIndex: 40 }}
          whileDrag={{ scale: 1.2, zIndex: 50, rotate: 0 }}
        >
          <img src={sticker.url} alt={`Sticker ${sticker.id}`} className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-md" />
        </motion.div>
      ))}
    </div>
  );
}
