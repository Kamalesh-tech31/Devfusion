import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { earningsHighlights, incentiveHighlights } from "@/components/delivery/deliveryData";
import EarningsCard from "@/components/delivery/EarningsCard";
import StatsCard from "@/components/delivery/StatsCard";

export default function EarningsPage() {
  return (
    <div className="flex flex-col lg:flex-row bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A1A1AA]">
              Earnings tracker
            </p>
            <h1 className="text-3xl font-bold text-white mt-2">
              Revenue performance dashboard
            </h1>
            <p className="text-[#D5D5D5] mt-3 max-w-2xl">
              Track payout momentum, premium route bonuses, and conversion-rich
              delivery performance in one premium earnings workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {earningsHighlights.map((item) => (
              <StatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
              <p className="text-sm text-[#A1A1AA]">Performance pulse</p>
              <h2 className="text-xl font-semibold text-white mt-1">
                Earnings summary
              </h2>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <EarningsCard
                  title="Pending payout"
                  value="₹1,300"
                  hint="Expected in 2 business days"
                />

                <EarningsCard
                  title="Premium routes"
                  value="₹1,450"
                  hint="2 active high-value routes"
                />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#D5D5D5]">On-time rate</span>
                  <span className="text-white font-semibold">94%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#D5D5D5]">Average route value</span>
                  <span className="text-white font-semibold">₹612</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#D5D5D5]">Repeat customer share</span>
                  <span className="text-white font-semibold">68%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
              <p className="text-sm text-[#A1A1AA]">Incentives</p>
              <h2 className="text-xl font-semibold text-white mt-1">
                Bonus tracker
              </h2>

              <div className="mt-5 space-y-3">
                {incentiveHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-[#27272A] bg-[#111111] px-4 py-3"
                  >
                    <span className="text-sm text-[#D5D5D5]">{item.label}</span>
                    <span className="text-sm font-semibold text-[#F5D0D0]">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}