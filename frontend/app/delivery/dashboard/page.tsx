import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import StatsCard from "@/components/delivery/StatsCard";
import DeliveryCard from "@/components/delivery/DeliveryCard";

export default function DashboardPage() {
  return (
    <div className="flex bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-white">
            Delivery Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatsCard
              title="Today's Deliveries"
              value="18"
            />

            <StatsCard
              title="Completed"
              value="12"
            />

            <StatsCard
              title="Earnings"
              value="₹4,250"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white mb-5">
              Assigned Deliveries
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <DeliveryCard
                customer="Rahul Sharma"
                address="Chennai, Tamil Nadu"
                status="Out for Delivery"
              />

              <DeliveryCard
                customer="Arun Kumar"
                address="Coimbatore, Tamil Nadu"
                status="Pending"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}