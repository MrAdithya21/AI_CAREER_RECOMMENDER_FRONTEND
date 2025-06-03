import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const MatchDonutChart = ({ score }) => {
  const data = [
    { name: "Match", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const COLORS = ["url(#gradientMatch)", "#e5e7eb"];

  return (
    <div className="w-full max-w-xs mx-auto text-center">
      <h4 className="text-lg font-semibold text-purple-400 mb-2">🎯 Match Score</h4>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <defs>
            <linearGradient id="gradientMatch" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 text-2xl font-bold text-green-300">{score}%</div>
    </div>
  );
};

export default MatchDonutChart;
