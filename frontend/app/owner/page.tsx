import DashboardCard from "@/components/owner/DashboardCard";

import { DollarSign, ShoppingCart, Package, Truck } from "lucide-react";

export default function OwnerDashboard() {
  return (
    <div className="p-8">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard Overview</h1>

        <p className="text-neutral-500 mt-2">
          Monitor your logistics business performance
        </p>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Revenue"
          value="$24,500"
          change="+12.5%"
          icon={<DollarSign size={24} />}
        />

        <DashboardCard
          title="Orders"
          value="1,248"
          change="+8.2%"
          icon={<ShoppingCart size={24} />}
        />

        <DashboardCard
          title="Products"
          value="342"
          change="+4.1%"
          icon={<Package size={24} />}
        />

        <DashboardCard
          title="Deliveries"
          value="892"
          change="+15.3%"
          icon={<Truck size={24} />}
        />
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* RECENT ORDERS */}
        <div
          className="
            xl:col-span-2
            bg-[#111111]
            border
            border-neutral-900
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>

            <a
              href="/owner/orders"
              className="
                bg-[#7F1D1D]
                hover:bg-[#991B1B]
                transition-all
                px-5
                py-2
                rounded-2xl
                text-white
                text-sm
                inline-block
              "
            >
              View All
            </a>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between
                  bg-[#0B0B0B]
                  border
                  border-neutral-800
                  rounded-2xl
                  p-4
                "
              >
                <div>
                  <h3 className="text-white font-medium">
                    Order #{1000 + item}
                  </h3>

                  <p className="text-neutral-500 text-sm mt-1">
                    Customer delivery order
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-white font-semibold">$240</p>

                  <span className="text-green-400 text-sm">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOW STOCK */}
        <div className="bg-[#111111] border border-neutral-900 rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Low Stock Alerts
          </h2>

          <div className="space-y-4">
            {["Wireless Scanner", "Packaging Box", "Delivery Tags"].map(
              (product) => (
                <div
                  key={product}
                  className="bg-[#0B0B0B] border border-[#7F1D1D] rounded-2xl p-4"
                >
                  <h3 className="text-white font-medium">{product}</h3>

                  <p className="text-red-400 text-sm mt-2">
                    Low inventory remaining
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
