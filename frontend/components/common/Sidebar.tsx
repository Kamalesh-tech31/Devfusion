"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/lib/logout";

import {
  DollarSign,
  History,
  LayoutDashboard,
  MapPinned,
  Package,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useLogout();

  const navItems = [
    {
      name: "Dashboard",
      href: "/delivery/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      href: "/delivery/deliveries",
      icon: Package,
    },
    {
      name: "Earnings",
      href: "/delivery/earnings",
      icon: DollarSign,
    },
    {
      name: "Tracking",
      href: "/delivery/tracking",
      icon: MapPinned,
    },
    {
      name: "History",
      href: "/delivery/history",
      icon: History,
    },
  ];

  return (
    <aside className="bg-[#111111] border-b border-[#27272A] lg:border-b-0 lg:border-r lg:min-h-screen lg:w-64">
      <div className="p-4 md:p-5">
        <div className="hidden lg:block">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#A1A1AA]">
            Navigation
          </p>
          <h2 className="text-2xl font-bold text-white mt-2">LogiTrack</h2>
        </div>

        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-3 lg:mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-200
                  whitespace-nowrap
                  ${
                    active
                      ? "bg-[#7F1D1D] text-white shadow-lg shadow-[#7F1D1D]/20"
                      : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 lg:mt-6 pt-4 border-t border-[#27272A]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white transition-all duration-200 font-medium"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;