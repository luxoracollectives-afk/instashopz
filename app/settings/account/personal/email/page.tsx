"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Edit Email</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        {/* INPUT */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1a1a1a] p-3 rounded-xl outline-none"
          />
        </div>

        {/* SAVE BUTTON */}
        <button className="bg-white text-black py-3 rounded-xl font-semibold">
          Save
        </button>

      </div>
    </main>
  );
}