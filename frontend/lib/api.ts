export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`)

  if (!response.ok) {
    throw new Error("Unable to load orders from backend")
  }

  return response.json()
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`)

  if (!response.ok) {
    throw new Error("Unable to load products from backend")
  }

  return response.json()
}

export async function fetchTrackingByOrderId(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/api/tracking/order/${orderId}`)

  if (!response.ok) {
    throw new Error("Unable to load tracking data")
  }

  return response.json()
}

export async function fetchDeliveryByOrderId(orderId: string) {
  const response = await fetch(`${API_BASE_URL}/api/delivery/order/${orderId}`)

  if (!response.ok) {
    throw new Error("Unable to load delivery data")
  }

  return response.json()
}

export async function fetchAnalytics() {
  const response = await fetch(`${API_BASE_URL}/api/analytics`)

  if (!response.ok) {
    throw new Error("Unable to load analytics data")
  }

  return response.json()
}

export async function fetchDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/api/stats`)

  if (!response.ok) {
    throw new Error("Unable to load dashboard stats")
  }

  return response.json()
}
