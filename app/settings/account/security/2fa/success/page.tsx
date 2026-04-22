"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Verify Code</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="bg-[#1a1a1a] p-3 rounded-xl outline-none text-center text-lg"
        />

        <button
          onClick={() => router.push("/settings/account/security/2fa/success")}
          className="bg-white text-black py-3 rounded-xl font-semibold"
        >
          Verify
        </button>

      </div>
    </main>
  );
}