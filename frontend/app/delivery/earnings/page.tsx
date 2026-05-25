import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import StatsCard from "@/components/delivery/StatsCard";

export default function EarningsPage() {
  return (
    <div className="flex bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-white">
            Earnings Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatsCard
              title="Today's Earnings"
              value="₹2,450"
            />

            <StatsCard
              title="Weekly Earnings"
              value="₹12,700"
            />

            <StatsCard
              title="Monthly Earnings"
              value="₹48,300"
            />
          </div>

          <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl p-6 mt-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Incentives
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-white">
                <span>Completed 50 Deliveries</span>
                <span className="text-[#7F1D1D]">
                  +₹2,000
                </span>
              </div>

              <div className="flex justify-between text-white">
                <span>Fast Delivery Bonus</span>
                <span className="text-[#7F1D1D]">
                  +₹850
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}