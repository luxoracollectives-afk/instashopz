"use client";

import { useRouter } from "next/navigation";
import { orders } from "../../../data/orders"; // ✅ FIXED IMPORT

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return <p className="text-white p-4">Order not found</p>;
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Order Details</h1>
      </div>

      <div className="px-4 flex flex-col gap-6">

        <div className="bg-[#1a1a1a] p-4 rounded-xl">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Date: {order.date}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Items</h2>

          {order.items.map((item) => (
            <div key={item.id} className="bg-[#1a1a1a] p-3 rounded-xl mb-3">
              <p>{item.name}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-xl">
          <p>Total: ₹{order.totalAmount}</p>
          <p className="text-sm text-gray-400">{order.address}</p>
        </div>

      </div>
    </main>
  );
}