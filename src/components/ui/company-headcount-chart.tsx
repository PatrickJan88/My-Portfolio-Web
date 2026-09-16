import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface HeadcountDataPoint {
  date: Date;
  totalHeadcount: number;
  growth1Year: number;
  growth2Year: number;
}

export const HEADCOUNT_DATA: HeadcountDataPoint[] = [
  {
    date: new Date(2026, 0, 1),
    totalHeadcount: 600,
    growth1Year: 400,
    growth2Year: 100,
  },
  {
    date: new Date(2026, 1, 1),
    totalHeadcount: 620,
    growth1Year: 405,
    growth2Year: 160,
  },
  {
    date: new Date(2026, 2, 1),
    totalHeadcount: 630,
    growth1Year: 400,
    growth2Year: 170,
  },
  {
    date: new Date(2026, 3, 1),
    totalHeadcount: 650,
    growth1Year: 410,
    growth2Year: 190,
  },
  {
    date: new Date(2026, 4, 1),
    totalHeadcount: 600,
    growth1Year: 320,
    growth2Year: 200,
  },
  {
    date: new Date(2026, 5, 1),
    totalHeadcount: 650,
    growth1Year: 430,
    growth2Year: 230,
  },
  {
    date: new Date(2026, 6, 1),
    totalHeadcount: 620,
    growth1Year: 400,
    growth2Year: 200,
  },
  {
    date: new Date(2026, 7, 1),
    totalHeadcount: 750,
    growth1Year: 540,
    growth2Year: 300,
  },
  {
    date: new Date(2026, 8, 1),
    totalHeadcount: 780,
    growth1Year: 490,
    growth2Year: 390,
  },
  {
    date: new Date(2026, 9, 1),
    totalHeadcount: 750,
    growth1Year: 450,
    growth2Year: 300,
  },
  {
    date: new Date(2026, 10, 1),
    totalHeadcount: 780,
    growth1Year: 480,
    growth2Year: 340,
  },
  {
    date: new Date(2026, 11, 1),
    totalHeadcount: 820,
    growth1Year: 500,
    growth2Year: 450,
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    stroke?: string;
  }>;
  label?: Date | string;
}

const ChartCustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dateObj = label instanceof Date ? label : null;
    const formattedDate = dateObj
      ? dateObj.toLocaleDateString(undefined, { month: "short", year: "numeric" })
      : String(label ?? "");

    return (
      <div className="bg-[#0c0d0e]/95 text-white backdrop-blur-md border border-white/15 px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] select-none pointer-events-none z-50">
        <div className="font-mono text-neutral-400 text-[9px] border-b border-white/10 pb-0.5 mb-1 font-semibold">
          {formattedDate}
        </div>
        <div className="flex flex-col gap-1">
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 text-[9px]">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color || entry.stroke }}
                />
                <span>{entry.name}</span>
              </span>
              <span className="font-mono font-medium text-white">
                {Number(entry.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const CompanyHeadcountChart: React.FC = () => {
  return (
    <div className="w-full flex flex-col select-none">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between px-0.5 pb-1.5 border-b border-neutral-200/60 mb-1">
        <span className="text-[10px] font-mono tracking-wider text-neutral-700 font-bold">
          Headcount Dynamics
        </span>
        <span className="text-[9px] font-mono font-medium text-[#2563EB] bg-blue-50/80 border border-blue-200/80 px-1.5 py-0.5 rounded-full">
          +36.6% YoY
        </span>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-[132px] sm:h-[140px] relative -ml-1.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={HEADCOUNT_DATA}
            margin={{ top: 6, right: 6, left: -22, bottom: 0 }}
          >
            <defs>
              <linearGradient id="primary-blue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="2 2"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval={2}
              tickFormatter={(val: Date) =>
                val instanceof Date
                  ? val.toLocaleDateString(undefined, { month: "short" })
                  : String(val)
              }
              tick={{ fontSize: 8, fill: "#6B7280" }}
              padding={{ left: 6, right: 6 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 900]}
              ticks={[0, 300, 600, 900]}
              tickFormatter={(val: number) => Number(val).toLocaleString()}
              tick={{ fontSize: 8, fill: "#6B7280" }}
            />

            <Tooltip
              content={<ChartCustomTooltip />}
              cursor={{
                stroke: "#2563EB",
                strokeWidth: 1.5,
                strokeDasharray: "2 2",
              }}
            />

            {/* Total Headcount (Primary Blue with Gradient Glow) */}
            <Area
              isAnimationActive={false}
              dataKey="totalHeadcount"
              name="Total Headcount"
              type="monotone"
              stroke="#2563EB"
              strokeWidth={2}
              fill="url(#primary-blue-gradient)"
              activeDot={{
                r: 4,
                fill: "#2563EB",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />

            {/* 1-Year Growth */}
            <Area
              isAnimationActive={false}
              dataKey="growth1Year"
              name="1-Year Growth"
              type="monotone"
              stroke="#60A5FA"
              strokeWidth={1.75}
              fill="none"
              activeDot={{
                r: 3.5,
                fill: "#60A5FA",
                stroke: "#FFFFFF",
                strokeWidth: 1.5,
              }}
            />

            {/* 2-Year Growth */}
            <Area
              isAnimationActive={false}
              dataKey="growth2Year"
              name="2-Year Growth"
              type="monotone"
              stroke="#1D4ED8"
              strokeWidth={1.75}
              fill="none"
              activeDot={{
                r: 3.5,
                fill: "#1D4ED8",
                stroke: "#FFFFFF",
                strokeWidth: 1.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
