"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryMap from "@/components/owner/DeliveryMap";
import AgentCard from "@/components/owner/AgentCard";
import DeliveryTable from "@/components/owner/DeliveryTable";
import { Truck, User, PackageCheck, Clock3 } from "lucide-react";

const API_URL = "http://localhost:5000/api/deliveries";

interface Tracking {
  status: string;
  location?: string;
  message?: string;
  timestamp: string;
}

interface OrderItem {
  product?: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
}

interface DeliveryAgent {
  _id: string;
  name: string;
  contact: string;
  isAvailable: boolean;
  vehicle: string;
}

interface Delivery {
  _id: string;
  order: Order;
  agent?: DeliveryAgent;
  status: "pending" | "assigned" | "in_transit" | "delivered" | "failed";
  tracking: Tracking[];
  estimatedDelivery?: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Delivery[];
}

export default function DeliveryPage() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeliveries() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch deliveries (${response.status})`);
        }

        const json = (await response.json()) as ApiResponse;
        if (!json?.success) {
          throw new Error(json?.message ?? "Invalid API response");
        }

        setDeliveries(json.data ?? []);
      } catch (err: any) {
        setError(err?.message ?? "Unable to load deliveries");
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveries();
  }, []);

  // Calculate stats
  const totalDeliveries = deliveries.length;

  const uniqueAgents = Array.from(
    new Map(
      deliveries
        .filter((d) => d.agent)
        .map((d) => [d.agent!._id, d.agent!])
    ).values()
  );
  const activeAgents = uniqueAgents.filter((agent) => !agent.isAvailable).length;

  const pendingOrders = deliveries.filter(
    (d) => d.status === "pending" || d.status === "assigned"
  ).length;

  const deliveredCount = deliveries.filter(
    (d) => d.status === "delivered"
  ).length;
  const successRate =
    deliveries.length > 0
      ? Math.round((deliveredCount / deliveries.length) * 100)
      : 0;

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

      {loading && <p className="text-gray-400">Loading deliveries...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

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
              <h2 className="text-5xl font-bold mt-4 text-white">
                {pendingOrders}
              </h2>
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
              <h2 className="text-5xl font-bold mt-4 text-white">
                {successRate}%
              </h2>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#7F1D1D]/20 border border-[#7F1D1D] flex items-center justify-center">
              <PackageCheck className="text-[#EF4444]" size={30} />
            </div>
          </div>
        </div>
      </div>

      <DeliveryMap agents={uniqueAgents} />

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
          {uniqueAgents.length > 0 ? (
            uniqueAgents.map((agent) => {
              const agentDeliveries = deliveries.filter(
                (d) => d.agent?._id === agent._id
              ).length;
              const agentStatus = agent.isAvailable ? "Available" : "Active";

              return (
                <AgentCard
                  key={agent._id}
                  name={agent.name}
                  deliveries={agentDeliveries}
                  status={agentStatus}
                />
              );
            })
          ) : (
            <div className="col-span-full rounded-3xl border border-[#1F1F1F] p-8 text-gray-400">
              No delivery agents found. Click Add Agent to create one.
            </div>
          )}
        </div>
      </div>

      <DeliveryTable deliveries={deliveries} />
    </div>
  );
}