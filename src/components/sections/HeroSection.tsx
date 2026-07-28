import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import SplitText from "../ui/SplitText";
import BorderGlow from "../ui/BorderGlow";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";

function StrategyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_4418_9471)">
        <path d="M7.99995 22H15.9999C20.0199 22 20.7399 20.39 20.9499 18.43L21.6999 10.43C21.9699 7.99 21.2699 6 16.9999 6H6.99995C2.72995 6 2.02995 7.99 2.29995 10.43L3.04995 18.43C3.25995 20.39 3.97995 22 7.99995 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.62 11.2695C4.87 12.8095 7.41 13.7395 10 14.0295" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_4418_9471">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function SystemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_4418_7308)">
        <path d="M6.88991 15.7505C6.60991 15.7505 6.34991 15.6005 6.21991 15.3405C6.02991 14.9705 6.17991 14.5205 6.55991 14.3305C7.42991 13.9005 8.16991 13.2405 8.69991 12.4405C8.87991 12.1705 8.87991 11.8305 8.69991 11.5605C8.15991 10.7605 7.41991 10.1005 6.55991 9.67051C6.17991 9.49051 6.02991 9.04051 6.21991 8.66051C6.39991 8.29051 6.84991 8.14051 7.21991 8.33051C8.31991 8.88051 9.25991 9.71051 9.93991 10.7305C10.4499 11.5005 10.4499 12.5005 9.93991 13.2705C9.25991 14.2905 8.31991 15.1205 7.21991 15.6705C7.11991 15.7205 6.99991 15.7505 6.88991 15.7505Z" fill="currentColor"/>
        <path d="M17 15.75H13C12.59 15.75 12.25 15.41 12.25 15C12.25 14.59 12.59 14.25 13 14.25H17C17.41 14.25 17.75 14.59 17.75 15C17.75 15.41 17.41 15.75 17 15.75Z" fill="currentColor"/>
        <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_4418_7308">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function ResearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_655_7091)">
        <path d="M3.54 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H3.54C3.95 11.25 4.29 11.59 4.29 12C4.29 12.41 3.95 12.75 3.54 12.75Z" fill="currentColor"/>
        <path d="M21.9991 12.75H20.5391C20.1291 12.75 19.7891 12.41 19.7891 12C19.7891 11.59 20.1291 11.25 20.5391 11.25H21.9991C22.4091 11.25 22.7491 11.59 22.7491 12C22.7491 12.41 22.4091 12.75 21.9991 12.75Z" fill="currentColor"/>
        <path d="M4.92914 19.82C4.73914 19.82 4.54914 19.75 4.39914 19.6C4.10914 19.31 4.10914 18.83 4.39914 18.54L5.48914 17.45C5.77914 17.16 6.25914 17.16 6.54914 17.45C6.83914 17.74 6.83914 18.22 6.54914 18.51L5.45914 19.6C5.30914 19.75 5.11914 19.82 4.92914 19.82Z" fill="currentColor"/>
        <path d="M18.0405 6.71C17.8505 6.71 17.6605 6.63999 17.5105 6.48999C17.2205 6.19999 17.2205 5.71999 17.5105 5.42999L18.5405 4.4C18.8305 4.11 19.3105 4.11 19.6005 4.4C19.8905 4.69 19.8905 5.17 19.6005 5.46L18.5705 6.48999C18.4205 6.63999 18.2305 6.71 18.0405 6.71Z" fill="currentColor"/>
        <path d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V20.46C11.25 20.05 11.59 19.71 12 19.71C12.41 19.71 12.75 20.05 12.75 20.46V22C12.75 22.41 12.41 22.75 12 22.75Z" fill="currentColor"/>
        <path d="M12 4.21C11.59 4.21 11.25 3.87 11.25 3.46V2C11.25 1.59 11.59 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2V3.46C12.75 3.87 12.41 4.21 12 4.21Z" fill="currentColor"/>
        <path d="M19.0699 19.82C18.8799 19.82 18.6899 19.75 18.5399 19.6L17.4499 18.51C17.1599 18.22 17.1599 17.74 17.4499 17.45C17.7399 17.16 18.2199 17.16 18.5099 17.45L19.5999 18.54C19.8899 18.83 19.8899 19.31 19.5999 19.6C19.4499 19.75 19.2599 19.82 19.0699 19.82Z" fill="currentColor"/>
        <path d="M5.95914 6.71C5.76914 6.71 5.57914 6.63999 5.42914 6.48999L4.39914 5.46C4.10914 5.17 4.10914 4.69 4.39914 4.4C4.68914 4.11 5.16914 4.11 5.45914 4.4L6.48914 5.42999C6.77914 5.71999 6.77914 6.19999 6.48914 6.48999C6.33914 6.63999 6.14914 6.71 5.95914 6.71Z" fill="currentColor"/>
        <path d="M11.9996 17.4C11.5596 17.4 11.1696 17.13 11.0196 16.71L10.0096 13.98L7.27961 12.97C6.85961 12.82 6.59961 12.43 6.59961 11.99C6.59961 11.55 6.86961 11.16 7.27961 11.01L10.0096 10L11.0196 7.27002C11.1696 6.85002 11.5596 6.58002 11.9996 6.58002C12.4396 6.58002 12.8296 6.85002 12.9796 7.27002L13.9896 10L16.7196 11.01C17.1396 11.16 17.3996 11.55 17.3996 11.99C17.3996 12.43 17.1296 12.82 16.7196 12.97L13.9896 13.98L12.9796 16.71C12.8296 17.13 12.4396 17.4 11.9996 17.4ZM8.93961 12L10.7196 12.66C11.0096 12.77 11.2296 12.99 11.3396 13.28L11.9996 15.06L12.6596 13.28C12.7696 12.99 12.9896 12.77 13.2796 12.66L15.0596 12L13.2796 11.34C12.9896 11.23 12.7696 11.01 12.6596 10.72L11.9996 8.94002L11.3396 10.72C11.2296 11.01 11.0096 11.23 10.7196 11.34L8.93961 12Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_655_7091">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function AIIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_3261_13449)">
        <path d="M16.19 11.36C15.78 11.36 15.44 11.08 15.36 10.69L15.14 9.73004C15.04 9.31004 14.71 8.98004 14.3 8.88004L13.32 8.65004C12.94 8.57004 12.66 8.23004 12.66 7.82004C12.66 7.41004 12.94 7.07004 13.33 6.99004L14.29 6.77004C14.71 6.67004 15.04 6.34004 15.14 5.93004L15.37 4.95004C15.45 4.57004 15.79 4.29004 16.2 4.29004C16.61 4.29004 16.95 4.57004 17.03 4.96004L17.25 5.92004C17.35 6.34004 17.68 6.67004 18.09 6.77004L19.07 7.00004C19.45 7.08004 19.73 7.42004 19.73 7.83004C19.73 8.24004 19.46 8.57004 19.07 8.66004L18.1 8.89004C17.68 8.99004 17.35 9.32004 17.25 9.73004L17.02 10.71C16.94 11.09 16.6 11.37 16.19 11.37V11.36ZM15.54 7.82004C15.79 8.00004 16.01 8.22004 16.19 8.47004C16.37 8.22004 16.59 8.00004 16.84 7.82004C16.59 7.64004 16.37 7.42004 16.19 7.17004C16.01 7.42004 15.79 7.64004 15.54 7.82004Z" fill="currentColor"/>
        <path d="M10.61 21.25C10.42 21.25 10.23 21.18 10.08 21.03C9.78999 20.74 9.78999 20.26 10.08 19.97L11.41 18.64C11.7 18.35 12.18 18.35 12.47 18.64C12.76 18.93 12.76 19.41 12.47 19.7L11.14 21.03C10.99 21.18 10.8 21.25 10.61 21.25Z" fill="currentColor"/>
        <path d="M15.66 19.6401C15.3 19.6401 14.98 19.3801 14.92 19.0101C14.86 18.6001 15.13 18.2201 15.54 18.1501C19.25 17.5701 21.19 16.2701 21.19 15.2801C21.15 14.8601 20.86 14.4101 20.44 14.1501C20.09 13.9401 19.97 13.4801 20.19 13.1201C20.4 12.7701 20.86 12.6501 21.22 12.8701C22.05 13.3701 22.6 14.2401 22.69 15.2101C22.69 17.2901 20.04 18.9601 15.78 19.6301C15.74 19.6301 15.7 19.6401 15.66 19.6401Z" fill="currentColor"/>
        <path d="M11.94 19.92C6.73 19.92 1.19 18.29 1.19 15.28C1.29 14.24 1.84 13.37 2.66 12.87C3.01 12.66 3.47 12.77 3.69 13.12C3.9 13.48 3.79 13.94 3.44 14.15C3.02 14.4 2.74 14.85 2.69 15.35C2.69 16.59 6.21 18.42 11.94 18.42C12.35 18.42 12.69 18.76 12.69 19.17C12.69 19.58 12.35 19.92 11.94 19.92Z" fill="currentColor"/>
        <path d="M11.91 15.75C10.28 15.75 8.76002 15.04 7.68002 13.81C7.64002 13.77 7.61002 13.72 7.59002 13.68C5.85002 11.55 5.89002 8.43004 7.70002 6.34004L10.07 3.60004C11.01 2.52004 12.87 2.52004 13.8 3.60004C14.07 3.91004 14.04 4.39004 13.72 4.66004C13.41 4.93004 12.93 4.90004 12.66 4.58004C12.3 4.16004 11.56 4.16004 11.19 4.58004L8.82002 7.32004C7.45002 8.89004 7.45002 11.26 8.82002 12.83C8.85002 12.87 8.88002 12.9 8.90002 12.94C9.68002 13.78 10.77 14.25 11.91 14.25C13.11 14.25 14.24 13.73 15.02 12.83C15.29 12.52 15.76 12.48 16.08 12.75C16.39 13.02 16.43 13.49 16.16 13.81C15.1 15.04 13.55 15.75 11.91 15.75Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_3261_13449">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

