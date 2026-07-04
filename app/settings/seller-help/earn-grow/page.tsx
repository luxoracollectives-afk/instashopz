"use client";

import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

export default function EarnGrowHelpPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Earn & Grow</h1>
      </div>

      <section className="px-5 mt-6">
        <div className="bg-zinc-900 rounded-3xl h-56 flex items-center justify-center">
          <PlayCircle size={70} className="text-yellow-400" />
        </div>

        <p className="text-center text-gray-400 mt-3">
          Learn how to track earnings and grow your business.
        </p>
      </section>

      <section className="px-5 mt-10">
        <h2 className="text-xl font-bold">What You'll Do</h2>

        <ul className="mt-4 space-y-3 text-gray-300">
          <li>✅ View your total earnings.</li>
          <li>✅ Track payouts.</li>
          <li>✅ Monitor sales performance.</li>
          <li>✅ Grow your product catalog.</li>
        </ul>
      </section>

      <section className="px-5 mt-10">
        <div className="bg-zinc-900 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-yellow-400">💡 Tip</h3>
          <p className="text-gray-400 mt-2">
            Upload products regularly and stay active to reach more customers.
          </p>
        </div>
      </section>

      <section className="px-5 mt-8">
        <div className="bg-zinc-900 rounded-2xl p-5">
          <h3 className="font-semibold">Estimated Time</h3>
          <p className="text-gray-400 mt-2">📈 Ongoing</p>
        </div>
      </section>

      <section className="px-5 mt-10 pb-10">
        <button
          onClick={() => router.back()}
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full"
        >
          Got It
        </button>
      </section>

    </main>
  );
}