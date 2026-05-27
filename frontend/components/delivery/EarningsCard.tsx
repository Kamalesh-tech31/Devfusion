interface Props {
  title: string;
  value: string;
  hint?: string;
}

const EarningsCard = ({ title, value, hint }: Props) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl p-5">
      <p className="text-sm text-[#A1A1AA]">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
      {hint ? <p className="text-sm text-[#A1A1AA] mt-2">{hint}</p> : null}
    </div>
  );
};

export default EarningsCard;
