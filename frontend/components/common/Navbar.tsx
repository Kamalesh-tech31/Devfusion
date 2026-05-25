"use client";

import { useEffect, useState } from "react";

import { Truck } from "lucide-react";

const Navbar = () => {
  const [time, setTime] =
    useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const current =
        new Date().toLocaleTimeString();

      setTime(current);
    }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <nav className="h-16 border-b border-[#27272A] bg-[#111111] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Truck className="text-[#7F1D1D]" />

        <h1 className="text-xl font-bold text-white">
          LogiTrack
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-sm text-[#A1A1AA]">
            Agent Online
          </span>
        </div>

        <div className="text-sm text-white">
          {time}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;