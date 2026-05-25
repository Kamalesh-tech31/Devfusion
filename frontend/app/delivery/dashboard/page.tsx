import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import DeliveryCard from "@/components/delivery/DeliveryCard";
import { deliveryRecords } from "@/components/delivery/deliveryData";
import StatsCard from "@/components/delivery/StatsCard";

export default function DashboardPage() {
  const activeDeliveries = deliveryRecords.filter(
    (item) => item.status !== "Delivered" && item.status !== "Returned"
  ).length;

  const completedDeliveries = deliveryRecords.filter(
    (item) => item.status === "Delivered"
  ).length;

  const followUps = deliveryRecords.filter(
    (item) => item.status === "Failed Attempt"
  ).length;

  return (
    <div className="flex flex-col lg:flex-row bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A1A1AA]">
                Delivery control center
              </p>
              <h1 className="text-3xl font-bold text-white mt-2">
                Premium delivery dashboard
              </h1>
              <p className="text-[#D5D5D5] mt-3 max-w-2xl">
                Monitor active routes, status shifts, and customer updates in one
                unified, premium logistics workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-[#27272A] bg-[#1A1A1A] px-4 py-3">
              <p className="text-sm text-[#A1A1AA]">Live sync</p>
              <p className="text-lg font-semibold text-white mt-1">
                3 active route updates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <StatsCard
              title="Active routes"
              value={String(activeDeliveries)}
              description="Live deliveries in motion"
              trend="+8%"
            />

            <StatsCard
              title="Completed"
              value={String(completedDeliveries)}
              description="Orders delivered successfully"
              trend="On track"
            />

            <StatsCard
              title="Follow-ups"
              value={String(followUps)}
              description="Agents need attention"
              trend="Priority"
            />

            <StatsCard
              title="Avg. ETA"
              value="02:05 PM"
              description="Across all active routes"
              trend="Stable"
            />
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#A1A1AA]">Priority routes</p>
                  <h2 className="text-xl font-semibold text-white mt-1">
                    Assigned deliveries
                  </h2>
                </div>

                <p className="text-sm text-[#D5D5D5]">Updated in real time</p>
              </div>

              <div className="mt-5 grid gap-4">
                {deliveryRecords.map((delivery) => (
                  <DeliveryCard
                    key={delivery.id}
                    id={delivery.id}
                    customer={delivery.customer}
                    address={delivery.address}
                    eta={delivery.eta}
                    status={delivery.status}
                    priority={delivery.priority}
                    contact={delivery.contact}
                    location={delivery.location}
                    lastUpdated={delivery.lastUpdated}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
                <p className="text-sm text-[#A1A1AA]">Operational snapshot</p>
                <h2 className="text-xl font-semibold text-white mt-1">
                  Route health
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#D5D5D5]">On-time completion</span>
                    <span className="text-white font-semibold">92%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#D5D5D5]">Customer response</span>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#D5D5D5]">Priority exceptions</span>
                    <span className="text-white font-semibold">2</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
                <p className="text-sm text-[#A1A1AA]">Agent notes</p>
                <h2 className="text-xl font-semibold text-white mt-1">
                  Recommended action
                </h2>

                <div className="mt-4 rounded-xl border border-[#27272A] bg-[#111111] p-4">
                  <p className="text-sm text-[#D5D5D5]">
                    Follow up with the failed attempt route and update the
                    customer contact channel within the next 15 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}