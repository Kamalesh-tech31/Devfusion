"use client"

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet"
import { Icon, LatLngExpression } from "leaflet"
import { deliveryRoute } from "@/lib/mock-data"
import "leaflet/dist/leaflet.css"

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

export function MapContent() {
  const center: LatLngExpression = [
    (deliveryRoute.origin.lat + deliveryRoute.destination.lat) / 2,
    (deliveryRoute.origin.lng + deliveryRoute.destination.lng) / 2
  ]

  const routePath: LatLngExpression[] = deliveryRoute.waypoints.map(
    (point) => [point.lat, point.lng] as LatLngExpression
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
        position={[deliveryRoute.origin.lat, deliveryRoute.origin.lng]}
        icon={warehouseIcon}
      >
        <Popup>{deliveryRoute.origin.name}</Popup>
      </Marker>

      <Marker
        position={[deliveryRoute.destination.lat, deliveryRoute.destination.lng]}
        icon={destinationIcon}
      >
        <Popup>{deliveryRoute.destination.name}</Popup>
      </Marker>

      <Marker
        position={[deliveryRoute.currentPosition.lat, deliveryRoute.currentPosition.lng]}
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
