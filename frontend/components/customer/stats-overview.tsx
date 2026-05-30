"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, Package, Clock, IndianRupee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { customerStats } from "@/lib/mock-data"
import { fetchDashboardStats } from "@/lib/api"

const defaultStats = [
  {
    label: "Total Orders",
    value: customerStats.totalOrders.toLocaleString(),
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    label: "Items",
    value: customerStats.items.toString(),
    icon: Package,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    label: "Pending",
    value: customerStats.pending.toLocaleString(),
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    label: "Revenue",
    value: `₹${customerStats.revenue.toLocaleString()}`,
    icon: IndianRupee,
    color: "text-primary",
    bgColor: "bg-primary/10"
  }
]

export function StatsOverview() {
  const [stats, setStats] = useState(defaultStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsResponse = await fetchDashboardStats()
        if (Array.isArray(statsResponse) && statsResponse.length > 0) {
          const backendStats = statsResponse[0]
          setStats([
            {
              label: "Total Orders",
              value: backendStats.totalOrders?.toLocaleString() || customerStats.totalOrders.toLocaleString(),
              icon: ShoppingCart,
              color: "text-blue-600",
              bgColor: "bg-blue-100"
            },
            {
              label: "Items",
              value: (backendStats.totalItems || customerStats.items).toString(),
              icon: Package,
              color: "text-emerald-600",
              bgColor: "bg-emerald-100"
            },
            {
              label: "Pending",
              value: (backendStats.pendingOrders || customerStats.pending).toLocaleString(),
              icon: Clock,
              color: "text-amber-600",
              bgColor: "bg-amber-100"
            },
            {
              label: "Revenue",
              value: `₹${(backendStats.totalRevenue || customerStats.revenue).toLocaleString()}`,
              icon: IndianRupee,
              color: "text-primary",
              bgColor: "bg-primary/10"
            }
          ])
        }
      } catch (error) {
        // Silently fall back to defaults
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Customer Overview</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
