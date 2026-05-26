import { StatsOverview } from "@/components/customer/stats-overview"
import { FeaturedProducts } from "@/components/customer/featured-products"
import { RecentOrders } from "@/components/customer/recent-orders"
import { OrderTracking } from "@/components/customer/order-tracking"
import { DeliveryMap } from "@/components/customer/delivery-map"

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <StatsOverview />

      <FeaturedProducts />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <OrderTracking />
      </div>

      <DeliveryMap />
    </div>
  )
}
