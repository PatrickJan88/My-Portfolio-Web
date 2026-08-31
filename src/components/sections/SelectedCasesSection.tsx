import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { FluidImage } from "../ui/fluid-image";

interface CaseItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  link: string;
  /** Primary shader background image (e.g. /home/biotopia-case-cover-page.webp) */
  bgImage: string;
  media: {
    type: "image" | "video";
    src: string;
    aspectRatio?: "16/9" | "4/3" | "16/10";
  };
  accentColor?: string;
}

const CASES: CaseItem[] = [
  {
    id: "biotopia-digital-experience",
    title: "Biotopia: Unified Museum Service",
    category: "Service Design & Research",
    client: "Uppsala Biotopia Museum",
    description:
      "A comprehensive service ecosystem combining gamified digital experiences, outdoor exploration routes, and internal staff workflows into a continuous Online-to-Offline (O2O) visitor journey.",
    link: "/projects/biotopia-digital-experience",
    bgImage: "/home/biotopia-case-cover-page-1.webp",
    media: {
      type: "video",
      src: "/projects/biotopia-digital-experience/bio-mp-1.webm",
      aspectRatio: "16/9",
    },
    accentColor: "#FF7523",
  },
  {
    id: "ears",
    title: "Enterprise Finance Ecosystem",
    category: "Executive AI & Fintech",
    client: "Essex Lake Group",
    description:
      "An AI-powered decision support platform transforming complex enterprise analytics into executive mobile actions, management dashboards, and operational ticketing workflows.",
    link: "/projects/ears",
    bgImage: "/home/ears-case-cover-page.webp",
    media: {
      type: "video",
      src: "/projects/ears/EARS_video.webm",
      aspectRatio: "16/9",
    },
    accentColor: "#FF7523",
  },
  {
    id: "corporate-website-redesign",
    title: "Corporate Website Redesign",
    category: "Web & Brand Strategy",
    client: "Essex Lake Group",
    description:
      "Repositioning an AI intelligence enterprise through a streamlined single-scroll narrative, unified design system, and conversion-focused product showcase.",
    link: "/projects/corporate-website-redesign",
    bgImage: "/home/webredesign-case-cover-page.webp",
    media: {
      type: "video",
      src: "/projects/corporate-website-redesign/web-mp-1.1.webm",
      aspectRatio: "16/9",
    },
    accentColor: "#FF7523",
  },
  {
    id: "health-app-design",
    title: "Digital Health App",
    category: "Product Design & Telehealth",
    client: "Legent Health",
    description:
      "A seamless digital health experience natively integrated into the WeChat ecosystem, connecting patients with remote doctor consultations, localized education, and O2O pharmacy.",
    link: "/projects/health-app-design",
    bgImage: "/home/healthapp-case-cover-page.webp",
    media: {
      type: "image",
      src: "/projects/health-app-design/cover-page.webp",
      aspectRatio: "16/9",
    },
    accentColor: "#FF7523",
  },
];

export function SelectedCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Overall scroll progression across the case study section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for buttery-smooth fluid transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.5,
  });

  // Track active case card based on scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      // 0 to 0.2: Header / Case 0
      // 0.2 to 0.45: Case 0
      // 0.45 to 0.7: Case 1
      // 0.7 to 0.88: Case 2
      // 0.88 to 1.0: Case 3
      if (v < 0.35) {
        setActiveIndex(0);
      } else if (v < 0.6) {
        setActiveIndex(1);
      } else if (v < 0.82) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Header fade-out / scale as user scrolls down into the cards
  const headerOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.18], [1, 0.94]);
  const headerY = useTransform(smoothProgress, [0, 0.18], [0, -40]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[480vh] bg-[#0c0d0e] text-white selection:bg-[#FF7523] selection:text-white"
    >
      {/* 1. STICKY DYNAMIC SHADER BACKGROUND */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 pointer-events-none">
        {/* Render shader background layers for each case with smooth cross-fade */}
        {CASES.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={false}
            animate={{
              opacity: activeIndex === idx ? 1 : 0,
              scale: activeIndex === idx ? 1 : 1.04,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto"
          >
            <FluidImage
              image={item.bgImage}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Ambient Darkened Radial Gradient Overlay for crisp contrast */}
        <div className="absolute inset-0 bg-radial from-black/20 via-black/50 to-black/85 pointer-events-none z-[2]" />
        
        {/* Soft vignette along borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-[3]" />

        {/* 2. CENTERED SECTION INTRO HEADER (Sticky Header Viewport) */}
        <motion.div
          style={{
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none z-[4]"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 pointer-events-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-space-grotesk tracking-tight text-[#fafafb] drop-shadow-md"
            >
              Selected Projects
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-[#f2f2f3] font-semibold whitespace-normal sm:whitespace-nowrap leading-relaxed drop-shadow"
            >
              A curated selection of product design and research-led work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2 mb-12"
            >
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FE5B25] to-[#FF7523] text-white font-medium text-base hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#FE5B25]/25"
              >
                <span>See All Projects</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3. SCROLLING CASE STUDY CARDS LAYER */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-48">
        <div className="flex flex-col gap-20 md:gap-32">
          {CASES.map((item, idx) => (
            <CaseCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CaseCardProps {
  item: CaseItem;
  index: number;
}

function CaseCard({ item, index }: CaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full bg-white dark:bg-[#ffffff] text-neutral-900 rounded-[32px] sm:rounded-[40px] md:rounded-[48px] px-6 sm:px-8 md:px-10 lg:px-12 py-[4.75rem] sm:py-[5.25rem] md:py-[5.75rem] lg:py-[6.75rem] shadow-2xl hover:shadow-3xl transition-shadow duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
        {/* LEFT COLUMN: Metadata, Title, Description, CTA */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6 sm:space-y-8">
          {/* Text block aligned with the right cover top-to-bottom bounds */}
          <div className="flex flex-col justify-between items-start space-y-5 sm:space-y-6 w-full">
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium tracking-wide text-pretty">
              <span>{item.category}</span>
            </div>

            {/* Project Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-[2.25rem] lg:text-[2.65rem] font-bold font-space-grotesk tracking-tight text-neutral-950 leading-[1.18] text-pretty">
                {item.title}
              </h3>
            </div>

            {/* Project Summary Description */}
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed text-pretty font-normal">
              {item.description}
            </p>
          </div>

          {/* CTA View Project Button - sits below the aligned text block */}
          <div className="pt-2 sm:pt-4">
            <Link
              to={item.link}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FE5B25] to-[#FF7523] text-white font-medium text-sm sm:text-base hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-[#FE5B25]/20 text-pretty"
            >
              <span>View Project</span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Media Preview (16:9 / 4:3 ratio) */}
        <div className="lg:col-span-7">
          <Link
            to={item.link}
            className="block group relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-neutral-950 shadow-inner"
          >
            {item.media.type === "video" ? (
              <video
                src={item.media.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <img
                src={item.media.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}

            {/* Subtle interactive hover sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-5 sm:p-6">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide flex items-center backdrop-blur-md bg-black/60 border border-white/15 px-4 py-2 rounded-full text-pretty shadow-lg">
                {item.title}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default SelectedCasesSection;
