import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Sparkles, Zap, Compass } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import SplitText from "../ui/SplitText";
import BorderGlow from "../ui/BorderGlow";

const cards = [
  {
    id: 1,
    title: "Experience",
    description: "10 Years driving UX/UI for Enterprise & Global SaaS.",
    icon: Briefcase,
    rotate: -12,
    x: "-45%",
    y: 20,
  },
  {
    id: 2,
    title: "Specialty",
    description: "Scaling personalization through AI-driven design strategy.",
    icon: Sparkles,
    rotate: -4,
    x: "-15%",
    y: -10,
  },
  {
    id: 3,
    title: "Impact",
    description: "Reduced enterprise wait times to under 5 mins for 33% of network.",
    icon: Zap,
    rotate: 6,
    x: "15%",
    y: 5,
  },
  {
    id: 4,
    title: "Methodology",
    description: "Human-centered design backed by rigorous HCI academic research.",
    icon: Compass,
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
      } else if (window.innerWidth < 1100) {
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

function ScrollCard({ card, scrollYProgress, index, target }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useTransform(scrollYProgress, [0.2, 0.8], [card.x, target.x]);
  const y = useTransform(scrollYProgress, [0.2, 0.8], [card.y, target.y]);
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
      className="absolute w-[140px] h-[190px] sm:w-[190px] sm:h-[240px] md:w-[240px] md:h-[310px] origin-bottom perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            className="absolute inset-0 rounded-2xl md:rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-white/90 backdrop-blur-xl border border-neutral-100 flex flex-col items-center justify-center p-4 md:p-6 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3 md:mb-4 text-neutral-800">
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-neutral-900 tracking-tight">
              {card.title}
            </h3>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-2xl md:rounded-[2rem]"
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

  // Fade in Skills Text
  const skillsOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const skillsY = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);

  const desktopTargets = [
    { x: "-165%", y: 150 },
    { x: "-55%", y: 150 },
    { x: "55%", y: 150 },
    { x: "165%", y: 150 },
  ];

  const tabletTargets = [
    { x: "-55%", y: -130 },
    { x: "55%", y: -130 },
    { x: "-55%", y: 130 },
    { x: "55%", y: 130 },
  ];

  const mobileTargets = [
    { x: "-55%", y: -100 },
    { x: "55%", y: -100 },
    { x: "-55%", y: 100 },
    { x: "55%", y: 100 },
  ];

  const targets = deviceType === "mobile" ? mobileTargets : deviceType === "tablet" ? tabletTargets : desktopTargets;

  return (
    <div ref={containerRef} className="relative w-full h-[250vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-neutral-50 flex items-center justify-center">
        
        {/* HERO CONTENT */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-[12px]"
        >


          {/* Main Title */}
          <SplitText
            text="POFEI"
            tag="h1"
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] font-bold tracking-tighter text-neutral-900 leading-[0.8] uppercase text-center w-full px-4 pb-4"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: -8 }}
          />

          {/* Faded Background Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full text-center px-4 opacity-30 mt-2 md:mt-4 relative -top-[6px]"
          >
            <SplitText
              text="Product Designer & AI Builder"
              tag="h2"
              className="text-2xl sm:text-3xl font-semibold tracking-widest text-neutral-300 uppercase leading-[0.8]"
              delay={50}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          </motion.div>

          <div className="h-[220px] sm:h-[280px] md:h-[350px] w-full" />

          {/* Tagline & Actions (separated for faster fade but kept in flow for layout) */}
          <motion.div style={{ opacity: taglineOpacity, visibility: taglineVisibility }} className="pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-10 mt-[-20px] sm:mt-10 pointer-events-auto"
            >
              <p className="text-base text-neutral-700 max-w-lg text-center font-medium leading-relaxed px-6 hidden sm:block font-mono">
                Grounded in Human-Computer Interaction, I explore how AI can extend the design process—enhancing craft, accelerating iteration, and improving outcomes.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SKILLS CONTENT */}
        <motion.div
          style={{ opacity: skillsOpacity, y: skillsY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="absolute top-[15%] md:top-[20%] w-full flex flex-col items-center px-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 uppercase text-center">
              Core Expertise
            </h2>
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {cards.map((card, idx) => (
            <ScrollCard
              key={card.id}
              card={card}
              index={idx}
              scrollYProgress={scrollYProgress}
              target={targets[idx]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
