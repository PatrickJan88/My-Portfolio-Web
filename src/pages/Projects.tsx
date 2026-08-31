import { motion } from "motion/react";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projectsData } from "../data/projects";

export default function Projects() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-14 md:pt-16 pb-8 md:pb-12 flex flex-col min-h-[80vh]">
      {/* Project Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        {projectsData.map((project) => (
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
