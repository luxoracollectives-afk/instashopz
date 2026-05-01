"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);

  // ✅ LOAD ONLY SELECTED ITEMS
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkoutItems") || "[]");
    setItems(stored);
  }, []);

  // 💰 TOTAL
  const total = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>

      {/* EMPTY */}
      {items.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No items selected
        </p>
      )}

      {/* ITEMS */}
      <div className="flex flex-col gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#1a1a1a] p-3 rounded-xl flex gap-3"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* DETAILS */}
            <div className="flex flex-col flex-1">
              <p className="font-semibold text-sm line-clamp-2">
                {item.name}
              </p>

              <p className="text-yellow-400 font-semibold mt-1">
                ₹{item.price}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Qty: {item.qty}
              </p>

              <p className="text-xs text-green-400 mt-1">
                Delivery in 2–3 days 🚚
              </p>
            </div>

            {/* ITEM TOTAL */}
            <div className="text-sm font-semibold">
              ₹{item.price * item.qty}
            </div>

          </div>
        ))}
      </div>

      {/* TOTAL */}
      {items.length > 0 && (
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6 flex justify-between items-center">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-lg font-semibold text-yellow-400">
            ₹{total}
          </p>
        </div>
      )}

      {/* CONTINUE */}
      {items.length > 0 && (
        <button
          onClick={() => router.push("/checkout/address")}
          className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >
          Continue
        </button>
      )}

    </main>
  );
}