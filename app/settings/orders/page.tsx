"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { orders } from "./../../data/orders"; // ✅ FIXED (absolute import)

export default function OrdersPage() {
  const router = useRouter();

  const today = orders.filter((o) => o.category === "today");
  const active = orders.filter((o) => o.category === "active");
  const past = orders.filter((o) => o.category === "past");

  const renderSection = (title: string, data: any[]) => {
    if (data.length === 0) return null;

    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/settings/orders/${item.id}`} // ✅ correct route
              className="block"
            >
              <div className="bg-[#5a5a5a] rounded-3xl p-4 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                  
                  {/* IMAGE */}
                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-black">IMG</span>
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="text-lg font-semibold">
                      {item.items[0].name}
                    </p>
                    <p className="text-sm text-gray-200">
                      {item.items[0].description}
                    </p>
                  </div>
                </div>

                {/* RIGHT ARROW */}
                <span className="text-2xl text-gray-300">{">"}</span>

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
      <div className="flex justify-center items-center relative p-4">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-2xl"
        >
          ←
        </button>

        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-10">
        {renderSection("orders arriving today", today)}
        {renderSection("Active orders", active)}
        {renderSection("Past orders", past)}
      </div>

    </main>
  );
}