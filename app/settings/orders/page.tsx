"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrdersPage() {
  const router = useRouter();

  const orders = {
    today: [
      { id: "1", name: "Product name", desc: "Description", status: "Delivered" },
    ],
    active: [
      { id: "2", name: "Product name", desc: "Description", status: "Shipped" },
      { id: "3", name: "Product name", desc: "Description", status: "Processing" },
    ],
    past: [
      { id: "4", name: "Product name", desc: "Description", status: "Delivered" },
      { id: "5", name: "Product name", desc: "Description", status: "Delivered" },
    ],
  };

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Shipped") return "text-blue-400";
    return "text-yellow-400";
  };

  const renderSection = (title: string, data: any[]) => (
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
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>

                  {/* STATUS */}
                  <p className={`text-xs mt-1 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </p>
                </div>
              </div>

              {/* RIGHT ARROW */}
              <span className="text-gray-400 text-lg">{">"}</span>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button
          onClick={() => router.back()}
          className="text-2xl"
        >
          ←
        </button>

        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-10">
        {renderSection("Orders arriving today", orders.today)}
        {renderSection("Active orders", orders.active)}
        {renderSection("Past orders", orders.past)}
      </div>

    </main>
  );
}