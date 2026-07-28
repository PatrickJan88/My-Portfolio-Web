import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ThinkingOrb } from "thinking-orbs";
import { useState, useEffect } from "react";
import LetterSwapForward from "../ui/text/letter-swap-forward-anim";

const orbStates = ["working", "searching", "solving", "listening", "composing", "shaping"] as const;

export default function Footer() {
  const [orbState, setOrbState] = useState<typeof orbStates[number]>("working");

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbState(prev => {
        const nextIndex = (orbStates.indexOf(prev) + 1) % orbStates.length;
        return orbStates[nextIndex];
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-12 px-6 md:px-12 z-20 flex flex-col items-center gap-8 border-t border-black/5 bg-transparent shrink-0">
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center justify-center w-[36px] h-[36px] hover:opacity-80 transition-opacity cursor-pointer">
            <div className="scale-[0.5625] origin-center flex items-center justify-center pointer-events-none">
              <ThinkingOrb state={orbState} size={64} theme="light" />
            </div>
          </Link>
          <div className="flex flex-col items-center md:items-start gap-1 font-mono">
            <Link to="/" className="text-sm font-bold tracking-tight text-[#373737]">
              <LetterSwapForward label="POFEI" />
            </Link>
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#a0a0a0]">
              Product Designer
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-[11px] font-medium tracking-widest text-[#171717] font-mono">
          <Link to="/" className="hover:text-[#707070] transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-[#707070] transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-[#707070] transition-colors">Contact</Link>
          <a href="https://github.com/PatrickJan88/My-Portfolio-Web.git" target="_blank" rel="noreferrer" className="hover:text-[#707070] transition-colors">GitHub</a>
        </nav>

      </div>
      
      <div className="w-full max-w-[1400px] flex justify-center sm:justify-between items-center text-[10px] tracking-[0.15em] font-bold text-[#333333] font-mono">
        <span className="text-center sm:text-left">© {new Date().getFullYear()} All Rights Reserved</span>
        <span className="hidden sm:inline text-right text-[#333333]">💡 Imagining &nbsp;&nbsp; 💻 Building &nbsp;&nbsp; 🚀 Beyond</span>
      </div>
    </footer>
  );
}
