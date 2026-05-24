"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4780 },
  { month: "May", revenue: 5890 },
  { month: "Jun", revenue: 6390 },
  { month: "Jul", revenue: 7490 },
];

export default function RevenueChart() {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Revenue Analytics</h2>
        <p className="text-gray-400 mt-1">Monthly revenue growth overview</p>
      </div>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#666" />

            <YAxis stroke="#666" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #7F1D1D",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#991B1B"
              strokeWidth={4}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
