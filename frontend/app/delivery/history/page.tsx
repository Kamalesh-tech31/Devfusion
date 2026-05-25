import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { deliveryHistory } from "@/components/delivery/deliveryData";
import StatsCard from "@/components/delivery/StatsCard";
import StatusBadge from "@/components/delivery/StatusBadge";

export default function HistoryPage() {
  const completedCount = deliveryHistory.filter(
    (item) => item.status === "Delivered"
  ).length;

  const returnCount = deliveryHistory.filter(
    (item) => item.status === "Returned"
  ).length;

  return (
    <div className="flex flex-col lg:flex-row bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A1A1AA]">
              Delivery record
            </p>
            <h1 className="text-3xl font-bold text-white mt-2">
              Completed deliveries history
            </h1>
            <p className="text-[#D5D5D5] mt-3 max-w-2xl">
              Review the delivery lifecycle with premium visibility into delivery
              completion, returns, and route outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <StatsCard
              title="Completed"
              value={String(completedCount)}
              description="Successful handoffs"
            />

            <StatsCard
              title="Returned"
              value={String(returnCount)}
              description="Customer or route returns"
            />

            <StatsCard
              title="Average resolution"
              value="1.4 days"
              description="Time to close delivery outcomes"
            />
          </div>

          <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#111111]">
                  <tr>
                    <th className="text-left p-4 text-[#A1A1AA]">Delivery ID</th>
                    <th className="text-left p-4 text-[#A1A1AA]">Customer</th>
                    <th className="text-left p-4 text-[#A1A1AA]">City</th>
                    <th className="text-left p-4 text-[#A1A1AA]">Status</th>
                    <th className="text-left p-4 text-[#A1A1AA]">Last sync</th>
                  </tr>
                </thead>

                <tbody>
                  {deliveryHistory.map((delivery) => (
                    <tr
                      key={delivery.id}
                      className="border-t border-[#27272A]"
                    >
                      <td className="p-4 text-white">{delivery.id}</td>
                      <td className="p-4 text-white">{delivery.customer}</td>
                      <td className="p-4 text-[#D5D5D5]">{delivery.city}</td>
                      <td className="p-4">
                        <StatusBadge status={delivery.status} />
                      </td>
                      <td className="p-4 text-[#D5D5D5]">
                        {delivery.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}