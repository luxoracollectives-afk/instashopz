"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { use } from "react";

export default function ReplacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [issue, setIssue] = useState("");

  const issues = [
    "Wrong item received",
    "Damaged product",
    "Missing parts",
    "Product not working",
  ];

  const handleReplace = () => {
    if (!issue) {
      alert("Please select an issue");
      return;
    }

    alert("Replacement request submitted 🔁");

    // later → backend logic
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Replace Item</h1>
      </div>

      {/* ISSUE SELECTION */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-400">Select Issue</p>

        {issues.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-xl cursor-pointer"
          >
            <input
              type="radio"
              name="issue"
              value={item}
              onChange={() => setIssue(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* CONFIRM */}
      <button
        onClick={handleReplace}
        className="w-full mt-6 bg-yellow-500 py-3 rounded-xl font-semibold text-black"
      >
        Confirm Replacement
      </button>

    </main>
  );
}