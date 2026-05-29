interface Props {
  status: string;
}

const StatusBadge = ({ status }: Props) => {
  const statusStyles: Record<string, string> = {
    Pending: "border-[#3F1F1F] bg-[#111111] text-[#F3F4F6]",
    "Out for Delivery": "border-[#7F1D1D] bg-[#2A1111] text-[#FCE7E7]",
    Delivered: "border-[#991B1B] bg-[#111111] text-[#FDF2F2]",
    "Failed Attempt": "border-[#5F1717] bg-[#130B0B] text-[#FADDDD]",
    Returned: "border-[#7F1D1D] bg-[#130B0B] text-[#F9DEDE]",
  };

  const classes =
    statusStyles[status] ||
    "border-[#27272A] bg-[#111111] text-[#F3F4F6]";

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        border
        ${classes}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;