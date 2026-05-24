"use client";

import { useState } from "react";
import { BriefcaseBusiness, Truck, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Business Owner");

  return (
    <main className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#1A1A1A]/90 border border-[#7F1D1D]/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Logi<span className="text-[#7F1D1D]">Track</span>
          </h1>

          <p className="text-gray-400 mt-3 text-sm">
            Smart Supply Chain & Delivery Platform
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Password</label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Register As
            </label>

            <div className="grid grid-cols-3 gap-4">
              {/* Business */}
              <button
                type="button"
                onClick={() => setSelectedRole("Business Owner")}
                className={`rounded-2xl p-4 border transition-all ${
                  selectedRole === "Business Owner"
                    ? "border-[#7F1D1D] bg-[#7F1D1D]/20"
                    : "border-gray-700 bg-black/30 hover:border-[#7F1D1D]"
                }`}
              >
                <BriefcaseBusiness className="mx-auto mb-2 text-white" />
                <p className="text-sm text-white">Business</p>
              </button>

              {/* Delivery */}
              <button
                type="button"
                onClick={() => setSelectedRole("Delivery Agent")}
                className={`rounded-2xl p-4 border transition-all ${
                  selectedRole === "Delivery Agent"
                    ? "border-[#7F1D1D] bg-[#7F1D1D]/20"
                    : "border-gray-700 bg-black/30 hover:border-[#7F1D1D]"
                }`}
              >
                <Truck className="mx-auto mb-2 text-white" />
                <p className="text-sm text-white">Delivery</p>
              </button>

              {/* Customer */}
              <button
                type="button"
                onClick={() => setSelectedRole("Customer")}
                className={`rounded-2xl p-4 border transition-all ${
                  selectedRole === "Customer"
                    ? "border-[#7F1D1D] bg-[#7F1D1D]/20"
                    : "border-gray-700 bg-black/30 hover:border-[#7F1D1D]"
                }`}
              >
                <User className="mx-auto mb-2 text-white" />
                <p className="text-sm text-white">Customer</p>
              </button>
            </div>
          </div>

          {/* Dynamic Fields */}

          {selectedRole === "Business Owner" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />

              <input
                type="text"
                placeholder="GST Number"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />

              <textarea
                placeholder="Business Address"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>
          )}

          {selectedRole === "Delivery Agent" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Vehicle Type"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />

              <input
                type="text"
                placeholder="License Number"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>
          )}

          {selectedRole === "Customer" && (
            <div>
              <textarea
                placeholder="Delivery Address"
                className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={() => router.push("/owner")}
            className="w-full bg-[#7F1D1D] hover:bg-[#991B1B] transition-all py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7F1D1D]/20"
          >
            Create Account
            <ArrowRight size={18} />
          </button>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#7F1D1D] hover:text-red-400 transition"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
