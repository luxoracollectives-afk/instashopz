"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { orders } from "../../data/orders"; // ✅ FIXED IMPORT

export default function OrdersPage() {
  const router = useRouter();

  const today = orders.filter((o) => o.category === "today");
  const active = orders.filter((o) => o.category === "active");
  const past = orders.filter((o) => o.category === "past");

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Shipped") return "text-blue-400";
    return "text-yellow-400";
  };

  const renderSection = (title: string, data: any[]) => {
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
              <div className="bg-[#1a1a1a] p-3 rounded-2xl flex justify-between items-center">

                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg" />

                  <div>
                    <p className="font-semibold">
                      {item.items[0].name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {item.items.length} item(s)
                    </p>
                    <p className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </p>
                  </div>
                </div>

                <span>{">"}</span>

              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>

      <div className="px-4">
        {renderSection("Orders arriving today", today)}
        {renderSection("Active orders", active)}
        {renderSection("Past orders", past)}
      </div>

    </main>
  );
}