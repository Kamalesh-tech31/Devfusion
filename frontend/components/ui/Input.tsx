interface InputProps {
  type?: string;
  placeholder: string;
}

export default function Input({ type = "text", placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        bg-[#0B0B0B]
        border
        border-neutral-800
        focus:border-[#7F1D1D]
        outline-none
        px-4
        py-3
        rounded-2xl
        text-white
        placeholder:text-neutral-500
        transition-all
      "
    />
  );
}
