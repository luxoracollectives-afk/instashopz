"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { use } from "react";

export default function ReturnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const reasons = [
    "Product damaged",
    "Wrong item received",
    "Not as described",
    "No longer needed",
  ];

  const handleReturn = () => {
    if (!reason) {
      alert("Please select a reason");
      return;
    }

    alert("Return request submitted ✅");

    // later → backend integration
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Return Order</h1>
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

      {/* OPTIONAL NOTE */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-2">
          Additional Details (optional)
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add more details..."
          className="w-full h-28 bg-[#1a1a1a] rounded-xl p-3 outline-none"
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleReturn}
        className="w-full mt-6 bg-yellow-500 py-3 rounded-xl font-semibold text-black"
      >
        Submit Return
      </button>

    </main>
  );
}