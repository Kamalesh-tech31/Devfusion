"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getInventory,
  saveInventory,
  InventoryItem,
} from "@/lib/dashboardData";

export default function InventoryRestockPage() {
  const router = useRouter();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [addAmount, setAddAmount] = useState(0);

  useEffect(() => {
    const stored = getInventory();
    setInventory(stored);
    setSelectedId(stored[0]?.id ? String(stored[0].id) : "");
  }, []);

  function handleRestock() {
    if (selectedId === "" || addAmount <= 0) return;

    const idNum = Number(selectedId);

    const updated = inventory.map((item) =>
      item.id === idNum
        ? {
            ...item,
            stock: item.stock + addAmount,
            status: item.stock + addAmount <= 5 ? "Low Stock" : "Healthy",
          }
        : item,
    );

    saveInventory(updated);
    router.push("/owner/inventory");
  }

  const selectedItem = inventory.find((item) => item.id === Number(selectedId));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Restock Inventory</h1>

      <div className="space-y-4 max-w-md">
        <label className="block text-gray-400">Select product</label>
        <select
          value={selectedId != null ? String(selectedId) : ""}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl px-4 py-3 text-white outline-none"
        >
          <option value="" disabled>
            -- Select product --
          </option>
          {inventory.map((item) => (
            <option key={item.id} value={String(item.id)}>
              {item.product} ({item.sku})
            </option>
          ))}
        </select>

        {selectedItem && (
          <p className="text-gray-400">
            Current stock:{" "}
            <span className="text-white">{selectedItem.stock}</span>
          </p>
        )}

        <input
          type="number"
          placeholder="Add quantity"
          value={addAmount}
          onChange={(e) => setAddAmount(Number(e.target.value))}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRestock}
            className="px-4 py-2 bg-[#7F1D1D] rounded-2xl text-white"
          >
            Save Restock
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-neutral-800 rounded-2xl text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
