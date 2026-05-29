"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { orders, trackingSteps } from "@/lib/mock-data"
import { DeliveryMap } from "@/components/customer/delivery-map"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  MessageSquare,
  RefreshCw
} from "lucide-react"

const statusConfig = {
  delivered: { label: "Delivered", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle },
  shipped: { label: "Shipped", color: "bg-blue-500/10 text-blue-600", icon: Truck },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600", icon: Package },
}

export default function TrackingPage() {
  const activeOrders = orders.filter(o => o.status !== "delivered")
  const selectedOrder = activeOrders[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Order Tracking</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your orders in real-time with live delivery updates
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <h2 className="font-semibold text-foreground">Active Orders</h2>
          {activeOrders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            const isSelected = order.id === selectedOrder?.id
            return (
              <Card 
                key={order.id} 
                className={`cursor-pointer border-none shadow-sm transition-all hover:shadow-md ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Order #{order.id}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <Badge className={`gap-1.5 ${status.color}`} variant="secondary">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                    <span className="font-semibold">₹{order.amount.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {activeOrders.length === 0 && (
            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
                <p className="mt-3 font-medium text-foreground">All orders delivered</p>
                <p className="mt-1 text-sm text-muted-foreground">No active orders to track</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4 lg:col-span-2">
          {selectedOrder && (
            <>
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{selectedOrder.id}</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              step.status === "completed"
                                ? "bg-emerald-500 text-white"
                                : step.status === "in-progress"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step.status === "completed" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : step.status === "in-progress" ? (
                              <Truck className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          {index < trackingSteps.length - 1 && (
                            <div
                              className={`h-12 w-0.5 ${
                                step.status === "completed" ? "bg-emerald-500" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{step.title}</p>
                            {step.timestamp && (
                              <span className="text-sm text-muted-foreground">{step.timestamp}</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Live Delivery Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] overflow-hidden rounded-b-lg">
                    <DeliveryMap />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Call Driver
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
