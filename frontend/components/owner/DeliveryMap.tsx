"use client";

import { Agent } from "@/lib/dashboardData";
import { MapPin, Truck } from "lucide-react";

interface DeliveryMapProps {
  agents?: Agent[];
}

export default function DeliveryMap({ agents = [] }: DeliveryMapProps) {
  const markers = [
    { id: 1, label: "Hub", top: "18%", left: "20%", color: "bg-green-400" },
    {
      id: 2,
      label: "Warehouse",
      top: "42%",
      left: "54%",
      color: "bg-rose-400",
    },
    { id: 3, label: "Client", top: "68%", left: "30%", color: "bg-blue-400" },
  ];

  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Route Optimisation</h2>
          <p className="text-gray-400 text-sm">Live delivery tracking map</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-[#7F1D1D]/20 border border-[#7F1D1D] text-[#EF4444] text-sm">
          {agents.length} Active Agents
        </div>
      </div>

      <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border border-[#1F1F1F]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.12),transparent_24%)]" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 18 20 Q 35 30 40 45 T 55 65 Q 68 75 80 70"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path d="M 22 18 L 18 20 L 22 22" fill="#ef4444" />
          <path d="M 80 70 L 84 68 L 82 72" fill="#ef4444" />
        </svg>

        {markers.map((marker) => (
          <div
            key={marker.id}
            className={`absolute rounded-full p-3 shadow-xl ${marker.color} text-slate-950 flex items-center justify-center`}
            style={{
              top: marker.top,
              left: marker.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <MapPin size={18} aria-hidden="true" />
          </div>
        ))}

        <div className="absolute bottom-6 right-6 rounded-3xl bg-[#0B0B0B]/95 border border-[#1F1F1F] p-4 w-64 shadow-xl">
          <p className="text-sm text-neutral-400">Currently tracking</p>
          <div className="mt-3 space-y-3">
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7F1D1D] flex items-center justify-center text-white">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="text-white font-semibold">{agent.name}</p>
                  <p className="text-xs text-neutral-500">
                    {agent.status} · {agent.deliveries} deliveries
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
