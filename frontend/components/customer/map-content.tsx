"use client"

import { useEffect, useState } from "react"
import { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { deliveryRoute } from "@/lib/mock-data"

// DO NOT import MapContainer, Marker, etc. at module level
// DO NOT create Icon objects at module level

export function MapContent({ route }: { route?: any }) {
  const currentRoute = route || deliveryRoute
  const [isClient, setIsClient] = useState(false)
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null)

  // Lazy load Leaflet only after client hydration
  useEffect(() => {
    setIsClient(true)

    // Dynamic import of Leaflet components - ONLY on client
    Promise.all([
      import("react-leaflet").then(m => m),
      import("leaflet").then(m => m)
    ]).then(async ([leafletModule, leafletLib]) => {
      const { MapContainer, TileLayer, Marker, Polyline, Popup } = leafletModule
      const { Icon } = leafletLib

      // Create icons ONLY after client-side import
      const warehouseIcon = new Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      const destinationIcon = new Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      const deliveryIcon = new Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })

      // Create the map component function
      const MapComponent = () => {
        const center: LatLngExpression = [
          (currentRoute.origin.lat + currentRoute.destination.lat) / 2,
          (currentRoute.origin.lng + currentRoute.destination.lng) / 2
        ]

        const routePath: LatLngExpression[] = currentRoute.waypoints.map(
          (point: { lat: number; lng: number }) => [point.lat, point.lng] as LatLngExpression
        )

        return (
          <MapContainer
            center={center}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[currentRoute.origin.lat, currentRoute.origin.lng]}
              icon={warehouseIcon}
            >
              <Popup>{currentRoute.origin.name}</Popup>
            </Marker>

            <Marker
              position={[currentRoute.destination.lat, currentRoute.destination.lng]}
              icon={destinationIcon}
            >
              <Popup>{currentRoute.destination.name}</Popup>
            </Marker>

            <Marker
              position={[currentRoute.currentPosition.lat, currentRoute.currentPosition.lng]}
              icon={deliveryIcon}
            >
              <Popup>Delivery Partner - In Transit</Popup>
            </Marker>

            <Polyline
              positions={routePath}
              color="#ef4444"
              weight={3}
              opacity={0.7}
              dashArray="10, 10"
            />
          </MapContainer>
        )
      }

      setMapComponent(() => MapComponent)
    }).catch(err => {
      console.error("Failed to load map:", err)
    })
  }, [])

  if (!isClient) {
    return <div className="h-full w-full bg-muted flex items-center justify-center"><p>Loading map...</p></div>
  }

  if (!MapComponent) {
    return <div className="h-full w-full bg-muted flex items-center justify-center"><p>Loading map...</p></div>
  }

  return <MapComponent />
}