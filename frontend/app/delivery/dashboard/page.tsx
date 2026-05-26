"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import DeliveryCard from "@/components/delivery/DeliveryCard";
import StatsCard from "@/components/delivery/StatsCard";
import type { DeliveryRecord } from "@/components/delivery/deliveryData";
import { fetchDashboard } from "@/lib/api";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<{
    activeDeliveries: number;
    completedDeliveries: number;
    followUps: number;
    avgEta: string;
    routeUpdates: number;
    activeRoutes: DeliveryRecord[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const data = await fetchDashboard();

        if (isMounted) {
          setDashboard(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load dashboard data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const failedRoutes = dashboard?.activeRoutes.filter((route) => route.status === "Failed Attempt").length ?? 0;
  const pendingRoutes = dashboard?.activeRoutes.filter((route) => route.status === "Pending").length ?? 0;

  return (
    <div className="flex flex-col lg:flex-row bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A1A1AA]">
                Delivery control center
              </p>
              <h1 className="text-3xl font-bold text-white mt-2">
                Premium delivery dashboard
              </h1>
              <p className="text-[#D5D5D5] mt-3 max-w-2xl">
                Monitor active routes, status shifts, and customer updates in one
                unified, premium logistics workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-[#27272A] bg-[#1A1A1A] px-4 py-3">
              <p className="text-sm text-[#A1A1AA]">Live sync</p>
              <p className="text-lg font-semibold text-white mt-1">
                {isLoading ? "Loading..." : `${dashboard?.routeUpdates ?? 0} active route updates`}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#1A1A1A] p-6 text-white">
              Loading delivery dashboard from the backend...
            </div>
          ) : error || !dashboard ? (
            <div className="mt-8 rounded-2xl border border-[#27272A] bg-[#1A1A1A] p-6 text-[#F5D0D0]">
              {error || "Unable to load dashboard data from the backend."}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
                <StatsCard
                  title="Active routes"
                  value={String(dashboard.activeDeliveries)}
                  description="Live deliveries in motion"
                  trend="Live"
                />

                <StatsCard
                  title="Completed"
                  value={String(dashboard.completedDeliveries)}
                  description="Orders delivered successfully"
                  trend="Synced"
                />

                <StatsCard
                  title="Follow-ups"
                  value={String(dashboard.followUps)}
                  description="Agents need attention"
                  trend="Backend"
                />

                <StatsCard
                  title="Avg. ETA"
                  value={dashboard.avgEta}
                  description="Across all active routes"
                  trend="Current"
                />
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#A1A1AA]">Priority routes</p>
                      <h2 className="text-xl font-semibold text-white mt-1">
                        Assigned deliveries
                      </h2>
                    </div>

                    <p className="text-sm text-[#D5D5D5]">Updated in real time</p>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {dashboard.activeRoutes.map((delivery) => (
                      <DeliveryCard
                        key={delivery.id}
                        id={delivery.id}
                        customer={delivery.customer}
                        address={delivery.address}
                        eta={delivery.eta}
                        status={delivery.status}
                        priority={delivery.priority}
                        contact={delivery.contact}
                        location={delivery.location}
                        lastUpdated={delivery.lastUpdated}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
                    <p className="text-sm text-[#A1A1AA]">Operational snapshot</p>
                    <h2 className="text-xl font-semibold text-white mt-1">
                      Route health
                    </h2>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#D5D5D5]">Active route count</span>
                        <span className="text-white font-semibold">{dashboard.activeDeliveries}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#D5D5D5]">Pending routes</span>
                        <span className="text-white font-semibold">{pendingRoutes}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#D5D5D5]">Failed attempts</span>
                        <span className="text-white font-semibold">{failedRoutes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] rounded-2xl border border-[#27272A] p-5">
                    <p className="text-sm text-[#A1A1AA]">Current focus</p>
                    <h2 className="text-xl font-semibold text-white mt-1">
                      Backend activity
                    </h2>

                    <div className="mt-4 rounded-xl border border-[#27272A] bg-[#111111] p-4">
                      <p className="text-sm text-[#D5D5D5]">
                        {dashboard.activeRoutes.length === 0
                          ? "No active deliveries are currently available from the backend."
                          : `${dashboard.activeRoutes.length} active routes are currently synced from the backend.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}