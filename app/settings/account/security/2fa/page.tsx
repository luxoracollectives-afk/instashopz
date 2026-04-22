"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TwoFactorPage() {
  const router = useRouter();

  // 👉 default OFF
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    if (!enabled) {
      // turning ON → go to setup
      router.push("/settings/account/security/2fa/setup");
    } else {
      // turning OFF → just disable
      setEnabled(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>

        <h1 className="text-2xl font-semibold">
          Two-Factor Authentication
        </h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        <p className="text-gray-400 text-sm">
          Add an extra layer of security to your account.
        </p>

        {/* TOGGLE ROW */}
        <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl">

          <div>
            <p className="text-lg">2FA Status</p>
            <p className="text-sm text-gray-400">
              {enabled ? "Enabled" : "Disabled"}
            </p>
          </div>

          {/* TOGGLE BUTTON */}
          <button
            onClick={handleToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              enabled ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full transform transition ${
                enabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

        </div>

      </div>
    </main>
  );
}