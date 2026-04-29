"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReportPage() {
  const router = useRouter();
  const [issue, setIssue] = useState("");

  const handleSubmit = () => {
    alert("Report submitted 🚨");
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Report Problem</h1>
      </div>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe the problem..."
        className="w-full h-32 bg-[#1a1a1a] p-3 rounded-xl"
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-red-500 py-3 rounded-xl text-black font-semibold"
      >
        Submit Report
      </button>

    </main>
  );
}