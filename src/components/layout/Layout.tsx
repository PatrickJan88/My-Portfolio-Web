import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { ProgressiveBlur } from "../ui/progressive-blur";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProjectDetail =
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects";
  const noTopPadding = isProjectDetail || isHome;

  return (
    <div className="relative w-full text-neutral-900 bg-[#17191c]">
      {/* Main Content Wrapper - z-10 slides up to reveal footer */}
      <div className="relative z-10 flex flex-col min-h-screen bg-fog-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        
        {/* Spatial Background Elements - Bounded Sticky */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="sticky top-0 w-full h-screen">
            <div 
              className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] opacity-[0.05] rounded-full"
              style={{ background: 'radial-gradient(circle, #979799 0%, transparent 70%)' }}
            />
            <div 
              className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] opacity-[0.03] rounded-full"
              style={{ background: 'radial-gradient(circle, #17191c 0%, transparent 70%)' }}
            />
          </div>
        </div>

        {/* UI Decorative Lines - Global */}
        <div className="absolute left-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>

        {/* Floating Navbar (z-50) */}
        <Navbar />

        <main
          className={cn(
            "grow flex flex-col relative w-full z-10 pb-0",
            noTopPadding ? "pt-0" : "pt-24",
          )}
        >
          {children}
        </main>
      </div>

      {/* Footer Reveal Wrapper */}
      <div className="sticky bottom-0 z-0 w-full">
        <Footer />
      </div>

      {/* Pure Natural Scroll Blur - 100% transparent, smooth 8px backdrop blur, 140px bottom zone, suppressed at footer */}
      <ProgressiveBlur
        position="bottom"
        height="140px"
        blurAmount="8px"
        fixed={true}
        scrollOnly={true}
        meltDelay={300}
        footerThreshold={220}
      />
    </div>
  );
}
