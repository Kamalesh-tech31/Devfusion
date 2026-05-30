import type { DeliveryRecord } from "@/components/delivery/deliveryData";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface DashboardData {
  activeDeliveries: number;
  completedDeliveries: number;
  followUps: number;
  avgEta: string;
  routeUpdates: number;
  activeRoutes: DeliveryRecord[];
}

export interface EarningsResponse {
  highlights: Array<{
    title: string;
    value: string;
    description: string;
  }>;
  incentives: Array<{
    label: string;
    amount: string;
  }>;
}

export interface LocationUpdatePayload {
  deliveryId: string;
  latitude: number;
  longitude: number;
  source: "manual" | "browser";
  displayName: string;
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  timestamp: string;
}

function getApiBaseUrl() {
  return API_BASE_URL;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error || `Request failed with status ${response.status}`,
    );
  }

  return (await response.json()) as T;
}

/* =========================
   Existing APIs
========================= */

export async function fetchOrders() {
  return apiRequest("/api/orders");
}

export async function fetchProducts() {
  return apiRequest("/api/products");
}

export async function fetchTrackingByOrderId(orderId: string) {
  return apiRequest(`/api/tracking/order/${orderId}`);
}

export async function fetchDeliveryByOrderId(orderId: string) {
  return apiRequest(`/api/delivery/order/${orderId}`);
}

export async function fetchAnalytics() {
  return apiRequest("/api/analytics");
}

export async function fetchDashboardStats() {
  return apiRequest("/api/stats");
}

/* =========================
   Delivery APIs
========================= */

export async function fetchDashboard(): Promise<DashboardData> {
  return apiRequest<DashboardData>("/api/deliveries/dashboard");
}

export async function fetchDeliveries(): Promise<DeliveryRecord[]> {
  return apiRequest<DeliveryRecord[]>("/api/deliveries");
}

export async function fetchHistory(): Promise<DeliveryRecord[]> {
  return apiRequest<DeliveryRecord[]>("/api/deliveries/history");
}

export async function fetchEarnings(): Promise<EarningsResponse> {
  return apiRequest<EarningsResponse>("/api/deliveries/earnings");
}

export async function updateDeliveryStatus(
  id: string,
  status: string,
): Promise<DeliveryRecord> {
  return apiRequest<DeliveryRecord>(`/api/deliveries/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function createDelivery(
  payload: Partial<DeliveryRecord>,
): Promise<DeliveryRecord> {
  return apiRequest<DeliveryRecord>("/api/deliveries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateDelivery(
  id: string,
  payload: Partial<DeliveryRecord>,
): Promise<DeliveryRecord> {
  return apiRequest<DeliveryRecord>(`/api/deliveries/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteDelivery(id: string): Promise<{ success: true }> {
  return apiRequest<{ success: true }>(`/api/deliveries/${id}`, {
    method: "DELETE",
  });
}

export async function saveLocationUpdate(
  payload: LocationUpdatePayload,
): Promise<{ success: true }> {
  return apiRequest<{ success: true }>("/api/location-updates", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
