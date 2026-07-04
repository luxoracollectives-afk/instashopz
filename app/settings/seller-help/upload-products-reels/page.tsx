"use client";

import { useRouter } from "next/navigation";
import { PlayCircle } from "lucide-react";

export default function UploadProductsHelpPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Upload Products & Reels</h1>
      </div>

      <section className="px-5 mt-6">
        <div className="bg-zinc-900 rounded-3xl h-56 flex items-center justify-center">
          <PlayCircle size={70} className="text-yellow-400" />
        </div>

        <p className="text-center text-gray-400 mt-3">
          Learn how to upload products and create reels.
        </p>
      </section>

      <section className="px-5 mt-10">
        <h2 className="text-xl font-bold">What You'll Do</h2>

        <ul className="mt-4 space-y-3 text-gray-300">
          <li>✅ Upload product images.</li>
          <li>✅ Add title and description.</li>
          <li>✅ Set price and stock.</li>
          <li>✅ Upload engaging reels.</li>
        </ul>
      </section>

      <section className="px-5 mt-10">
        <div className="bg-zinc-900 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-yellow-400">💡 Tip</h3>
          <p className="text-gray-400 mt-2">
            Products with reels usually attract more customers.
          </p>
        </div>
      </section>

      <section className="px-5 mt-8">
        <div className="bg-zinc-900 rounded-2xl p-5">
          <h3 className="font-semibold">Estimated Time</h3>
          <p className="text-gray-400 mt-2">⏱ 10–15 Minutes</p>
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