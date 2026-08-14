import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Sparkle, LayersArrowUp, Handshake, Shapes } from "lucide-react";
import SplitText from "../ui/SplitText";
import LetterSwapForward from "../ui/text/letter-swap-forward-anim";
import BorderGlow from "../ui/BorderGlow";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";

const cards = [
  {
    id: 1,
    title: "Curious",
    description: "Always explore beyond the obvious.",
    icon: Sparkle,
    rotate: -12,
    x: "-45%",
    y: 20,
  },
  {
    id: 2,
    title: "Resilient",
    description: "Find alternatives. Keep moving forward.",
    icon: LayersArrowUp,
    rotate: -4,
    x: "-15%",
    y: -10,
  },
  {
    id: 3,
    title: "Collaborative",
    description: "Bridge perspectives. Build together.",
    icon: Handshake,
    rotate: 6,
    x: "15%",
    y: 5,
  },
  {
    id: 4,
    title: "Reflective",
    description: "Learn, question, improve continuously.",
    icon: Shapes,
    rotate: 14,
    x: "45%",
    y: 25,
  },
];

export function HeroSection() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 640) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    check();
    setIsReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isReady) return <div className="w-full min-h-screen bg-neutral-50" />;

  return <HeroSequence deviceType={deviceType} key={deviceType} />;
}

function ScrollCard({ card, scrollYProgress, index, target, initialPos, deviceType }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useTransform(scrollYProgress, [0.2, 0.8], [initialPos ? initialPos.x : card.x, target.x]);
  const y = useTransform(scrollYProgress, [0.2, 0.8], [initialPos ? initialPos.y : card.y, target.y]);
  const rotateZ = useTransform(scrollYProgress, [0.2, 0.8], [card.rotate, 0]);

  const Icon = card.icon;

  return (
    <motion.div
      style={{
        x,
        y,
        rotateZ,
        zIndex: isHovered ? 50 : index * 10,
      }}
      className="absolute w-[140px] h-[190px] sm:w-[170px] sm:h-[220px] md:w-[200px] md:h-[260px] lg:w-[240px] lg:h-[310px] origin-bottom perspective-1000"
      onMouseEnter={deviceType === "desktop" ? () => setIsHovered(true) : undefined}
      onMouseLeave={deviceType === "desktop" ? () => setIsHovered(false) : undefined}
      onClick={deviceType !== "desktop" ? () => setIsHovered(!isHovered) : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3 + index * 0.1,
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <motion.div
          className="w-full h-full relative cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: isHovered ? 180 : 0,
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -15 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-[#F8F8F8] border border-neutral-100 flex flex-col items-center justify-start pt-[56px] sm:pt-16 md:pt-20 lg:pt-24 p-4 md:p-6 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 md:mb-4 text-neutral-800 shrink-0">
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
              {card.title}
            </h3>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <BorderGlow
              borderRadius={32}
              animated
              backgroundColor="#171717"
              className="w-full h-full flex flex-col items-center justify-center text-center"
            >
              <div className="flex flex-col items-center justify-center p-4 md:p-6 text-center h-full w-full">
                <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-200 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            </BorderGlow>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroSequence({ deviceType }: { deviceType: "mobile" | "tablet" | "desktop" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out Hero Text
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Fade out for Tagline (stays slightly longer, fades fully on second screen)



  const desktopTargets = [
    { x: "-165%", y: 150 },
    { x: "-55%", y: 150 },
    { x: "55%", y: 150 },
    { x: "165%", y: 150 },
  ];

  const tabletTargets = [
    { x: "-55%", y: -155 },
    { x: "55%", y: -155 },
    { x: "-55%", y: 155 },
    { x: "55%", y: 155 },
  ];

  const mobileTargets = [
    { x: "-58%", y: -107 },
    { x: "58%", y: -107 },
    { x: "-58%", y: 107 },
    { x: "58%", y: 107 },
  ];

  const mobileInitialOffsets = [
    { x: "-25%", y: 50 },
    { x: "-10%", y: 20 },
    { x: "10%", y: 30 },
    { x: "25%", y: 60 },
  ];

  const tabletInitialOffsets = [
    { x: "-30%", y: 10 },
    { x: "-10%", y: -20 },
    { x: "10%", y: -10 },
    { x: "30%", y: 20 },
  ];

  const targets = deviceType === "mobile" ? mobileTargets : deviceType === "tablet" ? tabletTargets : desktopTargets;

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] md:h-[140vh] lg:h-[200vh]">
      <div className="sticky top-0 w-full h-screen bg-neutral-50 flex items-center justify-center [clip-path:inset(-96px_0_0_0)]">
        
        {/* HERO BACKGROUND */}
        <div className="absolute top-[-96px] left-0 w-full h-[calc(100vh+96px)] z-0 flex pointer-events-auto overflow-hidden">
          <BackgroundRippleEffect 
            rows={deviceType === "mobile" ? 25 : deviceType === "tablet" ? 40 : 60} 
            cols={deviceType === "mobile" ? 20 : deviceType === "tablet" ? 60 : 100} 
            interactive={deviceType === "desktop"} 
          />
        </div>

        {/* HERO CONTENT */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-[92px] md:-mt-[280px] lg:-mt-[80px] z-10"
        >
          <div className="w-full flex flex-col items-center justify-center -mt-[36px]">
            {/* Main Title */}
            <div className="relative w-full pointer-events-auto">
              <h1 className="text-7xl sm:text-[5rem] md:text-[6rem] lg:text-[8.5rem] font-bold tracking-tighter text-neutral-900 leading-[0.8] uppercase text-center w-full px-4 pb-4">
                POFEI
              </h1>
            </div>

            {/* Faded Background Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="w-full text-center px-4 opacity-30 mt-2 md:mt-4 relative -top-[6px] z-10 pointer-events-none"
            >
              <SplitText
                text="Product Designer & AI Builder"
                tag="h2"
                className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-widest text-neutral-300 uppercase leading-[0.8]"
                delay={50}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </motion.div>
          </div>

          <div className="h-[360px] sm:h-[280px] md:h-[320px] lg:h-[350px] w-full" />


        </motion.div>

        {/* CARDS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 -mt-[80px] md:-mt-[140px] lg:mt-[80px]">
          {cards.map((card, idx) => (
            <ScrollCard
              key={card.id}
              card={card}
              index={idx}
              scrollYProgress={scrollYProgress}
              target={targets[idx]}
              initialPos={deviceType === "mobile" ? mobileInitialOffsets[idx] : deviceType === "tablet" ? tabletInitialOffsets[idx] : null}
              deviceType={deviceType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
