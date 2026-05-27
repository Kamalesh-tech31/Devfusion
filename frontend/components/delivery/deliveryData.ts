export type DeliveryStatus =
  | "Pending"
  | "Out for Delivery"
  | "Delivered"
  | "Failed Attempt"
  | "Returned";

export type DeliveryPriority = "High" | "Medium" | "Low";

export interface DeliveryRecord {
  id: string;
  customer: string;
  address: string;
  city: string;
  eta: string;
  status: DeliveryStatus;
  priority: DeliveryPriority;
  contact: string;
  location: string;
  lastUpdated: string;
}
