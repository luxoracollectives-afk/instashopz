"use client";

import { useRouter } from "next/navigation";

export default function SupportMainPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Support</h1>
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col gap-4">

  {/* CONTACT SUPPORT */}
  <div
    onClick={() => router.push("/settings/support/contact")}
    className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer active:scale-[0.98]"
  >
    <p className="font-semibold">Contact Support</p>
    <p className="text-sm text-gray-400 mt-1">
      Get help with your orders or issues
    </p>
  </div>

  {/* FAQ */}
  <div
    onClick={() => router.push("/settings/support/faq")}
    className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer active:scale-[0.98]"
  >
    <p className="font-semibold">FAQs</p>
    <p className="text-sm text-gray-400 mt-1">
      Find answers to common questions
    </p>
  </div>

  {/* REPORT */}
  <div
    onClick={() => router.push("/settings/support/report")}
    className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer active:scale-[0.98]"
  >
    <p className="font-semibold">Report a Problem</p>
    <p className="text-sm text-gray-400 mt-1">
      Let us know if something is wrong
    </p>
  </div>

</div>

    </main>
  );
}