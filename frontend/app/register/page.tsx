"use client";

import { useState } from "react";
import { BriefcaseBusiness, Truck, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  isPasswordValid,
  PASSWORD_REQUIREMENTS,
} from "@/lib/passwordValidation";
import { PasswordInput } from "@/components/common/PasswordInput";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Business Owner");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      alert("Please meet all password requirements before continuing.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration Successful");

      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#1A1A1A]/90 border border-[#7F1D1D]/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Logi
            <span className="text-[#7F1D1D]">Track</span>
          </h1>

          <p className="text-gray-400 mt-3 text-sm">
            Smart Supply Chain & Delivery Platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">Password</label>

            <PasswordInput
              placeholder="Create password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 focus:border-[#7F1D1D] rounded-2xl px-5 py-4 text-white outline-none transition"
            />

            <ul className="mt-3 space-y-1">
              {PASSWORD_REQUIREMENTS.map((rule) => {
                const met = rule.test(password);

                return (
                  <li
                    key={rule.id}
                    className={`text-xs ${
                      met ? "text-green-400" : "text-gray-500"
                    }`}
                  >
                    {met ? "✓" : "•"} {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm block mb-2">
              Confirm Password
            </label>

            <PasswordInput
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isPasswordValid(password) || password !== confirmPassword}
            className="w-full bg-[#7F1D1D] hover:bg-[#991B1B] disabled:bg-gray-700 disabled:cursor-not-allowed transition-all py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7F1D1D]/20"
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
