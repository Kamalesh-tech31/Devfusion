"use client";

import { useState } from "react";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Button from "@/components/ui/Button";

export default function TrackingPage() {
  const [latitude, setLatitude] =
    useState("");

  const [longitude, setLongitude] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const handleUpdate = () => {
    setSubmitted(true);
  };

  return (
    <div className="flex bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-white">
            Live Tracking
          </h1>

          <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl p-6 mt-8">
            <div className="h-[400px] rounded-2xl bg-[#111111] flex items-center justify-center border border-[#27272A]">
              <p className="text-[#A1A1AA] text-lg">
                Live Map Preview
              </p>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) =>
                  setLatitude(e.target.value)
                }
                className="
                  bg-[#111111]
                  border
                  border-[#27272A]
                  rounded-2xl
                  p-3
                  text-white
                  flex-1
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) =>
                  setLongitude(e.target.value)
                }
                className="
                  bg-[#111111]
                  border
                  border-[#27272A]
                  rounded-2xl
                  p-3
                  text-white
                  flex-1
                  outline-none
                "
              />

              <div onClick={handleUpdate}>
                <Button>
                  Update Location
                </Button>
              </div>
            </div>

            {submitted && (
              <div className="mt-6 bg-[#111111] border border-[#27272A] rounded-2xl p-5">
                <h2 className="text-white text-xl font-semibold">
                  Current Coordinates
                </h2>

                <p className="text-[#A1A1AA] mt-3">
                  Latitude:
                  <span className="text-white ml-2">
                    {latitude}
                  </span>
                </p>

                <p className="text-[#A1A1AA] mt-2">
                  Longitude:
                  <span className="text-white ml-2">
                    {longitude}
                  </span>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}