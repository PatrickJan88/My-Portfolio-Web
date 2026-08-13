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

const photos = [
  { id: 1, url: photo1, classes: "-left-16 md:left-[5%] top-[5%]", rotation: -12, maxW: "w-[140px] md:w-[170px]" },
  { id: 2, url: photo2, classes: "-left-20 md:left-[12%] top-[45%]", rotation: -8, maxW: "w-[160px] md:w-[200px]" },
  { id: 3, url: photo3, classes: "-left-4 md:left-[26%] top-[78%]", rotation: 6, maxW: "w-[130px] md:w-[160px]" },
  { id: 4, url: photo4, classes: "-right-12 md:right-[5%] top-[5%]", rotation: 12, maxW: "w-[150px] md:w-[180px]" },
  { id: 5, url: photo5, classes: "-right-24 md:right-[12%] top-[42%]", rotation: -10, maxW: "w-[160px] md:w-[190px]" },
  { id: 6, url: photo6, classes: "-right-8 md:right-[20%] top-[80%]", rotation: -5, maxW: "w-[150px] md:w-[180px]" },
];

const stickers = [
  { id: 1, url: sticker1, classes: "left-[32%] top-[25%]", rotation: -8, maxW: "w-[40px] h-[40px] md:w-[50px] md:h-[50px]" },
  { id: 2, url: sticker2, classes: "left-[15%] top-[62%]", rotation: 12, maxW: "w-[48px] h-[48px] md:w-[56px] md:h-[56px]" },
  { id: 3, url: sticker3, classes: "left-[38%] top-[85%]", rotation: -15, maxW: "w-[40px] h-[40px] md:w-[50px] md:h-[50px]" },
  { id: 4, url: sticker4, classes: "right-[10%] top-[35%]", rotation: 15, maxW: "w-[48px] h-[48px] md:w-[56px] md:h-[56px]" },
  { id: 5, url: sticker5, classes: "right-[25%] top-[65%]", rotation: -12, maxW: "w-[48px] h-[48px] md:w-[56px] md:h-[56px]" },
];

export function FloatingScrapbook() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {photos.map((photo, i) => (
        <motion.div
          key={`photo-${photo.id}`}
          drag
          dragMomentum={false}
          className={`absolute h-fit bg-white p-3 pb-10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing pointer-events-auto flex flex-col justify-center items-center ${photo.maxW} ${photo.classes}`}
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
          className={`absolute cursor-grab active:cursor-grabbing pointer-events-auto ${sticker.maxW} ${sticker.classes}`}
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
