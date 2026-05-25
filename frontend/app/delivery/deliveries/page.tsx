"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import DeliveryCard from "@/components/delivery/DeliveryCard";
import {
  deliveryRecords,
  type DeliveryStatus,
} from "@/components/delivery/deliveryData";
import Button from "@/components/ui/Button";

const statusOptions: Record<DeliveryStatus, DeliveryStatus[]> = {
  Pending: ["Out for Delivery", "Failed Attempt"],
  "Out for Delivery": ["Delivered", "Failed Attempt"],
  Delivered: [],
  "Failed Attempt": ["Returned"],
  Returned: [],
};

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(deliveryRecords);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, DeliveryStatus>
  >(() =>
    Object.fromEntries(
      deliveryRecords.map((item) => [item.id, item.status])
    ) as Record<string, DeliveryStatus>
  );

  const activeCount = deliveries.filter(
    (item) => item.status !== "Delivered" && item.status !== "Returned"
  ).length;

  const completedCount = deliveries.filter(
    (item) => item.status === "Delivered"
  ).length;

  const handleUpdateStatus = (id: string) => {
    const current = deliveries.find((item) => item.id === id);
    const nextStatus = selectedStatuses[id];

    if (!current || !nextStatus || nextStatus === current.status) {
      toast.error("Select a valid status change before saving.");
      return;
    }

    setDeliveries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextStatus,
              lastUpdated: "Just now",
            }
          : item
      )
    );

    toast.success(`${current.customer} updated to ${nextStatus}`);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A1A1AA]">
                Delivery operations
              </p>
              <h1 className="text-3xl font-bold text-white mt-2">
                Assigned deliveries
              </h1>
              <p className="text-[#D5D5D5] mt-3 max-w-2xl">
                Use the status update panel to move each shipment through the
                premium delivery lifecycle and keep the route book current.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 min-w-[280px]">
              <div className="rounded-2xl border border-[#27272A] bg-[#1A1A1A] p-4">
                <p className="text-sm text-[#A1A1AA]">Active</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {activeCount}
                </p>
              </div>

              <div className="rounded-2xl border border-[#27272A] bg-[#1A1A1A] p-4">
                <p className="text-sm text-[#A1A1AA]">Completed</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {completedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            {deliveries.map((delivery) => {
              const options = statusOptions[delivery.status];

              return (
                <div
                  key={delivery.id}
                  className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl p-5"
                >
                  <DeliveryCard
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

                  <div className="mt-4 rounded-xl border border-[#27272A] bg-[#111111] p-4">
                    <p className="text-sm text-[#A1A1AA]">Status update UI</p>
                    <p className="text-white font-semibold mt-2">
                      {delivery.customer}
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <select
                        value={selectedStatuses[delivery.id]}
                        onChange={(event) =>
                          setSelectedStatuses((prev) => ({
                            ...prev,
                            [delivery.id]: event.target.value as DeliveryStatus,
                          }))
                        }
                        className="flex-1 bg-[#0B0B0B] border border-[#27272A] text-white rounded-2xl px-3 py-3 outline-none"
                      >
                        {options.length > 0 ? (
                          options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))
                        ) : (
                          <option value={delivery.status}>{delivery.status}</option>
                        )}
                      </select>

                      <Button
                        onClick={() => handleUpdateStatus(delivery.id)}
                        disabled={
                          selectedStatuses[delivery.id] === delivery.status
                        }
                      >
                        Save update
                      </Button>
                    </div>

                    <p className="text-sm text-[#D5D5D5] mt-3">
                      Last sync: {delivery.lastUpdated}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}