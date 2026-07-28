import { motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projectsData } from "../data/projects";
import SplitText from "../components/ui/SplitText";

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "Research & Design", label: "Research & Design" },
  { id: "Product Design", label: "Product Design" },
  { id: "Web Design", label: "Web Design" },
  { id: "Visual Identity", label: "Visual Identity" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-6 md:py-12 flex flex-col min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 mt-4"
      >
        <SplitText
          text="Selected Cases"
          tag="h1"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 uppercase mb-6 leading-none inline-block"
          delay={50}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="text-base text-neutral-700 max-w-2xl font-medium leading-relaxed font-mono">
          An archive of selected works spanning robust enterprise platforms,
          native mobile applications, and academic human-computer interaction
          research.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 md:gap-3 mb-12"
      >
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 border ${
              activeCategory === category.id
                ? "bg-neutral-900 text-white border-transparent shadow-lg shadow-neutral-900/10 scale-105"
                : "bg-white/90 border-black/5 text-neutral-700 hover:bg-[oklch(37.1%_0_none)] hover:text-white hover:border-transparent shadow-sm hover:scale-105 hover:shadow-md"
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard
              id={project.id}
              title={project.title}
              category={project.category}
              image={project.image}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
