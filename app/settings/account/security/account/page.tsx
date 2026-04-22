"use client";

import { useRouter } from "next/navigation";

export default function AccountActionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">

      <h1 className="text-2xl font-semibold mb-6">
        Account Actions
      </h1>

      <button className="bg-red-600 py-3 px-6 rounded-xl mb-4">
        Deactivate Account
      </button>

      <button className="bg-red-800 py-3 px-6 rounded-xl">
        Delete Account
      </button>

    </main>
  );
}