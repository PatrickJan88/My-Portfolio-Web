import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Career() {
  const experiences = [
    {
      role: "Lead Product Designer",
      company: "Cognitive AI Studio",
      period: "2023 - Present",
      description: "Leading the design of autonomous agent interfaces and spatial computing applications. Established the core design system used across 5 flagship products.",
    },
    {
      role: "Senior UX Designer",
      company: "Essex Lake Group",
      period: "2020 - 2023",
      description: "Spearheaded the redesign of the EARS™ Ecosystem. Managed a team of 4 designers and collaborated closely with engineering to implement a new component library.",
    },
    {
      role: "UI/UX Designer",
      company: "Yuanxin Health",
      period: "2018 - 2020",
      description: "Designed consumer-facing healthcare mobile applications focusing on accessibility, trust, and ease of use for elderly patients.",
    },
    {
      role: "Interaction Designer",
      company: "Smart Charging Co",
      period: "2016 - 2018",
      description: "Responsible for the end-to-end user experience of the EV 365 dashboard, increasing user retention by 24%.",
    }
  ];

  const education = [
    {
      degree: "Master of Science in Human-Computer Interaction",
      school: "Uppsala University",
      period: "2014 - 2016",
    },
    {
      degree: "Bachelor of Fine Arts in Animation",
      school: "Design Institute",
      period: "2010 - 2014",
    }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col min-h-screen">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-24 mt-12 md:mt-20 max-w-3xl"
      >
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#373737] uppercase leading-[0.9] mb-8">
          Designing the<br/>Cognitive Era
        </h1>
        <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed font-medium">
          I am a Product Designer specializing in AI-native interfaces, spatial computing, and complex enterprise systems. With a background in HCI and animation, I blend rigorous research with high-fidelity craft.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-8 flex flex-col gap-16"
        >
          <section>
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0] mb-8 border-b border-black/10 pb-4">Professional Experience</h2>
            <div className="flex flex-col gap-10">
              {experiences.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                  <div className="w-32 shrink-0 pt-1">
                    <span className="text-sm font-semibold text-[#a0a0a0]">{exp.period}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#373737] group-hover:text-[#3480F9] transition-colors">{exp.role}</h3>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#D2D2D2] mb-3">{exp.company}</p>
                    <p className="text-[#4A4A4A] leading-relaxed max-w-xl">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0] mb-8 border-b border-black/10 pb-4">Education</h2>
            <div className="flex flex-col gap-8">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                  <div className="w-32 shrink-0 pt-1">
                    <span className="text-sm font-semibold text-[#a0a0a0]">{edu.period}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#373737]">{edu.degree}</h3>
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#D2D2D2]">{edu.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        {/* Sidebar Info */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-4 flex flex-col gap-12"
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0] mb-6">Core Methodologies</h3>
            <ul className="space-y-3 text-sm font-medium text-[#4A4A4A]">
              <li className="flex items-center gap-2 px-3 py-2 bg-[#f8f8f8] rounded-lg">Spatial Prototyping</li>
              <li className="flex items-center gap-2 px-3 py-2 bg-[#f8f8f8] rounded-lg">Design Systems Architecture</li>
              <li className="flex items-center gap-2 px-3 py-2 bg-[#f8f8f8] rounded-lg">Generative AI Workflows</li>
              <li className="flex items-center gap-2 px-3 py-2 bg-[#f8f8f8] rounded-lg">Contextual Inquiry</li>
            </ul>
          </div>

          <div className="bg-[#373737] text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">Toolstack</h3>
            <div className="flex flex-wrap gap-2">
              {["Figma", "Framer", "React", "React Native", "Tailwind", "Three.js", "Spline", "Cursor"].map(tool => (
                <span key={tool} className="text-[11px] font-semibold px-3 py-1.5 bg-white/10 rounded-full border border-white/5">
                  {tool}
                </span>
              ))}
            </div>
            
            <a href="/resume.pdf" target="_blank" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#5DDCF0] hover:text-white transition-colors group">
              Download Full Resume <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.aside>

      </div>
    </div>
  );
}
