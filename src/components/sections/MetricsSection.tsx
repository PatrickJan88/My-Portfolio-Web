import { useRef } from "react";
import { useInView } from "motion/react";
import { CountingNumber } from "../ui/counting-number";

const stats = [
  { target: 20, suffix: "+", label: "Projects" },
  { target: 10, suffix: "+", label: "Client engagements" },
  { target: 3, suffix: "+\u00A0yrs", label: "B2B Fintech" },
  { target: 8, suffix: "\u00A0yrs", label: "UX/UI Design" },
];

export function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full bg-neutral-50 pb-16 md:pb-24 pt-4 relative z-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 sm:grid-cols-4 w-full max-w-6xl">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex flex-col items-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-medium tracking-tight text-neutral-900 mb-3 md:mb-4 flex items-baseline">
                <CountingNumber 
                  target={stat.target} 
                  autoStart={isInView} 
                  transition={{ duration: 1, ease: "easeOut", type: "tween" }}
                />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-neutral-500 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
