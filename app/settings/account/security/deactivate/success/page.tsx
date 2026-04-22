"use client";

import { useRouter } from "next/navigation";

export default function DeactivateSuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">

      <h1 className="text-2xl font-semibold mb-4">
        Account Deactivated
      </h1>

      <p className="text-gray-400 text-sm text-center mb-8">
        Your account has been temporarily disabled.
        You can reactivate it anytime by logging back in.
      </p>

      <button
        onClick={() => router.push("/settings/account")}
        className="bg-white text-black py-3 px-10 rounded-xl font-semibold"
      >
        Done
      </button>

    </main>
  );
}