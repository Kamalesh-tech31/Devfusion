import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import DeliveryCard from "@/components/delivery/DeliveryCard";

export default function DeliveriesPage() {
  return (
    <div className="flex bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-white">
            Assigned Deliveries
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <DeliveryCard
              customer="Rahul Sharma"
              address="Anna Nagar, Chennai"
              status="Out for Delivery"
            />

            <DeliveryCard
              customer="Vikram Singh"
              address="Coimbatore, Tamil Nadu"
              status="Pending"
            />

            <DeliveryCard
              customer="Arjun Kumar"
              address="Madurai, Tamil Nadu"
              status="Delivered"
            />

            <DeliveryCard
              customer="Karthik"
              address="Salem, Tamil Nadu"
              status="Failed Attempt"
            />
          </div>
        </main>
      </div>
    </div>
  );
}