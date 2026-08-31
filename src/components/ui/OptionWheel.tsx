import { useCallback } from "react";

export interface OptionWheelProps {
  items: string[];
  selectedIndex: number;
  scrollProgress?: number; // Continuous fractional index (e.g. 0.0 to 3.0)
  onSelect?: (index: number) => void;
  className?: string;
}

export function OptionWheel({
  items,
  selectedIndex,
  scrollProgress,
  onSelect,
  className = "",
}: OptionWheelProps) {
  // Use scrollProgress if provided, else snap to selectedIndex
  const currentPos = scrollProgress !== undefined ? scrollProgress : selectedIndex;

  // Static Arc Geometry Math
  // The arc curves gently to the right like a crescent: (
  // Center of curvature is to the left: (ARC_X_OFFSET - RADIUS, CENTER_Y)
  const RADIUS = 780; // Radius in px
  const ARC_X_OFFSET = 180; // Peak X coordinate of the arc (where angle = 0)
  const CENTER_Y = 300; // Center Y coordinate in container
  const ANGLE_STEP = 0.28; // Radian separation between each node (~16 deg, increased margin)

  // Calculate coordinates for a node given its offset from the active center position
  const getNodePosition = useCallback(
    (index: number) => {
      // Relative offset from current continuous position
      const offset = currentPos - index;
      const angle = offset * ANGLE_STEP;

      const x = ARC_X_OFFSET - RADIUS * (1 - Math.cos(angle));
      const y = CENTER_Y + RADIUS * Math.sin(angle);

      return { x, y, angle };
    },
    [currentPos]
  );

  // 1. Static Full Background Arc Line: spans from far above the screen top to far below the screen bottom
  const STATIC_TOP_ANGLE = -1.15; // ~ -66 degrees, reaches beyond top screen edge
  const STATIC_BOTTOM_ANGLE = 1.15; // ~ +66 degrees, reaches beyond bottom screen edge

  const staticTopX = ARC_X_OFFSET - RADIUS * (1 - Math.cos(STATIC_TOP_ANGLE));
  const staticTopY = CENTER_Y + RADIUS * Math.sin(STATIC_TOP_ANGLE);

  const staticBottomX = ARC_X_OFFSET - RADIUS * (1 - Math.cos(STATIC_BOTTOM_ANGLE));
  const staticBottomY = CENTER_Y + RADIUS * Math.sin(STATIC_BOTTOM_ANGLE);

  const staticFullArcD = `M ${staticBottomX} ${staticBottomY} A ${RADIUS} ${RADIUS} 0 0 0 ${staticTopX} ${staticTopY}`;

  // 2. Active Black Line: moves dynamically along the arc from Node 01 up to current active node
  const node0Angle = Math.max(0, currentPos * ANGLE_STEP);
  const activeStartX = ARC_X_OFFSET - RADIUS * (1 - Math.cos(node0Angle));
  const activeStartY = CENTER_Y + RADIUS * Math.sin(node0Angle);

  const activeEndX = ARC_X_OFFSET; // cos(0) = 1 => ARC_X_OFFSET
  const activeEndY = CENTER_Y; // sin(0) = 0 => CENTER_Y

  const activeArcD =
    node0Angle > 0.002
      ? `M ${activeStartX} ${activeStartY} A ${RADIUS} ${RADIUS} 0 0 0 ${activeEndX} ${activeEndY}`
      : "";

  return (
    <div
      className={`relative w-full h-[520px] sm:h-[600px] select-none flex items-center ${className}`}
    >
      {/* SVG Arc Line that runs continuous under all circle nodes and extends to section edges */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
        viewBox="0 0 320 600"
      >
        {/* Fixed Static Grey Background Arc Line extended to viewport top & bottom */}
        <path
          d={staticFullArcD}
          fill="none"
          stroke="#2e323b"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Dynamic White Progress Arc Segment connecting Node 01 to active position */}
        {activeArcD && (
          <path
            d={activeArcD}
            fill="none"
            stroke="#fafafb"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Numbered Nodes along the arc with solid opaque background */}
      {items.map((label, index) => {
        const { x, y } = getNodePosition(index);
        const isSelected = selectedIndex === index;
        const distFromCenter = Math.abs(currentPos - index);
        const textOpacity = Math.max(0.4, 1 - distFromCenter * 0.25);

        return (
          <button
            key={`${label}-${index}`}
            type="button"
            onClick={() => onSelect?.(index)}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-10 transition-transform duration-150 ease-out focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label={`Select Phase ${label}`}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-sans transition-all duration-300 ${
                isSelected
                  ? "bg-white text-[#0f1012] shadow-2xl shadow-black/90 scale-105 ring-4 ring-white/10 text-lg md:text-xl font-bold"
                  : "bg-[#181a1f] border border-[#2d313b] text-neutral-300 hover:bg-[#22262f] hover:text-white hover:border-neutral-400 shadow-[0_6px_20px_rgba(0,0,0,0.7)] text-base md:text-lg font-medium"
              }`}
            >
              <span style={{ opacity: isSelected ? 1 : textOpacity }}>
                {label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default OptionWheel;
