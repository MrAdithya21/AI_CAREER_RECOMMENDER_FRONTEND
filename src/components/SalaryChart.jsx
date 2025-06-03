import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SalaryChart = ({ start = 60000, end = 200000 }) => {
  const years = Array.from({ length: 10 }, (_, i) => i + 1);
  const data = years.map((year, i) => ({
    year: `Year ${year}`,
    salary: Math.round(start + ((end - start) / 9) * i),
  }));

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-2">📈 Estimated Salary Growth Over 10 Years</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="salary" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;
