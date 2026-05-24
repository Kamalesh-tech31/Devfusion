"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAgents, saveAgents, nextId, Agent } from "@/lib/dashboardData";

export default function AddAgentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [deliveries, setDeliveries] = useState(0);
  const [status, setStatus] = useState("Active");

  function handleSave() {
    const agents = getAgents();
    const newAgent: Agent = {
      id: nextId(agents),
      name: name.trim() || "New Agent",
      deliveries: deliveries || 0,
      status,
    };

    saveAgents([...agents, newAgent]);
    router.push("/owner/delivery");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Add Agent</h1>

      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Agent name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />

        <input
          type="number"
          min={0}
          placeholder="Deliveries assigned"
          value={deliveries}
          onChange={(e) => setDeliveries(Number(e.target.value))}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl px-4 py-3 text-white outline-none"
        >
          <option value="Active">Active</option>
          <option value="Returning">Returning</option>
          <option value="Paused">Paused</option>
        </select>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#7F1D1D] rounded-2xl text-white"
          >
            Save
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
