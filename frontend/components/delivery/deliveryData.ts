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

export const deliveryRecords: DeliveryRecord[] = [
  {
    id: "#DL001",
    customer: "Rahul Sharma",
    address: "Anna Nagar, Chennai",
    city: "Chennai",
    eta: "12:15 PM",
    status: "Out for Delivery",
    priority: "High",
    contact: "+91 98765 43210",
    location: "Near Munroe Market",
    lastUpdated: "5 min ago",
  },
  {
    id: "#DL002",
    customer: "Arun Kumar",
    address: "Coimbatore, Tamil Nadu",
    city: "Coimbatore",
    eta: "02:40 PM",
    status: "Pending",
    priority: "Medium",
    contact: "+91 87654 32109",
    location: "Warehouse Gate 3",
    lastUpdated: "12 min ago",
  },
  {
    id: "#DL003",
    customer: "Vikram Singh",
    address: "Madurai, Tamil Nadu",
    city: "Madurai",
    eta: "04:05 PM",
    status: "Delivered",
    priority: "Low",
    contact: "+91 76543 21098",
    location: "Delivered",
    lastUpdated: "1 hour ago",
  },
  {
    id: "#DL004",
    customer: "Karthik Menon",
    address: "Salem, Tamil Nadu",
    city: "Salem",
    eta: "06:10 PM",
    status: "Failed Attempt",
    priority: "High",
    contact: "+91 65432 10987",
    location: "Customer not available",
    lastUpdated: "30 min ago",
  },
];

export const deliveryHistory: DeliveryRecord[] = [
  {
    id: "#DL005",
    customer: "Priya Nair",
    address: "Velachery, Chennai",
    city: "Chennai",
    eta: "09:30 AM",
    status: "Delivered",
    priority: "Low",
    contact: "+91 54321 09876",
    location: "Completed",
    lastUpdated: "Yesterday",
  },
  {
    id: "#DL006",
    customer: "Sanjay Menon",
    address: "Erode, Tamil Nadu",
    city: "Erode",
    eta: "11:15 AM",
    status: "Returned",
    priority: "Medium",
    contact: "+91 43210 98765",
    location: "Returned to hub",
    lastUpdated: "Yesterday",
  },
  {
    id: "#DL007",
    customer: "Deepa Rao",
    address: "Tirunelveli, Tamil Nadu",
    city: "Tirunelveli",
    eta: "01:50 PM",
    status: "Delivered",
    priority: "Medium",
    contact: "+91 32109 87654",
    location: "Completed",
    lastUpdated: "2 days ago",
  },
];

export const earningsHighlights = [
  {
    title: "Today's Earnings",
    value: "₹2,450",
    description: "+12% from yesterday",
  },
  {
    title: "Weekly Earnings",
    value: "₹12,700",
    description: "8 deliveries completed",
  },
  {
    title: "Monthly Earnings",
    value: "₹48,300",
    description: "14 premium routes",
  },
];

export const incentiveHighlights = [
  {
    label: "Completed 50 Deliveries",
    amount: "+₹2,000",
  },
  {
    label: "Fast Delivery Bonus",
    amount: "+₹850",
  },
  {
    label: "Priority Route Premium",
    amount: "+₹600",
  },
];
