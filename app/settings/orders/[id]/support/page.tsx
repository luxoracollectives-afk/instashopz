"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { use } from "react";

export default function SupportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const issues = [
    "Delivery delay",
    "Damaged product",
    "Wrong item",
    "Other",
  ];

  const handleSubmit = () => {
    if (!issue) {
      alert("Please select an issue");
      return;
    }

    alert("Support request submitted ✅");

    // later we connect API
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Contact Support</h1>
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

      {/* MESSAGE BOX */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-2">Describe your issue</p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your issue..."
          className="w-full h-28 bg-[#1a1a1a] rounded-xl p-3 outline-none"
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-yellow-500 py-3 rounded-xl font-semibold text-black"
      >
        Submit Request
      </button>

    </main>
  );
}