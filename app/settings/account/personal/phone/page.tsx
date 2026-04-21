"use client";

import { useRouter } from "next/navigation";

export default function PhonePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Phone Number</h1>
      </div>

      {/* LIST STYLE (LIKE YOUR UI) */}
      <div className="mt-6 px-4 flex flex-col gap-6">

        <div className="flex justify-between items-center cursor-pointer">
          <p className="text-lg">Add phone number</p>
          <span className="text-xl">{">"}</span>
        </div>

        <div className="flex justify-between items-center cursor-pointer">
          <p className="text-lg">Change phone number</p>
          <span className="text-xl">{">"}</span>
        </div>

      </div>
    </main>
  );
}