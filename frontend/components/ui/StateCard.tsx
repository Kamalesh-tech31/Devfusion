import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 hover:border-[#7F1D1D] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-3 text-white">{value}</h2>

          <p className="text-green-500 text-sm mt-3">{change}</p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center text-[#DC2626]">
          {icon}
        </div>
      </div>
    </div>
  );
}
