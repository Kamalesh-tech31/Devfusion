const deliveries = [
  {
    id: "#1021",
    customer: "Rahul",
    agent: "Karan",
    status: "Out for Delivery",
  },
  {
    id: "#1022",
    customer: "Aman",
    agent: "Vijay",
    status: "Delivered",
  },
  {
    id: "#1023",
    customer: "Priya",
    agent: "Sanjay",
    status: "Pending",
  },
];

export default function DeliveryTable() {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Delivery Orders</h2>

      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#0B0B0B] border border-[#1F1F1F]"
          >
            <div>
              <h3 className="text-white font-semibold">{delivery.id}</h3>

              <p className="text-gray-400 text-sm">{delivery.customer}</p>
            </div>

            <div className="text-gray-300">{delivery.agent}</div>

            <div className="text-[#EF4444] text-sm">{delivery.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
