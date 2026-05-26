"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { deliveryRoute } from "@/lib/mock-data"

export function DeliveryMap() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import("./map-content").then((mod) => {
      setMapComponent(() => mod.MapContent)
    })
  }, [])

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold text-foreground">Live Delivery Map</h2>
        <p className="text-sm text-muted-foreground">
          Track delivery in real-time • {deliveryRoute.origin.name} to {deliveryRoute.destination.name}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 w-full overflow-hidden rounded-b-lg lg:h-80">
          {MapComponent ? (
            <MapComponent />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
