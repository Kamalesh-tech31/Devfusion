import type { DeliveryRecord } from '@/components/delivery/deliveryData';

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
  source: 'manual' | 'browser';
  displayName: string;
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  timestamp: string;
}

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchDashboard(): Promise<DashboardData> {
  return apiRequest<DashboardData>('/api/dashboard');
}

export async function fetchDeliveries(): Promise<DeliveryRecord[]> {
  return apiRequest<DeliveryRecord[]>('/api/deliveries');
}

export async function fetchHistory(): Promise<DeliveryRecord[]> {
  return apiRequest<DeliveryRecord[]>('/api/history');
}

export async function fetchEarnings(): Promise<EarningsResponse> {
  return apiRequest<EarningsResponse>('/api/earnings');
}

export async function updateDeliveryStatus(id: string, status: string): Promise<DeliveryRecord> {
  return apiRequest<DeliveryRecord>(`/api/deliveries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function saveLocationUpdate(payload: LocationUpdatePayload): Promise<{ success: true }> {
  return apiRequest<{ success: true }>('/api/location-updates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
