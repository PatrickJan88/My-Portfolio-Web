import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AutoCarouselProps {
  images: string[];
  interval?: number;
}

export default function AutoCarousel({ images, interval = 3000 }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      {/* Invisible static image to give natural height to container if parent uses aspect-auto */}
      <img src={images[0]} alt="" className="w-full h-auto invisible" />
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover sm:object-contain md:object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
