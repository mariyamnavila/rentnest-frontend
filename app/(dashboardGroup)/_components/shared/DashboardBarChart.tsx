'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

type BarDataItem = {
  name: string;
  value: number;
};

type DashboardBarChartProps = {
  title: string;
  data: BarDataItem[];
};

const COLORS = ['#CFA190', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string } }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-bold text-[#222222] dark:text-white">{payload[0].payload.name}</p>
        <p className="text-xs text-[#CFA190] font-black">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

function BarShape(props: Record<string, unknown>) {
  const { x, y, width, height, index } = props as {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
  };
  const fill = COLORS[(index as number) % COLORS.length];

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={6}
      ry={6}
      fill={fill}
    />
  );
}

export function DashboardBarChart({ title, data }: DashboardBarChartProps) {
  return (
    <div>
      <h3 className="text-xs font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-3">{title}</h3>
      <div className="h-51.25">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: -15 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(207, 161, 144, 0.08)' }} />
            <Bar dataKey="value" shape={<BarShape />} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
