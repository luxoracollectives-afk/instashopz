"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { orders } from "../../data/orders";

export default function OrdersPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/settings/orders/${order.id}`}>
            <div className="bg-[#1a1a1a] p-3 rounded-xl">
              <p>{order.items[0].name}</p>
              <p className="text-sm text-gray-400">{order.status}</p>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}