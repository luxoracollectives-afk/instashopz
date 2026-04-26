"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { orders } from "../../data/orders";

export default function OrdersPage() {
  const router = useRouter();

  const today = orders.filter((o) => o.category === "today");
  const active = orders.filter((o) => o.category === "active");
  const past = orders.filter((o) => o.category === "past");

  // 🔥 NEW: status text (premium feel)
  const getStatusText = (status: string) => {
    if (status === "Delivered") return "Delivered successfully";
    if (status === "Shipped") return "On the way";
    return "Preparing your order";
  };

  const renderSection = (title: string, data: any[]) => {
    if (data.length === 0) return null;

    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 capitalize">{title}</h2>

        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/settings/orders/${item.id}`}
            >
              <div className="bg-[#2a2a2a] hover:bg-[#333] transition-all duration-300 rounded-2xl p-4 flex items-center justify-between shadow-md">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-xs text-black">IMG</span>
                  </div>

                  {/* TEXT */}
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">
                      {item.items[0].name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.items[0].description}
                    </p>

                    {/* 🔥 NEW: STATUS TEXT */}
                    <p className="text-xs mt-1 text-gray-500">
                      {getStatusText(item.status)}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <span className="text-2xl text-gray-400">{">"}</span>

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
      <div className="px-4 pb-16">

        {renderSection("orders arriving today", today)}
        {renderSection("active orders", active)}
        {renderSection("past orders", past)}

      </div>

    </main>
  );
}