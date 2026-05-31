"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeliveryMap } from "@/components/customer/delivery-map";

import {
  fetchDeliveryByOrderId,
  fetchCustomerOrders as fetchOrders,
  fetchTrackingByOrderId,
} from "@/lib/api";

import { TrackingStep } from "@/lib/mock-data";

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "bg-emerald-500/10 text-emerald-600",
    icon: CheckCircle,
  },
  shipped: {
    label: "Shipped",
    color: "bg-blue-500/10 text-blue-600",
    icon: Truck,
  },
  pending: {
    label: "Pending",
    color: "bg-amber-500/10 text-amber-600",
    icon: Package,
  },
};

type TrackingOrder = {
  id: string;
  customer: string;
  status: string;
  amount: number;
  date: string;
};

function TrackingContent() {
  const searchParams = useSearchParams();

  const orderIdQuery = searchParams.get("orderId");

  const [orders, setOrders] = useState<TrackingOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);

  const [deliveryRoute, setDeliveryRoute] = useState<any>(null);

  const [loadingOrders, setLoadingOrders] = useState(true);

  const [loadingTracking, setLoadingTracking] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const normalizeOrder = (order: any, index: number): TrackingOrder => ({
    id: String(order.id || order._id || order.orderId || `order-${index}`),

    customer:
      order.customer ||
      order.customerName ||
      order.customer_name ||
      "Unknown customer",

    status: order.status || "pending",

    amount:
      typeof order.amount === "number"
        ? order.amount
        : typeof order.totalPrice === "number"
          ? order.totalPrice
          : 0,

    date:
      order.date ||
      order.createdAt ||
      order.updatedAt ||
      new Date().toISOString(),
  });

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);

      setError(null);

      try {
        const ordersData = await fetchOrders();

        const normalizedOrders = Array.isArray(ordersData)
          ? ordersData.map(normalizeOrder)
          : [];

        setOrders(normalizedOrders);

        const firstActiveOrder = normalizedOrders.find(
          (order) => order.status !== "delivered",
        );

        const selectedFromQuery =
          orderIdQuery &&
          normalizedOrders.some((order) => order.id === orderIdQuery)
            ? orderIdQuery
            : null;

        setSelectedOrderId(
          selectedFromQuery || (firstActiveOrder ? firstActiveOrder.id : null),
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load orders",
        );
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    const loadTracking = async () => {
      if (!selectedOrderId) {
        setTrackingSteps([]);

        setDeliveryRoute(null);

        return;
      }

      setLoadingTracking(true);

      setError(null);

      try {
        const trackingData = await fetchTrackingByOrderId(selectedOrderId);

        setTrackingSteps(trackingData.steps || []);

        try {
          const deliveryData = await fetchDeliveryByOrderId(selectedOrderId);

          setDeliveryRoute(deliveryData);
        } catch {
          setDeliveryRoute(null);
        }
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load tracking data",
        );

        setTrackingSteps([]);

        setDeliveryRoute(null);
      } finally {
        setLoadingTracking(false);
      }
    };

    loadTracking();
  }, [selectedOrderId, refreshKey]);

  const activeOrders = orders.filter((order) => order.status !== "delivered");

  const selectedOrder =
    activeOrders.find((order) => order.id === selectedOrderId) ||
    activeOrders[0] ||
    null;

  useEffect(() => {
    if (!selectedOrderId && selectedOrder) {
      setSelectedOrderId(selectedOrder.id);
    }
  }, [selectedOrder, selectedOrderId]);

  const refreshTracking = async () => {
    if (selectedOrderId) {
      setRefreshKey((value) => value + 1);
    }
  };

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

          {loadingOrders ? (
            <Card className="border-none shadow-sm">
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-sm text-muted-foreground">
                  Loading orders...
                </p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {activeOrders.map((order) => {
                const status =
                  statusConfig[order.status as keyof typeof statusConfig];

                const StatusIcon = status?.icon || Package;

                return (
                  <Card
                    key={order.id}
                    className="mb-4 cursor-pointer border-none shadow-sm"
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>

                          <p className="text-sm text-muted-foreground">
                            {order.customer}
                          </p>
                        </div>

                        <Badge className={status?.color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status?.label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order #{selectedOrder?.id}</CardTitle>

                <Button variant="outline" size="sm" onClick={refreshTracking}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <DeliveryMap route={deliveryRoute} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
