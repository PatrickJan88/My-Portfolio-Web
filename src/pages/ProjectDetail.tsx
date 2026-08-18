import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, PenTool, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsData } from "../data/projects";
import AutoCarousel from "../components/AutoCarousel";

export default function ProjectDetail() {
  const { id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isMediaVideo, setIsMediaVideo] = useState<boolean>(false);
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project =
    currentIndex !== -1 ? projectsData[currentIndex] : projectsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/projects" />;
  }

  const nextProjectIndex =
    (currentIndex !== -1 ? currentIndex + 1 : 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  const handleMediaClick = (mediaSrc: string, isVideo: boolean, gallery?: string[]) => {
    // Only open modal on mobile screens
    if (window.innerWidth < 768) {
      setSelectedMedia(mediaSrc);
      setIsMediaVideo(isVideo);
      setSelectedGallery(gallery || null);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
    setSelectedGallery(null);
    document.body.style.overflow = "auto";
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!selectedGallery || !selectedMedia) return;
    const currentIndex = selectedGallery.indexOf(selectedMedia);
    if (currentIndex === -1) return;
    
    let nextIndex;
    if (direction === 'prev') {
      nextIndex = (currentIndex - 1 + selectedGallery.length) % selectedGallery.length;
    } else {
      nextIndex = (currentIndex + 1) % selectedGallery.length;
    }
    
    setSelectedMedia(selectedGallery[nextIndex]);
    setIsMediaVideo(selectedGallery[nextIndex].endsWith('.webm') || selectedGallery[nextIndex].endsWith('.mp4'));
  };

  return (
    <div className="w-full bg-[#f4f4f4] min-h-screen text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Mobile Media Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 px-4 pb-16 md:hidden pointer-events-auto"
            >
              <div className="w-full flex justify-end mb-8 relative z-[110]">
                <button
                  onClick={closeMediaModal}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent border border-white/30 text-white relative hover:scale-95 hover:border-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <motion.div
                key={selectedMedia}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center w-full"
              >
                {isMediaVideo ? (
                  <video
                    src={selectedMedia}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-h-[75vh] object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={selectedMedia}
                    alt="Expanded Media"
                    className="w-full max-h-[75vh] object-contain rounded-xl"
                  />
                )}
              </motion.div>

              {selectedGallery && selectedGallery.length > 1 && (
                <div className="flex justify-between items-center w-full max-w-sm mt-6 z-[110]">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
                    className="bg-white/10 text-white p-3 rounded-full focus:outline-none active:bg-white/20 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="flex space-x-2">
                    {selectedGallery.map((src, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(src);
                          setIsMediaVideo(src.endsWith('.webm') || src.endsWith('.mp4'));
                        }}
                        className={`w-2 h-2 rounded-full transition-colors focus:outline-none ${
                          src === selectedMedia ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
                    className="bg-white/10 text-white p-3 rounded-full focus:outline-none active:bg-white/20 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      {/* Full-screen Hero Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[60vh] md:max-h-[85vh] md:aspect-[16/9] flex flex-col justify-end bg-neutral-900 overflow-hidden">
        {/* Absolute Navigation */}
        <nav className="absolute top-0 w-full px-6 md:px-12 pt-[118px] md:pt-32 pb-8 flex justify-between items-center z-20 max-w-[1600px] mx-auto left-1/2 -translate-x-1/2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>
        </nav>

        {/* Background layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          {project.heroVideo ? (
            <video
              src={project.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          {/* 70% Black Overlay */}
          <div className="absolute inset-0 bg-black/70" />
          {/* Mobile Top Gradient Overlay for Back Button Readability */}
          <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-black/80 from-[100px] to-transparent md:hidden pointer-events-none" />
        </div>

        {/* Text Content layer */}
        <div className="container mx-auto px-[4vw] relative z-10 pt-[164px] md:pt-[132px] pb-[64px] md:pb-[96px]">
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-normal mb-4 md:mb-8 text-[#e6e6e6] max-w-4xl">
              {project.title}
            </h1>
          </motion.div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2 md:mb-8"
            >
              {project.tags.map((tag, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group no-underline"
                >
                  <span className="font-sans text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.12em] text-[#333333] border border-[#333333]/40 px-3 py-1.5 bg-[#333333]/10">
                    {tag.label}
                  </span>
                  <span className="font-sans text-xs md:text-sm text-[#333333] group-hover:text-black transition-colors flex items-center gap-1">
                    {tag.label === "FIGMA" && (
                      <PenTool className="w-4 h-4 ml-1" />
                    )}
                    {tag.value}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-[#333333] group-hover:text-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path
                      d="M1 11L11 1M11 1H3M11 1V9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </a>
              ))}
            </motion.div>
          )}

          {/* Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6 md:gap-8 pt-6 border-t border-white/20"
          >
            {project.metadata?.map((meta, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="font-sans text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-[#999] mb-2">
                  {meta.label}
                </h4>
                <div className="font-sans text-base font-medium text-[#e6e6e6]">
                  {meta.links ? (
                    <div className="flex flex-wrap gap-2 -ml-1">
                      {meta.links.map((linkItem, idx) => (
                        <a 
                          key={idx}
                          href={linkItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center px-4 py-1.5 text-sm rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                        >
                          {linkItem.label}
                        </a>
                      ))}
                    </div>
                  ) : meta.link ? (
                    <a 
                      href={meta.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center px-4 py-1.5 -ml-1 text-sm rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                    >
                      {meta.value}
                    </a>
                  ) : (
                    meta.value
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-24 pt-16 md:pt-24">
        {/* Overview Section */}
        <article className={`w-full flex flex-col px-2 md:px-8 ${project.id === 'svenska-lek' ? 'mb-12 md:mb-16' : 'mb-16 md:mb-24'}`}>
          <div className="w-full flex flex-col mb-8 md:mb-12">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6 md:mb-8 text-pretty">
              {project.overviewLabel || "Overview"}
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-normal text-neutral-900 leading-[1.1] whitespace-pre-line text-pretty">
              {project.overviewHeading || project.heroHeading}
            </h2>
          </div>

          <div className="w-full flex flex-col">
            <p className="text-xl md:text-2xl lg:text-[28px] leading-[1.5] text-neutral-800 mb-8 font-light whitespace-pre-line text-pretty">
              {project.overview}
            </p>
            {project.subOverview && (
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light text-pretty">
                {project.subOverview}
              </p>
            )}
          </div>
        </article>

        {/* Testimonial Section */}
        {project.id !== 'icon-archive' && (
        <section className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#1C1C1C] py-16 md:py-24 mb-16 md:mb-24 flex flex-col items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <h3 className="text-2xl md:text-4xl lg:text-[40px] text-white font-serif italic font-light leading-[1.4] tracking-wide mb-12">
              "{project.testimonial?.quote || "Most platforms optimize for the platform. We designed one that communicates speed and approachability—the product's promise in visual form."}"
            </h3>
            <p className="text-white/50 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-4">
              <span className="w-6 h-[1px] bg-white/50"></span>
              {project.testimonial?.label || "DESIGN PHILOSOPHY"}
            </p>
          </div>
        </section>
        )}

        {/* Media Grids Section For the User to Populate Later */}
        <section className={`w-full flex flex-col ${project.id === 'svenska-lek' ? 'gap-6 md:gap-8' : project.id === 'icon-archive' ? 'gap-4 md:gap-6' : 'gap-8 md:gap-12'}`}>
          {/* Section 1: Full width media */}
          {(!project.media1 && project.id === 'svenska-lek') ? null : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto"
            onClick={() => project.media1 && handleMediaClick(project.media1, project.media1.endsWith(".webm") || project.media1.endsWith(".mp4"))}
          >
            {project.media1 ? (
              project.media1.endsWith(".webm") || project.media1.endsWith(".mp4") ? (
                <video
                  src={project.media1}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto"
                />
              ) : (
                <img
                  src={project.media1}
                  alt="Media 1"
                  className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto"
                />
              )
            ) : (
              <p className="absolute text-neutral-400 font-mono text-sm">
                Media Placeholder 1 (Upload WebM/Image here)
              </p>
            )}
          </motion.div>
          )}

          {/* Section 2: Text Left, Media Right */}
          {project.id === 'icon-archive' ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full aspect-[4/3] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto"
                onClick={() => project.media2 && handleMediaClick(project.media2, project.media2.endsWith(".webm") || project.media2.endsWith(".mp4"))}
              >
                {project.media2 ? (
                  project.media2.endsWith(".webm") || project.media2.endsWith(".mp4") ? (
                    <video src={project.media2} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                  ) : (
                    <img src={project.media2} alt="Media 2" className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                  )
                ) : (
                  <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                    Media Placeholder 2
                  </p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full aspect-[4/3] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto"
                onClick={() => project.media3 && handleMediaClick(project.media3, project.media3.endsWith(".webm") || project.media3.endsWith(".mp4"))}
              >
                {project.media3 ? (
                  project.media3.endsWith(".webm") || project.media3.endsWith(".mp4") ? (
                    <video src={project.media3} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                  ) : (
                    <img src={project.media3} alt="Media 3" className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                  )
                ) : (
                  <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                    Media Placeholder 3
                  </p>
                )}
              </motion.div>
            </div>
          ) : (
            <>
              {/* Section 2: Text Wrapping Media Right */}
              <article className="w-full clear-both">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-7/12 aspect-[4/3] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto mb-8 lg:mb-12 lg:float-right lg:ml-12 lg:mt-2"
                  onClick={() => project.media2 && handleMediaClick(project.media2, project.media2.endsWith(".webm") || project.media2.endsWith(".mp4"))}
                >
                  {project.media2 ? (
                    project.media2.endsWith(".webm") || project.media2.endsWith(".mp4") ? (
                      <video src={project.media2} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    ) : (
                      <img src={project.media2} alt="Media 2" className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    )
                  ) : (
                    <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                      Media Placeholder 2
                    </p>
                  )}
                </motion.div>
                
                <div className="px-2 md:px-8">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                    {project.section1?.label || "Approach"}
                  </h3>
                  <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-normal text-neutral-900 leading-[1.1] mb-8 whitespace-pre-line">
                    {project.section1?.heading || "Digital Platform"}
                  </h2>
                  <p className="text-lg md:text-[22px] text-neutral-600 leading-[1.6] font-light whitespace-pre-line">
                    {project.section1?.content || "The hackathon platform was designed for seamless registration, team formation, and project submission. We created a digital experience that turned participation into a journey — from sign-up to demo day."}
                  </p>
                </div>
              </article>

              {/* Section 3: Text Wrapping Media Left */}
              <article className="w-full clear-both mt-16 lg:mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-7/12 aspect-[4/3] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto mb-8 lg:mb-12 lg:float-left lg:mr-12 lg:mt-2"
                  onClick={() => project.media3 && handleMediaClick(project.media3, project.media3.endsWith(".webm") || project.media3.endsWith(".mp4"))}
                >
                  {project.media3 ? (
                    project.media3.endsWith(".webm") || project.media3.endsWith(".mp4") ? (
                      <video src={project.media3} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    ) : (
                      <img src={project.media3} alt="Media 3" className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    )
                  ) : (
                    <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                      Media Placeholder 3
                    </p>
                  )}
                </motion.div>
                
                <div className="px-2 md:px-8">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                    {project.section2?.label || "Design System"}
                  </h3>
                  <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-normal text-neutral-900 leading-[1.1] mb-8 whitespace-pre-line">
                    {project.section2?.heading || "Visual Identity"}
                  </h2>
                  <p className="text-lg md:text-[22px] text-neutral-600 leading-[1.6] font-light whitespace-pre-line">
                    {project.section2?.content || "We established a cohesive visual system built on bold typography and strategic use of color. This system ensures consistency across marketing materials, digital platforms, and physical venue signage."}
                  </p>
                </div>
              </article>
            </>
          )}

          {/* Section 3: Full width media */}
          {(!project.media4 && project.id === 'svenska-lek') ? null : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto"
            onClick={() => project.media4 && !Array.isArray(project.media4) && handleMediaClick(project.media4, project.media4.endsWith(".webm") || project.media4.endsWith(".mp4"))}
          >
            {project.media4 ? (
              Array.isArray(project.media4) ? (
                <AutoCarousel images={project.media4} onImageClick={(src) => handleMediaClick(src, false, project.media4 as string[])} />
              ) : project.media4.endsWith(".webm") || project.media4.endsWith(".mp4") ? (
                <video src={project.media4} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
              ) : (
                <img src={project.media4} alt="Media 4" className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
              )
            ) : (
              <p className="absolute text-neutral-400 font-mono text-sm">
                Media Placeholder 4
              </p>
            )}
          </motion.div>
          )}

          {/* 4 Containers (16:9) for Icon Archive */}
          {project.id === 'icon-archive' && (
            <div className="w-full flex flex-col gap-4 md:gap-6 pt-0 md:pt-2">
              {[project.media5, project.media6, project.media7, project.media8].map((media, index) => (
                <motion.div
                  key={`icon-archive-media-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-200 rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto"
                  onClick={() => media && handleMediaClick(media, media.endsWith(".webm") || media.endsWith(".mp4"))}
                >
                  {media ? (
                    media.endsWith(".webm") || media.endsWith(".mp4") ? (
                      <video src={media} autoPlay loop muted playsInline className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    ) : (
                      <img src={media} alt={`Media ${index + 5}`} className="w-full h-full object-cover md:object-contain pointer-events-none md:pointer-events-auto" />
                    )
                  ) : (
                    <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                      Media Placeholder {index + 5}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Additional Text Section */}
          {project.id !== 'icon-archive' && (
          <article className={`w-full flex flex-col px-2 md:px-8 ${project.id === 'svenska-lek' ? 'pt-4 md:pt-6' : 'pt-8 md:pt-12'}`}>
            <div className="w-full flex flex-col mb-8 md:mb-12">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6 md:mb-8 text-pretty">
                {project.section3?.label || "Result"}
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-normal text-neutral-900 leading-[1.1] whitespace-pre-line text-pretty">
                {project.section3?.heading || project.heroHeading}
              </h2>
            </div>
            
            <div className="w-full flex flex-col">
              <p className="text-xl md:text-2xl lg:text-[28px] leading-[1.5] text-neutral-800 mb-8 font-light whitespace-pre-line text-pretty">
                {project.section3?.content || project.overview}
              </p>
              {project.subOverview && !project.section3 && (
                <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-light text-pretty">
                  {project.subOverview}
                </p>
              )}
            </div>
          </article>
          )}
        </section>

        {/* Next Project Footer */}
        <section className="w-full border-t border-neutral-200 mt-24 md:mt-32 pt-16 flex flex-col items-center justify-center">
          <Link
            to={`/projects/${nextProject.id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group flex flex-col items-center text-center"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
              Next Project
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-normal text-neutral-900 mb-6 group-hover:opacity-70 transition-opacity">
              {nextProject.title}
            </h2>
            <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all transform group-hover:scale-110">
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
