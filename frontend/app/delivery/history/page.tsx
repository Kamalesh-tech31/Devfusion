import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

const deliveries = [
  {
    id: "#DL001",
    customer: "Rahul Sharma",
    status: "Delivered",
  },
  {
    id: "#DL002",
    customer: "Arun Kumar",
    status: "Returned",
  },
  {
    id: "#DL003",
    customer: "Vikram",
    status: "Delivered",
  },
];

export default function HistoryPage() {
  return (
    <div className="flex bg-[#0B0B0B] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold text-white">
            Delivery History
          </h1>

          <div className="bg-[#1A1A1A] border border-[#27272A] rounded-2xl mt-8 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#111111]">
                <tr>
                  <th className="text-left p-4 text-[#A1A1AA]">
                    Delivery ID
                  </th>

                  <th className="text-left p-4 text-[#A1A1AA]">
                    Customer
                  </th>

                  <th className="text-left p-4 text-[#A1A1AA]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {deliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-t border-[#27272A]"
                  >
                    <td className="p-4 text-white">
                      {delivery.id}
                    </td>

                    <td className="p-4 text-white">
                      {delivery.customer}
                    </td>

                    <td className="p-4 text-[#7F1D1D]">
                      {delivery.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}