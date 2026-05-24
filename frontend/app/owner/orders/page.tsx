"use client";

import { ShoppingCart, Clock, CheckCircle, Truck } from "lucide-react";
import { getOrders, Order } from "@/lib/dashboardData";

export default function OrdersPage() {
  const orders: Order[] = getOrders();

  function handleExport() {
    const csvRows = [
      ["Order ID", "Customer", "Product", "Amount", "Payment", "Status"].join(
        ",",
      ),
      ...orders.map((order) =>
        [
          order.id,
          order.customer,
          order.product,
          order.amount,
          order.payment,
          order.status,
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold text-white">Orders Management</h1>

        <p className="text-gray-400 mt-2">
          Manage customer orders and delivery flow
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Orders</p>

              <h2 className="text-3xl font-bold mt-2">1,248</h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <ShoppingCart className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Pending</p>

              <h2 className="text-3xl font-bold mt-2">18</h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500 flex items-center justify-center">
              <Clock className="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Delivered</p>

              <h2 className="text-3xl font-bold mt-2">892</h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500 flex items-center justify-center">
              <CheckCircle className="text-green-400" />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">In Delivery</p>

              <h2 className="text-3xl font-bold mt-2">42</h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500 flex items-center justify-center">
              <Truck className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Recent Orders</h2>

            <p className="text-gray-400 text-sm mt-1">
              Latest customer transactions
            </p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="px-5 py-2 rounded-xl bg-[#7F1D1D] hover:bg-[#991B1B] transition-all"
          >
            Export
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-[#181818]">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-5">Order ID</th>
              <th className="p-5">Customer</th>
              <th className="p-5">Product</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Status</th>
              <th className="p-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-[#1F1F1F] hover:bg-[#151515] transition-all"
              >
                <td className="p-5 font-medium">{order.id}</td>

                <td className="p-5">{order.customer}</td>

                <td className="p-5 text-gray-300">{order.product}</td>

                <td className="p-5">{order.amount}</td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.payment === "Paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "Processing"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-5">
                  <button className="px-4 py-2 rounded-xl border border-[#7F1D1D] hover:bg-[#7F1D1D] transition-all">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
