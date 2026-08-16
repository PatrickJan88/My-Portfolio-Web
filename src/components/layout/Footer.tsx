import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ThinkingOrb } from "thinking-orbs";
import { useState, useEffect } from "react";
import LetterSwapForward from "../ui/text/letter-swap-forward-anim";
import { LightRays } from "../ui/light-rays";

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
    <footer className="w-full relative z-20 flex flex-col items-center bg-transparent shrink-0 overflow-hidden">
      <LightRays color="#E8ECF0" />
      <div className="w-full relative z-10 max-w-[1400px] pt-12 pb-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-6">
        
        {/* Desktop / Tablet version */}
        <div className="hidden md:flex items-start gap-4">
          <Link to="/" className="flex items-center justify-center w-[36px] h-[36px] hover:opacity-80 transition-opacity cursor-pointer mt-0.5">
            <div className="scale-[0.5625] origin-center flex items-center justify-center pointer-events-none">
              <ThinkingOrb state={orbState} size={64} theme="light" />
            </div>
          </Link>
          <div className="flex flex-col items-start gap-1 font-sans">
            <Link to="/" className="text-[18px] font-bold tracking-tight text-[#373737]">
              <LetterSwapForward label="POFEI" />
            </Link>
            <p className="text-[12px] tracking-[0.2em] font-bold text-[#a0a0a0] -mt-1">
              Product Designer
            </p>
          </div>
        </div>

        {/* Mobile version */}
        <div className="flex md:hidden flex-col items-start font-sans">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center justify-center w-[36px] h-[36px] hover:opacity-80 transition-opacity cursor-pointer">
              <div className="scale-[0.5625] origin-center flex items-center justify-center pointer-events-none">
                <ThinkingOrb state={orbState} size={64} theme="light" />
              </div>
            </Link>
            <Link to="/" className="text-[18px] font-bold tracking-tight text-[#373737]">
              <LetterSwapForward label="POFEI" />
            </Link>
          </div>
          <p className="text-[12px] tracking-[0.2em] font-bold text-[#a0a0a0] pl-[48px] -mt-2">
            Product Designer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          <nav className="flex flex-wrap justify-center items-center gap-6 text-[13px] font-semibold tracking-widest text-[#171717] font-sans -translate-x-1">
            <Link to="/" className="hover:text-[#707070] transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-[#707070] transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-[#707070] transition-colors">Contact</Link>
            <a href="https://github.com/PatrickJan88/My-Portfolio-Web.git" target="_blank" rel="noreferrer" className="hover:text-[#707070] transition-colors">GitHub</a>
          </nav>
        </div>
      </div>

      <div className="w-full relative z-10 border-t border-black/5 min-h-[32px] py-2 md:py-0 flex items-center justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-0">
          <span className="text-center md:text-left text-[12px] tracking-[0.15em] font-semibold font-sans text-[#333333] pl-0 md:pl-[52px]">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
          <span className="text-center md:text-right text-[10px] tracking-[0.15em] font-bold text-[#333333]">
            💡 Imagining &nbsp;&nbsp; 💻 Building &nbsp;&nbsp; 🚀 Beyond
          </span>
        </div>
      </div>
    </footer>
  );
}
