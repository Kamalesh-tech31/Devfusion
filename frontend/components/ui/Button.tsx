"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button
      className="
        bg-[#7F1D1D]
        hover:bg-[#991B1B]
        active:scale-95
        transition-all
        duration-150
        px-4
        py-2
        rounded-2xl
        text-white
        font-medium
        cursor-pointer
        shadow-lg
        shadow-black/30
      "
    >
      {children}
    </button>
  );
};

export default Button;