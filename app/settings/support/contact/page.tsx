"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactSupport() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent ✅");
    router.back();
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-xl font-semibold">Contact Support</h1>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your issue..."
        className="w-full h-32 bg-[#1a1a1a] p-3 rounded-xl"
      />

      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-yellow-500 py-3 rounded-xl text-black font-semibold"
      >
        Send Message
      </button>

    </main>
  );
}