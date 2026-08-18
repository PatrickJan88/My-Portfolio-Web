import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isProjectDetail =
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects";
  const noTopPadding = isProjectDetail;

  return (
    <div className="relative w-full text-neutral-900 bg-black">
      
      {/* Main Content Wrapper - z-10 slides up to reveal footer */}
      <div className="relative z-10 flex flex-col min-h-screen bg-neutral-50 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        
        {/* Spatial Background Elements - Bounded Sticky */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="sticky top-0 w-full h-screen">
            <div 
              className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] opacity-[0.05] rounded-full"
              style={{ background: 'radial-gradient(circle, #A0A0A0 0%, transparent 70%)' }}
            />
            <div 
              className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] opacity-[0.03] rounded-full"
              style={{ background: 'radial-gradient(circle, #333333 0%, transparent 70%)' }}
            />
          </div>
        </div>

        {/* UI Decorative Lines - Global */}
        <div className="absolute left-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>

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
    </div>
  );
}
