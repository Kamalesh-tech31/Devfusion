"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  DollarSign,
  MapPinned,
  History,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

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
    <aside className="w-64 min-h-screen bg-[#111111] border-r border-[#27272A] p-5">
      <h2 className="text-2xl font-bold text-white mb-8">
        LogiTrack
      </h2>

      <div className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

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
                ${
                  active
                    ? "bg-[#7F1D1D] text-white shadow-lg shadow-[#7F1D1D]/20"
                    : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-white"
                }
              `}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;