'use client';

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type PieDataItem = {
  name: string;
  value: number;
};

type DashboardPieChartProps = {
  title: string;
  data: PieDataItem[];
};

const COLORS = [
  '#CFA190',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#8b5cf6',
  '#ef4444',
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-bold text-[#222222] dark:text-white">
          {payload[0].name}
        </p>

        <p className="text-xs text-[#CFA190] font-black">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
}

type PieShapeProps = {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
};

function PieShape({
  cx = 0,
  cy = 0,
  innerRadius = 0,
  outerRadius = 0,
  startAngle = 0,
  endAngle = 0,
  fill,
}: PieShapeProps) {
  const RADIAN = Math.PI / 180;

  const startOuter = {
    x: cx + outerRadius * Math.cos(-startAngle * RADIAN),
    y: cy + outerRadius * Math.sin(-startAngle * RADIAN),
  };

  const endOuter = {
    x: cx + outerRadius * Math.cos(-endAngle * RADIAN),
    y: cy + outerRadius * Math.sin(-endAngle * RADIAN),
  };

  const startInner = {
    x: cx + innerRadius * Math.cos(-startAngle * RADIAN),
    y: cy + innerRadius * Math.sin(-startAngle * RADIAN),
  };

  const endInner = {
    x: cx + innerRadius * Math.cos(-endAngle * RADIAN),
    y: cy + innerRadius * Math.sin(-endAngle * RADIAN),
  };

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const path = [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
    'Z',
  ].join(' ');

  return (
    <path
      d={path}
      fill={fill}
      stroke="none"
    />
  );
}

export function DashboardPieChart({
  title,
  data,
}: DashboardPieChartProps) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="w-full">
      <h3 className="text-xs font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-4">
        {title}
      </h3>

      <div className="flex items-center gap-5">
        {/* Pie Chart */}
        <div className="w-36 h-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={58}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                shape={(props) => {
                  const index = props.index ?? 0;

                  return (
                    <PieShape
                      {...props}
                      fill={COLORS[index % COLORS.length]}
                    />
                  );
                }}
              />

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 min-w-0 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 truncate">
                  {item.name}
                </span>
              </div>

              <span className="text-xs font-bold text-gray-700 dark:text-slate-200 shrink-0">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 pt-3 border-t border-[#e4e4e4] dark:border-[#2e3440] flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide">
          Total
        </span>

        <span className="text-sm font-black text-[#222222] dark:text-white">
          {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}