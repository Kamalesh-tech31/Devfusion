interface Props {
  title: string;
  value: string;
  description?: string;
  trend?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  trend,
}: Props) => {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#27272A] hover:border-[#7F1D1D]/60 transition-all duration-200">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#A1A1AA]">{title}</p>

        {trend ? (
          <span className="text-xs text-[#F5D0D0]">{trend}</span>
        ) : null}
      </div>

      <h2 className="text-3xl font-bold mt-3 text-white">{value}</h2>

      {description ? (
        <p className="text-sm text-[#D5D5D5] mt-2">{description}</p>
      ) : null}
    </div>
  );
};

export default StatsCard;