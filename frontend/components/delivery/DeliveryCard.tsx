import { MapPin, PackageCheck } from "lucide-react";

import StatusBadge from "./StatusBadge";

interface Props {
  customer: string;
  address: string;
  status: string;
}

const DeliveryCard = ({ customer, address, status }: Props) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#A1A1AA]">Customer</p>
          <h3 className="text-lg font-semibold text-white mt-1">{customer}</h3>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="flex items-center gap-2 mt-4 text-[#A1A1AA]">
        <MapPin size={16} className="text-[#7F1D1D]" />
        <span>{address}</span>
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm text-[#F4F4F5]">
        <PackageCheck size={16} className="text-[#7F1D1D]" />
        <span>Pickup & delivery scheduled</span>
      </div>
    </div>
  );
};

export default DeliveryCard;
