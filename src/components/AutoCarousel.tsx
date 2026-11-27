import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AutoCarouselProps {
  images: string[];
  interval?: number;
  largeControls?: boolean;
  onImageClick?: (src: string) => void;
}

export default function AutoCarousel({
  images,
  interval = 6000,
  largeControls = false,
  onImageClick,
}: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, isHovered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-transparent group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          className={`absolute inset-0 w-full h-full object-cover md:object-contain ${onImageClick ? 'cursor-pointer md:cursor-auto' : ''}`}
          onClick={() => onImageClick?.(images[currentIndex])}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className={
              largeControls
                ? "absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all active:scale-95 cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                : "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            }
            aria-label="Previous image"
          >
            {largeControls ? (
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <ChevronLeft size={28} className="md:w-6 md:h-6" />
            )}
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className={
              largeControls
                ? "absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all active:scale-95 cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                : "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 md:p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            }
            aria-label="Next image"
          >
            {largeControls ? (
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <ChevronRight size={28} className="md:w-6 md:h-6" />
            )}
          </button>

          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex z-10 ${
              largeControls ? "items-center gap-1" : "space-x-2"
            }`}
          >
            {images.map((_, index) =>
              largeControls ? (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className="p-2 flex items-center justify-center cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span
                    className={`block h-2.5 md:h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-6 md:w-7 bg-white"
                        : "w-2.5 md:w-3 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-white/50 ${
                    index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
