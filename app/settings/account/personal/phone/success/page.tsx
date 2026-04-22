"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">

      {/* SUCCESS ICON */}
      <div className="text-6xl mb-6">✅</div>

      {/* TEXT */}
      <h1 className="text-2xl font-semibold mb-2">
        Phone Updated
      </h1>

      <p className="text-gray-400 text-sm text-center mb-8">
        Your phone number has been updated successfully
      </p>

      {/* DONE BUTTON */}
      <button
        onClick={() => router.push("/settings/account")}
        className="bg-white text-black py-3 px-10 rounded-xl font-semibold w-full max-w-xs"
      >
        Done
      </button>

    </main>
  );
}