"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

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

      {/* OPTIONS */}
      <div className="mt-6 px-4 flex flex-col gap-6">

        <Link href="/settings/account/personal/phone/add" className="block">
          <div className="flex justify-between items-center cursor-pointer hover:opacity-70 transition">
            <p className="text-lg">Add phone number</p>
            <span>{">"}</span>
          </div>
        </Link>

        <Link href="/settings/account/personal/phone/change" className="block">
          <div className="flex justify-between items-center cursor-pointer hover:opacity-70 transition">
            <p className="text-lg">Change phone number</p>
            <span>{">"}</span>
          </div>
        </Link>

      </div>
    </main>
  );
}