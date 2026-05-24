"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  History,
  Package,
  RefreshCcw,
  Search,
} from "lucide-react";
import { getInventory, InventoryItem } from "@/lib/dashboardData";

const inventoryDefaults: InventoryItem[] = [];

const history = [
  {
    id: 1,
    action: "Restocked Packaging Box",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Scanner quantity updated",
    time: "5 hours ago",
  },
  {
    id: 3,
    action: "Low stock alert triggered",
    time: "Yesterday",
  },
];

export default function InventoryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<InventoryItem[]>(inventoryDefaults);

  useEffect(() => {
    setItems(getInventory());

    function onGlobalSearch(e: Event) {
      // @ts-ignore
      const q = e?.detail?.query ?? "";
      setQuery(q);
    }

    window.addEventListener("global-search", onGlobalSearch as EventListener);

    return () =>
      window.removeEventListener(
        "global-search",
        onGlobalSearch as EventListener,
      );
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        `${i.product} ${i.sku}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, items],
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Inventory Management
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor stock levels and inventory activity
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/owner/inventory/restock")}
          className="flex items-center gap-2 bg-[#7F1D1D] hover:bg-[#991B1B] transition-all duration-300 px-6 py-3 rounded-2xl text-white font-medium"
        >
          <RefreshCcw size={18} />
          Restock Inventory
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Products</p>

              <h2 className="text-5xl font-bold text-white mt-3">342</h2>
            </div>

            <div className="bg-[#7F1D1D]/20 p-5 rounded-2xl">
              <Package className="text-red-500" size={30} />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Low Stock Alerts</p>

              <h2 className="text-5xl font-bold text-white mt-3">8</h2>
            </div>

            <div className="bg-red-500/20 p-5 rounded-2xl">
              <AlertTriangle className="text-red-400" size={30} />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Restocks Today</p>

              <h2 className="text-5xl font-bold text-white mt-3">14</h2>
            </div>

            <div className="bg-green-500/20 p-5 rounded-2xl">
              <RefreshCcw className="text-green-400" size={30} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
          aria-hidden="true"
        />

        <input
          type="text"
          aria-label="Search inventory"
          placeholder="Search inventory..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#111111] border border-[#1F1F1F] rounded-2xl pl-14 pr-4 py-4 text-white outline-none focus:border-[#7F1D1D]"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F]">
          <h2 className="text-3xl font-bold text-white">Inventory Overview</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#161616]">
              <tr className="text-left">
                <th className="px-6 py-5 text-gray-400 font-medium">Product</th>

                <th className="px-6 py-5 text-gray-400 font-medium">SKU</th>

                <th className="px-6 py-5 text-gray-400 font-medium">Stock</th>

                <th className="px-6 py-5 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#1F1F1F] hover:bg-[#181818] transition-all"
                >
                  <td className="px-6 py-5 text-white font-medium">
                    {item.product}
                  </td>

                  <td className="px-6 py-5 text-gray-400">{item.sku}</td>

                  <td className="px-6 py-5 text-white">{item.stock}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        item.status === "Low Stock"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory History */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <History className="text-red-500" />

          <h2 className="text-3xl font-bold text-white">Inventory History</h2>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-[#0D0D0D] border border-[#1F1F1F] rounded-2xl p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-medium">{item.action}</h3>

                <p className="text-gray-500 text-sm mt-1">{item.time}</p>
              </div>

              <div className="w-3 h-3 rounded-full bg-[#7F1D1D]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
