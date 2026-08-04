import { cn } from "@/lib/utils";

interface BorderGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: [string, string, string, string, string];
  className?: string;
  children?: React.ReactNode;
}

const defaultColors: [string, string, string, string, string] = [
  "#FCAE0B", // --color-accent-yellow
  "#4DB440", // --color-accent-green
  "#A0A0A0", // --color-primary-400
  "#4A4A4A", // --color-primary-600
  "#FCAE0B",
];

const BorderGradientButton = ({
  colors = defaultColors,
  className,
  children,
  ...props
}: BorderGradientButtonProps) => {
  return (
    <button
      className={cn(
        "relative rounded-full animate-rainbow bg-[length:200%] active:scale-[0.95] group p-[1.5px] transition-transform",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(",")})`,
      }}
      {...props}
    >
      <div className="z-0 absolute inset-[1.5px] bg-white group-hover:bg-white/90 backdrop-blur-3xl rounded-full transition-all saturate-200" />
      <span className="z-10 text-neutral-900 pointer-events-none relative flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-widest uppercase font-mono">
        {children ?? "Gradient Border"}
      </span>
    </button>
  );
};

export default BorderGradientButton;
