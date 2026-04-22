"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeactivatePage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDeactivate = () => {
    setError("");

    if (!password) {
      setError("Please enter your password");
      return;
    }

    // 🟡 backend later:
    // verify password → deactivate account

    router.push("/settings/account/security/deactivate/success");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>

        <h1 className="text-2xl font-semibold">
          Deactivate Account
        </h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 flex flex-col gap-6">

        {/* INFO */}
        <div className="flex flex-col gap-2">
          <p className="text-yellow-500 font-semibold">
            This will temporarily disable your account
          </p>

          <p className="text-gray-400 text-sm">
            Your profile, posts, and activity will be hidden until you log back in.
          </p>

          <p className="text-gray-500 text-sm">
            You can reactivate your account anytime by signing in again.
          </p>
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm">
            Enter your password to confirm
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1a1a1a] p-3 rounded-xl outline-none"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* ACTION */}
        <button
          onClick={handleDeactivate}
          className="bg-yellow-600 py-3 rounded-xl font-semibold"
        >
          Deactivate Account
        </button>

      </div>
    </main>
  );
}