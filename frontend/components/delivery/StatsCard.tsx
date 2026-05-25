interface Props {
  title: string;
  value: string;
}

const StatsCard = ({ title, value }: Props) => {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#27272A]">
      <p className="text-[#A1A1AA]">{title}</p>

      <h2 className="text-3xl font-bold mt-2 text-white">
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;