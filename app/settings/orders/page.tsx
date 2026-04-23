"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Order = {
  id: string;
  name: string;
  desc: string;
  status: "Delivered" | "Shipped" | "Processing";
  date: "today" | "active" | "past";
};

export default function OrdersPage() {
  const router = useRouter();

  // ✅ MORE REALISTIC DATA (LIKE AMAZON)
  const orders: Order[] = [
    { id: "1", name: "iPhone 14", desc: "128GB Blue", status: "Delivered", date: "today" },

    { id: "2", name: "Nike Shoes", desc: "Running shoes", status: "Shipped", date: "active" },
    { id: "3", name: "T-Shirt", desc: "Black XL", status: "Processing", date: "active" },
    { id: "4", name: "Headphones", desc: "Noise Cancelling", status: "Shipped", date: "active" },

    { id: "5", name: "Laptop Bag", desc: "Waterproof", status: "Delivered", date: "past" },
    { id: "6", name: "Keyboard", desc: "Mechanical RGB", status: "Delivered", date: "past" },
    { id: "7", name: "Mouse", desc: "Wireless", status: "Delivered", date: "past" },
  ];

  // ✅ GROUPING LOGIC (IMPORTANT)
  const groupedOrders = {
    today: orders.filter((o) => o.date === "today"),
    active: orders.filter((o) => o.date === "active"),
    past: orders.filter((o) => o.date === "past"),
  };

  const getStatusColor = (status: Order["status"]) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Shipped") return "text-blue-400";
    return "text-yellow-400";
  };

  const renderSection = (title: string, data: Order[]) => {
    if (data.length === 0) return null;

    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/settings/orders/${item.id}`}
              className="block"
            >
              <div className="bg-[#1a1a1a] hover:bg-[#222] transition p-3 rounded-2xl flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                  {/* IMAGE */}
                  <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400">IMG</span>
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                    <p className={`text-xs mt-1 ${getStatusColor(item.status)}`}>
                      {item.status}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <span className="text-gray-400 text-lg">{">"}</span>

              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-10">
        {renderSection("Orders arriving today", groupedOrders.today)}
        {renderSection("Active orders", groupedOrders.active)}
        {renderSection("Past orders", groupedOrders.past)}
      </div>

    </main>
  );
}