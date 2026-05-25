"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 120 },
  { month: "Feb", revenue: 5200, orders: 135 },
  { month: "Mar", revenue: 6100, orders: 150 },
  { month: "Apr", revenue: 5800, orders: 142 },
  { month: "May", revenue: 7300, orders: 178 },
  { month: "Jun", revenue: 8200, orders: 193 },
  { month: "Jul", revenue: 9100, orders: 210 },
];

const deliveryData = [
  { region: "North", deliveries: 142 },
  { region: "East", deliveries: 186 },
  { region: "South", deliveries: 164 },
  { region: "West", deliveries: 132 },
];

const statusData = [
  { name: "Delivered", value: 62, color: "bg-emerald-400", hex: "#22c55e" },
  { name: "In Transit", value: 24, color: "bg-sky-400", hex: "#38bdf8" },
  { name: "Delayed", value: 9, color: "bg-orange-400", hex: "#f97316" },
  { name: "Cancelled", value: 5, color: "bg-red-400", hex: "#ef4444" },
];

const topRoutes = [
  { route: "East Corridor", efficiency: "96%", time: "18m" },
  { route: "North Supply", efficiency: "91%", time: "24m" },
  { route: "South Loop", efficiency: "89%", time: "29m" },
];

const stats = [
  { label: "Revenue this month", value: "$16.2K", delta: "+18.4%" },
  { label: "Average order value", value: "$72.40", delta: "+4.3%" },
  { label: "Route efficiency", value: "94%", delta: "+2.7%" },
  { label: "On-time delivery", value: "91%", delta: "+5.1%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Analytics Dashboard
            </h1>
            <p className="text-neutral-400 mt-2 max-w-2xl">
              Explore your logistics performance across revenue, delivery
              regions, and route efficiency with data-driven insights.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] px-5 py-4 text-sm text-neutral-300">
            Updated just now
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-5"
            >
              <p className="text-sm text-neutral-400">{item.label}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold text-white">
                  {item.value}
                </p>
                <span className="rounded-2xl bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                  {item.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Revenue Trend</h2>
              <p className="text-neutral-400 mt-1">
                Monthly revenue performance and order volume growth.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] px-4 py-2 text-sm text-neutral-300">
              Revenue vs orders
            </div>
          </div>

          <div className="mt-8 h-95">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B0B0B",
                    border: "1px solid #7F1D1D",
                    borderRadius: 14,
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#9ca3af" }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#ef4444"
                  strokeWidth={4}
                  dot={{ r: 5, fill: "#ef4444" }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#38bdf8"
                  fill="#0ea5e9"
                  fillOpacity={0.15}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Status Distribution
                </h3>
                <p className="text-neutral-400 mt-1">
                  Delivery progress by current status.
                </p>
              </div>
              <div className="rounded-2xl bg-[#0B0B0B] px-3 py-2 text-xs text-neutral-300">
                4 categories
              </div>
            </div>

            <div className="mt-6 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={56}
                    outerRadius={88}
                    stroke="transparent"
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.hex} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B0B0B",
                      border: "1px solid #7F1D1D",
                      borderRadius: 14,
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid gap-3">
              {statusData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-3xl bg-[#0B0B0B] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-neutral-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-xl shadow-black/20">
            <h3 className="text-xl font-bold text-white">
              Top Route Efficiency
            </h3>
            <p className="text-neutral-400 mt-1">
              Highest performing routes this week.
            </p>

            <div className="mt-6 space-y-3">
              {topRoutes.map((route) => (
                <div
                  key={route.route}
                  className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{route.route}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        Average delivery time
                      </p>
                    </div>
                    <span className="text-sm text-neutral-300">
                      {route.time}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2 text-sm text-neutral-400">
                    <span>Efficiency: {route.efficiency}</span>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-300">
                      Stable
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Region Delivery Performance
            </h2>
            <p className="text-neutral-400 mt-1">
              Shipment volume by region for the current quarter.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-[#0B0B0B] px-4 py-2 text-sm text-neutral-300">
            Region comparison
          </div>
        </div>

        <div className="mt-8 h-90">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={deliveryData}
              margin={{ top: 20, right: 12, left: -18, bottom: 8 }}
            >
              <XAxis
                dataKey="region"
                stroke="#6b7280"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B0B0B",
                  border: "1px solid #7F1D1D",
                  borderRadius: 14,
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="deliveries"
                fill="#f97316"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
