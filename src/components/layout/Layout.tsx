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
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900 flex flex-col relative">
      {/* Spatial Background Elements - Global */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] opacity-[0.05] rounded-full"
          style={{ background: 'radial-gradient(circle, #889DFF 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] opacity-[0.03] rounded-full"
          style={{ background: 'radial-gradient(circle, #3E57FF 0%, transparent 70%)' }}
        />
      </div>

      {/* UI Decorative Lines - Global */}
      <div className="fixed left-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>
      <div className="fixed right-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none z-0"></div>

      <Navbar />

      <main
        className={cn(
          "grow flex flex-col relative w-full z-10 pb-0",
          noTopPadding ? "pt-0" : "pt-24",
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
