"use client";

import { useRouter } from "next/navigation";

export default function PasswordSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">

      <div className="text-6xl mb-6">🔒</div>

      <h1 className="text-2xl font-semibold mb-2">
        Password Updated
      </h1>

      <p className="text-gray-400 text-sm text-center mb-8">
        Your password has been changed successfully
      </p>

      <button
        onClick={() => router.push("/settings/account")}
        className="bg-white text-black py-3 px-10 rounded-xl font-semibold w-full max-w-xs"
      >
        Done
      </button>

    </main>
  );
}