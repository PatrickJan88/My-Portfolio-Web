import { motion } from "motion/react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Figma } from "lucide-react";
import { projectsData } from "../data/projects";
import AutoCarousel from "../components/AutoCarousel";

export default function ProjectDetail() {
  const { id } = useParams();

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project =
    currentIndex !== -1 ? projectsData[currentIndex] : projectsData[0];

  if (!project) {
    return <Navigate to="/projects" />;
  }

  const nextProjectIndex =
    (currentIndex !== -1 ? currentIndex + 1 : 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  return (
    <div className="w-full bg-[#f4f4f4] min-h-screen text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Full-screen Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-end bg-neutral-900">
        {/* Absolute Navigation */}
        <nav className="absolute top-0 w-full px-6 md:px-12 pt-32 pb-8 flex justify-between items-center z-20 max-w-[1600px] mx-auto left-1/2 -translate-x-1/2">
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
        </div>

        {/* Text Content layer */}
        <div className="container mx-auto px-[4vw] relative z-10 pb-16 md:pb-24">
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-[#999] mb-4 md:mb-8 block">
              {project.category || project.client}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8 md:mb-16 text-[#e6e6e6]">
              {project.title}
            </h1>
          </motion.div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 md:mb-12"
            >
              {project.tags.map((tag, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group no-underline"
                >
                  <span className="font-sans text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.12em] text-[#3b82f6] border border-[#3b82f6]/40 px-3 py-1.5 bg-[#3b82f6]/10">
                    {tag.label}
                  </span>
                  <span className="font-sans text-xs md:text-sm text-[#3b82f6] group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    {tag.label === "FIGMA" && (
                      <Figma className="w-4 h-4 ml-1" />
                    )}
                    {tag.value}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-[#3b82f6] group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-white/20"
          >
            {project.metadata?.map((meta, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="font-sans text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-[#999] mb-2">
                  {meta.label}
                </h4>
                <p className="font-sans text-base font-medium text-[#e6e6e6]">
                  {meta.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-24 pt-16 md:pt-24">
        {/* Overview Section */}
        <section className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 md:mb-24 px-2 md:px-8">
          {/* Left Column */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6 md:mb-8">
              {project.overviewLabel || "Overview"}
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-[1.1] whitespace-pre-line">
              {project.overviewHeading || project.heroHeading}
            </h2>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center pt-2 lg:pt-12">
            <p className="text-xl md:text-2xl lg:text-[28px] leading-[1.5] text-neutral-800 mb-8 font-light">
              {project.overview}
            </p>
            {project.subOverview && (
              <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl font-light">
                {project.subOverview}
              </p>
            )}
          </div>
        </section>

        {/* Testimonial Section */}
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

        {/* Media Grids Section For the User to Populate Later */}
        <section className="w-full flex flex-col gap-8 md:gap-12">
          {/* Section 1: Full width media */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center relative"
          >
            {project.media1 ? (
              project.media1.endsWith(".webm") || project.media1.endsWith(".mp4") ? (
                <video
                  src={project.media1}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.media1}
                  alt="Media 1"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <p className="absolute text-neutral-400 font-mono text-sm">
                Media Placeholder 1 (Upload WebM/Image here)
              </p>
            )}
          </motion.div>

          {/* Section 2: Text Left, Media Right */}
          <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
            <div className="w-full lg:w-5/12 flex flex-col px-2 md:px-8">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                {project.section1?.label || "Approach"}
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-[1.1] mb-8 whitespace-pre-line">
                {project.section1?.heading || "Digital Platform"}
              </h2>
              <p className="text-lg md:text-[22px] text-neutral-600 leading-[1.6] font-light whitespace-pre-line">
                {project.section1?.content || "The hackathon platform was designed for seamless registration, team formation, and project submission. We created a digital experience that turned participation into a journey — from sign-up to demo day."}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-7/12 aspect-[4/3] bg-neutral-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center relative"
            >
              {project.media2 ? (
                project.media2.endsWith(".webm") || project.media2.endsWith(".mp4") ? (
                  <video src={project.media2} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={project.media2} alt="Media 2" className="w-full h-full object-cover" />
                )
              ) : (
                <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                  Media Placeholder 2
                </p>
              )}
            </motion.div>
          </div>

          {/* Section 3: Media Left, Text Right */}
          <div className="w-full flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-7/12 aspect-[4/3] bg-neutral-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center relative"
            >
              {project.media3 ? (
                project.media3.endsWith(".webm") || project.media3.endsWith(".mp4") ? (
                  <video src={project.media3} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={project.media3} alt="Media 3" className="w-full h-full object-cover" />
                )
              ) : (
                <p className="absolute text-neutral-400 font-mono text-sm px-6 text-center">
                  Media Placeholder 3
                </p>
              )}
            </motion.div>
            <div className="w-full lg:w-5/12 flex flex-col px-2 md:px-8">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                {project.section2?.label || "Design System"}
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-[1.1] mb-8 whitespace-pre-line">
                {project.section2?.heading || "Visual Identity"}
              </h2>
              <p className="text-lg md:text-[22px] text-neutral-600 leading-[1.6] font-light whitespace-pre-line">
                {project.section2?.content || "We established a cohesive visual system built on bold typography and strategic use of color. This system ensures consistency across marketing materials, digital platforms, and physical venue signage."}
              </p>
            </div>
          </div>

          {/* Section 3: Full width media */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-auto md:aspect-[16/9] bg-neutral-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center relative"
          >
            {project.media4 ? (
              Array.isArray(project.media4) ? (
                <AutoCarousel images={project.media4} />
              ) : project.media4.endsWith(".webm") || project.media4.endsWith(".mp4") ? (
                <video src={project.media4} autoPlay loop muted playsInline className="w-full h-auto md:h-full object-cover" />
              ) : (
                <img src={project.media4} alt="Media 4" className="w-full h-auto md:h-full object-cover" />
              )
            ) : (
              <p className="absolute text-neutral-400 font-mono text-sm">
                Media Placeholder 4
              </p>
            )}
          </motion.div>

          {/* Additional Text Section */}
          <section className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 px-2 md:px-8 pt-8 md:pt-12">
            {/* Left Column */}
            <div className="w-full lg:w-5/12 flex flex-col">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6 md:mb-8">
                {project.section3?.label || "Result"}
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-neutral-900 leading-[1.1] whitespace-pre-line">
                {project.section3?.heading || project.heroHeading}
              </h2>
            </div>
            
            {/* Right Column */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center pt-2 lg:pt-12">
              <p className="text-xl md:text-2xl lg:text-[28px] leading-[1.5] text-neutral-800 mb-8 font-light">
                {project.section3?.content || project.overview}
              </p>
              {project.subOverview && !project.section3 && (
                <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl font-light">
                  {project.subOverview}
                </p>
              )}
            </div>
          </section>
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
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 mb-6 group-hover:opacity-70 transition-opacity">
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
