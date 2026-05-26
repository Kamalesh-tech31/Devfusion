import { Copy, Warehouse, Truck, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { trackingSteps } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const stepIcons = {
  "Chennai Warehouse": Warehouse,
  "Out For Delivery": Truck,
  "Expected Delivery": MapPin
}

const statusColors = {
  completed: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  pending: "bg-muted"
}

export function OrderTracking() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <p className="text-sm text-muted-foreground">Live Tracking</p>
          <h2 className="text-lg font-semibold text-foreground">Order #LT2032</h2>
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {trackingSteps.map((step, index) => {
            const Icon = stepIcons[step.title as keyof typeof stepIcons] || MapPin
            const isLast = index === trackingSteps.length - 1

            return (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      statusColors[step.status]
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        step.status === "pending" ? "text-muted-foreground" : "text-white"
                      )}
                    />
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "mt-2 h-12 w-0.5",
                        step.status === "completed" ? "bg-emerald-500" : "bg-muted"
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {step.timestamp && (
                    <p className="mt-1 text-xs text-muted-foreground">{step.timestamp}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
