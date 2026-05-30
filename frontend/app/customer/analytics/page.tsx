"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products, customerStats } from "@/lib/mock-data"
import { fetchAnalytics } from "@/lib/api"
import {
  TrendingUp,
  Package,
  ShoppingCart,
  IndianRupee,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type TrendPoint = {
  label: string
  value: number
}

type CategoryShare = {
  category: string
  value: number
}

type AnalyticsRecord = {
  totalRevenue: number
  totalOrders: number
  itemsSold: number
  activeCustomers: number
  revenueTrend: TrendPoint[]
  ordersTrend: TrendPoint[]
  categoryDistribution: CategoryShare[]
}

const revenueData: TrendPoint[] = [
  { label: "Jan", value: 45000 },
  { label: "Feb", value: 52000 },
  { label: "Mar", value: 48000 },
  { label: "Apr", value: 61000 },
  { label: "May", value: 84500 },
]

const ordersData: TrendPoint[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 52 },
  { label: "Wed", value: 38 },
  { label: "Thu", value: 65 },
  { label: "Fri", value: 48 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 55 },
]

const categoryData: CategoryShare[] = [
  { category: "Audio", value: 35 },
  { category: "Accessories", value: 40 },
  { category: "Wearables", value: 15 },
  { category: "Storage", value: 10 },
]

const COLORS = ["#c9553a", "#3b82f6", "#10b981", "#f59e0b"]
const categoryColorClasses = [
  "bg-[#c9553a]",
  "bg-[#3b82f6]",
  "bg-[#10b981]",
  "bg-[#f59e0b]",
]

const defaultAnalytics: AnalyticsRecord = {
  totalRevenue: customerStats.revenue,
  totalOrders: customerStats.totalOrders,
  itemsSold: 2847,
  activeCustomers: 1284,
  revenueTrend: revenueData,
  ordersTrend: ordersData,
  categoryDistribution: categoryData,
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        const analyticsResponse = await fetchAnalytics()
        if (Array.isArray(analyticsResponse) && analyticsResponse.length > 0) {
          setAnalytics(analyticsResponse[0])
        } else {
          setAnalytics(null)
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load analytics")
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const summaryData = analytics ?? defaultAnalytics
  const revenueChartData = summaryData.revenueTrend.length ? summaryData.revenueTrend : revenueData
  const ordersChartData = summaryData.ordersTrend.length ? summaryData.ordersTrend : ordersData
  const categoryChartData = summaryData.categoryDistribution.length
    ? summaryData.categoryDistribution
    : categoryData

  const summaryStats = [
    {
      title: "Total Revenue",
      value: `₹${summaryData.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: summaryData.totalOrders.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Products Sold",
      value: summaryData.itemsSold.toLocaleString(),
      change: "+15.3%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Active Customers",
      value: summaryData.activeCustomers.toLocaleString(),
      change: "-2.4%",
      trend: "down",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your performance and business insights
        </p>
      </div>

      {loading ? (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
          Loading analytics data...
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : !analytics ? (
        <div className="rounded-lg border border-muted/20 bg-muted/5 p-4 text-sm text-muted-foreground">
          No analytics records found. Showing fallback demo data.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9553a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c9553a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="label" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#c9553a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Weekly Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="label" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [value, "Orders"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#c9553a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {categoryChartData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${categoryColorClasses[index % categoryColorClasses.length]}`} />
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{product.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100 + 50)} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
