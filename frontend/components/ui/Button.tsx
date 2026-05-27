"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`
        w-full
        bg-[#7F1D1D]
        hover:bg-[#991B1B]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:bg-[#4C1D1D]
        transition-all
        duration-300
        px-4
        py-3
        rounded-2xl
        text-white
        font-semibold
        cursor-pointer
        shadow-lg
        shadow-black/30
        hover:scale-[1.02]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
