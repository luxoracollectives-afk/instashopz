"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">

      <h1 className="text-2xl font-bold mb-4">🎉 Order Placed!</h1>

      <p className="text-gray-400 mb-6">
        Your order has been successfully placed.
      </p>

      <button
        onClick={() => router.push("/")}
        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
      >
        Continue Shopping
      </button>

    </main>
  );
}