"use client";

import { useEffect, useState } from "react";

import { MapPinned, Truck } from "lucide-react";

const Navbar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-20 border-b border-[#27272A] bg-[#111111]/95 backdrop-blur-sm">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#1A1A1A] border border-[#27272A]">
            <Truck className="text-[#7F1D1D]" size={18} />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A1A1AA]">
              LogiTrack
            </p>
            <h1 className="text-sm font-semibold text-white">
              Premium Delivery Command Center
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-[#27272A] bg-[#1A1A1A]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-[#D4D4D8]">Agent Online</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#1A1A1A] px-3 py-2">
            <MapPinned size={16} className="text-[#7F1D1D]" />
            <span className="text-sm text-white">{time || "--:--:--"}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;