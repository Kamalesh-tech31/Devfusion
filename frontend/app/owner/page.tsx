import DashboardCard from "@/components/owner/DashboardCard";
import DeliveryMap from "@/components/owner/DeliveryMap";
import { getAgents } from "@/lib/dashboardData";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
  Clock4,
  ArrowUpRight,
} from "lucide-react";

const trends = [
  {
    title: "Inventory health",
    value: "89%",
    subtitle: "All critical products monitored",
    status: "Stable",
  },
  {
    title: "Route efficiency",
    value: "94%",
    subtitle: "Optimised fuel & time",
    status: "Improving",
  },
  {
    title: "Customer satisfaction",
    value: "4.8/5",
    subtitle: "On-time delivery score",
    status: "High",
  },
];

const activityFeed = [
  {
    title: "Live route updated",
    details: "New ETA synced for Delivery 18.",
    badge: "Live",
  },
  {
    title: "Stock alert",
    details: "Packaging Box supply is below 20%.",
    badge: "Warning",
  },
  {
    title: "Fleet check-in",
    details: "3 drivers completed morning pre-checks.",
    badge: "Status",
  },
];

export default function OwnerDashboard() {
  const agents = getAgents();
  const totalDeliveries = agents.reduce(
    (sum, agent) => sum + agent.deliveries,
    0,
  );

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Dashboard Overview
            </h1>
            <p className="text-neutral-400 mt-2 max-w-2xl">
              Track shipments, monitor driver performance, and keep your
              logistics operations running smoothly with actionable insights.
            </p>
          </div>
          <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-5 shadow-lg shadow-black/10">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Live performance
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-500/20 to-cyan-500/10 text-emerald-300">
                <Sparkles size={28} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  {totalDeliveries}
                </p>
                <p className="text-sm text-neutral-400">
                  deliveries tracked this week
                </p>
              </div>
            </div>
          </div>
        </div>

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
            title="On-time Rate"
            value="92%"
            change="+3.8%"
            icon={<ShieldCheck size={24} />}
          />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-lg shadow-black/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Today's priorities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Better routing, faster deliveries
              </h2>
              <p className="text-neutral-400 mt-2 max-w-2xl">
                Review the latest route updates and team performance to reduce
                delays across the fleet.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Review route plans
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-5">
              <p className="text-sm text-neutral-400">Average ETA</p>
              <p className="mt-3 text-3xl font-semibold text-white">28m</p>
              <p className="mt-2 text-sm text-neutral-500">
                Across active routes
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-5">
              <p className="text-sm text-neutral-400">Fleet efficiency</p>
              <p className="mt-3 text-3xl font-semibold text-white">94%</p>
              <p className="mt-2 text-sm text-neutral-500">
                Optimised route performance
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-5">
              <p className="text-sm text-neutral-400">Alerts resolved</p>
              <p className="mt-3 text-3xl font-semibold text-white">18</p>
              <p className="mt-2 text-sm text-neutral-500">
                In the last 24 hours
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-lg shadow-black/10">
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          <p className="text-neutral-400 mt-2">
            One-click commands to keep your operations moving.
          </p>

          <div className="mt-6 space-y-4">
            {[
              {
                title: "Dispatch new route",
                description: "Create a route and assign a driver in seconds.",
              },
              {
                title: "Notify active drivers",
                description:
                  "Send instant updates to every driver on the road.",
              },
              {
                title: "Inventory sweep",
                description: "Review low-stock items across warehouses.",
              },
            ].map((item) => (
              <button
                key={item.title}
                type="button"
                className="w-full rounded-3xl border border-neutral-800 bg-[#0B0B0B] px-5 py-4 text-left transition hover:border-red-600"
              >
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-neutral-500 mt-1">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <DeliveryMap agents={agents} />

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-lg shadow-black/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Active Fleet</h2>
                <p className="text-neutral-500 mt-2">
                  Current route statuses and driver performance.
                </p>
              </div>
              <span className="rounded-2xl bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300">
                {agents.length} drivers online
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-3xl border border-neutral-800 bg-[#0B0B0B] px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-white">{agent.name}</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      {agent.deliveries} deliveries assigned
                    </p>
                  </div>
                  <span
                    className={`rounded-2xl px-3 py-2 text-sm font-medium ${
                      agent.status === "Active"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-lg shadow-black/10">
            <h2 className="text-2xl font-bold text-white">Shipment Pulse</h2>
            <p className="text-neutral-500 mt-2">
              Recent operational updates for your logistics network.
            </p>

            <div className="mt-6 space-y-4">
              {activityFeed.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {item.details}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#7F1D1D]/20 px-3 py-1 text-xs text-red-300">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-neutral-900 bg-[#111111] p-6 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
              <p className="text-neutral-500 mt-2">
                Today’s most important shipments and order status.
              </p>
            </div>
            <a
              href="/owner/orders"
              className="rounded-2xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              View all
            </a>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "#1001",
                customer: "Rahul Sharma",
                product: "Wireless Scanner",
                amount: "$240",
                status: "Delivered",
              },
              {
                id: "#1003",
                customer: "Priya Nair",
                product: "Packaging Box",
                amount: "$80",
                status: "Out for Delivery",
              },
              {
                id: "#1002",
                customer: "Arjun Kumar",
                product: "Tracking Device",
                amount: "$120",
                status: "Processing",
              },
              {
                id: "#1004",
                customer: "Neha Gupta",
                product: "Label Printer",
                amount: "$320",
                status: "Scheduled",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-white font-semibold">{order.id}</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {order.customer} · {order.product}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-400">
                  <span>{order.amount}</span>
                  <span className="rounded-full bg-[#7F1D1D]/20 px-3 py-1 text-red-300">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-900 bg-[#111111] p-6 shadow-lg shadow-black/10">
          <h2 className="text-2xl font-bold text-white">Low Stock Alerts</h2>
          <p className="text-neutral-500 mt-2">
            Keep an eye on inventory that needs restocking soon.
          </p>

          <div className="mt-6 space-y-4">
            {["Wireless Scanner", "Packaging Box", "Delivery Tags"].map(
              (product) => (
                <div
                  key={product}
                  className="rounded-3xl border border-[#7F1D1D] bg-[#0B0B0B] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold">{product}</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        Running low — reorder soon.
                      </p>
                    </div>
                    <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-300">
                      Critical
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
