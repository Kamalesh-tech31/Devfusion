"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryMap from "@/components/owner/DeliveryMap";
import AgentCard from "@/components/owner/AgentCard";
import DeliveryTable from "@/components/owner/DeliveryTable";
import { getAgents, Agent } from "@/lib/dashboardData";
import { Truck, User, PackageCheck, Clock3 } from "lucide-react";

export default function DeliveryPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    setAgents(getAgents());
  }, []);

  const totalDeliveries = agents.reduce(
    (sum, agent) => sum + agent.deliveries,
    0,
  );
  const activeAgents = agents.filter(
    (agent) => agent.status === "Active",
  ).length;

  function handleAddAgent() {
    router.push("/owner/delivery/add");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-white">Delivery Management</h1>
        <p className="text-gray-400 mt-3 text-lg">
          Track agents, deliveries, and optimized routes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Deliveries</p>
              <h2 className="text-5xl font-bold mt-4 text-white">
                {totalDeliveries}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <Truck className="text-[#EF4444]" size={30} />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Agents</p>
              <h2 className="text-5xl font-bold mt-4 text-white">
                {activeAgents}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <User className="text-[#EF4444]" size={30} />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Pending Orders</p>
              <h2 className="text-5xl font-bold mt-4 text-white">89</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <Clock3 className="text-[#EF4444]" size={30} />
            </div>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Success Rate</p>
              <h2 className="text-5xl font-bold mt-4 text-white">96%</h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <PackageCheck className="text-[#EF4444]" size={30} />
            </div>
          </div>
        </div>
      </div>

      <DeliveryMap agents={agents} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Delivery Agents</h2>
            <p className="text-gray-400 mt-2">Monitor active field agents</p>
          </div>

          <button
            type="button"
            onClick={handleAddAgent}
            className="bg-[#7F1D1D] hover:bg-[#991B1B] transition-all duration-300 px-6 py-3 rounded-2xl text-white font-semibold"
          >
            Add Agent
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                deliveries={agent.deliveries}
                status={agent.status}
              />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-[#1F1F1F] p-8 text-gray-400">
              No delivery agents found. Click Add Agent to create one.
            </div>
          )}
        </div>
      </div>

      <DeliveryTable />
    </div>
  );
}
