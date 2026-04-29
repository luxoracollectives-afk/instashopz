"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { use } from "react";

export default function CancelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [reason, setReason] = useState("");

  const reasons = [
    "Ordered by mistake",
    "Found cheaper elsewhere",
    "Delivery is too late",
    "Other",
  ];

  const handleCancel = () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    alert("Order cancelled successfully ❌");

    // later → update order status
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Cancel Order</h1>
      </div>

      {/* REASONS */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-400">Select Reason</p>

        {reasons.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-xl cursor-pointer"
          >
            <input
              type="radio"
              name="reason"
              value={item}
              onChange={() => setReason(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* CONFIRM BUTTON */}
      <button
        onClick={handleCancel}
        className="w-full mt-6 bg-red-500 py-3 rounded-xl font-semibold text-black"
      >
        Confirm Cancel
      </button>

    </main>
  );
}