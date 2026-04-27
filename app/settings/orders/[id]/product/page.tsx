"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { orders } from "@/data/orders";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  // ✅ SIMPLE + SAFE MATCH
  const order = orders.find((o) => o.id == id);

  if (!order) {
    return <p className="text-white p-4">Product not found</p>;
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">Product</h1>
      </div>

      <div className="px-4 flex flex-col gap-6">

        {/* IMAGE */}
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center">
          IMG
        </div>

        {/* NAME */}
        <h2 className="text-xl font-semibold">
          {order.items[0].name}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400">
          {order.items[0].description}
        </p>

        {/* PRICE */}
        <p className="text-lg font-semibold">
          ₹{order.totalAmount}
        </p>

      </div>
    </main>
  );
}