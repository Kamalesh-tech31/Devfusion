interface Props {
  status: string;
}

const StatusBadge = ({ status }: Props) => {
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-400";

      case "Delivered":
        return "bg-green-500/20 text-green-400";

      case "Failed Attempt":
        return "bg-red-500/20 text-red-400";

      case "Returned":
        return "bg-orange-500/20 text-orange-400";

      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${getStatusColor()}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;