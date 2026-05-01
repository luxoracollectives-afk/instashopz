"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AccountTypePage() {
  const router = useRouter();

  const [type, setType] = useState<
    "personal" | "creator" | "business"
  >("personal");

  // ✅ Load saved type
  useEffect(() => {
    const saved = localStorage.getItem("accountType");
    if (saved) {
      setType(saved as "personal" | "creator" | "business");
    }
  }, []);

  // ✅ Save type
  const handleSelect = (value: "personal" | "creator" | "business") => {
    setType(value);
    localStorage.setItem("accountType", value);
  };

  const options = [
    { id: "personal", label: "Personal" },
    { id: "creator", label: "Creator" },
    { id: "business", label: "Business" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Account Type</h1>
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() =>
              handleSelect(opt.id as "personal" | "creator" | "business")
            }
            className={`p-4 rounded-xl cursor-pointer flex justify-between ${
              type === opt.id
                ? "bg-yellow-500 text-black"
                : "bg-[#1a1a1a]"
            }`}
          >
            <p>{opt.label}</p>
            {type === opt.id && <span>✓</span>}
          </div>
        ))}
      </div>

    </main>
  );
}