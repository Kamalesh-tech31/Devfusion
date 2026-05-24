interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  text,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-[#7F1D1D]
        hover:bg-[#991B1B]
        transition-all
        duration-300
        text-white
        py-3
        rounded-2xl
        font-semibold
        shadow-lg
        hover:scale-[1.02]
      "
    >
      {text}
    </button>
  );
}