const cards = [
  {
    id: 1,
    title: "Strategy",
    description: "Aligning business goals with scalable digital products.",
    icon: StrategyIcon,
    rotate: -12,
    x: "-45%",
    y: 20,
  },
  {
    id: 2,
    title: "Systems",
    description: "Transforming complexity into unified user experiences.",
    icon: SystemIcon,
    rotate: -4,
    x: "-15%",
    y: -10,
  },
  {
    id: 3,
    title: "Research",
    description: "Designing through evidence, experimentation, and HCI methods.",
    icon: ResearchIcon,
    rotate: 6,
    x: "15%",
    y: 5,
  },
  {
    id: 4,
    title: "AI Integration",
    description: "Accelerating product delivery through human-guided AI workflows.",
    icon: AIIcon,
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
  const taglineOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const taglineVisibility = useTransform(scrollYProgress, (pos) => pos > 0.6 ? "hidden" : "visible");
  const taglineY = useTransform(scrollYProgress, [0.1, 0.3], [0, 20]);

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
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-[92px] md:-mt-[252px] lg:-mt-[12px] z-10"
        >
          {/* Main Title */}
          <div className="relative w-full pointer-events-none">
            <SplitText
              text="POFEI"
              tag="h1"
              className="text-7xl sm:text-[5rem] md:text-[6rem] lg:text-[8.5rem] font-bold tracking-tighter text-neutral-900 leading-[0.8] uppercase text-center w-full px-4 pb-4"
              delay={50}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: -8 }}
            />
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

          <div className="h-[360px] sm:h-[280px] md:h-[320px] lg:h-[350px] w-full" />

          {/* Tagline & Actions (separated for faster fade but kept in flow for layout) */}
          <motion.div style={{ opacity: taglineOpacity, visibility: taglineVisibility }} className="pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-10 mt-[-20px] sm:mt-10 pointer-events-none"
            >
              <p className="text-base text-neutral-700 max-w-lg text-center font-medium leading-relaxed px-6 hidden sm:block font-mono">
                Grounded in Human-Computer Interaction, I design products where AI accelerates exploration and human judgment shapes meaningful experiences.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CARDS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 -mt-[80px] md:-mt-[190px] lg:mt-0">
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
