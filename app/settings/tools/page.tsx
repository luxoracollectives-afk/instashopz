"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ToolsPage() {
  const router = useRouter();

  const [accountType, setAccountType] = useState<
    "personal" | "creator" | "business"
  >("personal");

  // ✅ Get account type from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("accountType");
    if (saved) {
      setAccountType(saved as "personal" | "creator" | "business");
    }
  }, []);

  // ✅ Tools based on account type
  const tools =
    accountType === "personal"
      ? ["Saved Items", "History"]
      : [
          "Insights",
          "Analytics",
          "Content Performance",
          "Promotions",
          "Audience Stats",
        ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Tools</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-3">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer active:scale-[0.98] transition"
          >
            {tool}
          </div>
        ))}
      </div>

    </main>
  );
}