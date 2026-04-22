"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Setup2FA() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Set up 2FA</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        <p className="text-gray-400 text-sm">
          Enter your email to receive a verification code
        </p>

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

        <Link href="/settings/account/security/2fa/otp">
          <button className="bg-white text-black py-3 rounded-xl font-semibold w-full">
            Send Code
          </button>
        </Link>

      </div>
    </main>
  );
}