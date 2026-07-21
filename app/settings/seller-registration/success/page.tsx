"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

        <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          Registration Submitted
        </h1>

        <p className="text-zinc-400 leading-7 mb-8">
          Thank you for registering as an InstaShopz seller.
          <br />
          Our team will verify your details and documents.
          <br />
          You'll receive an email once your seller account has been approved.
        </p>

        <div className="bg-zinc-800 rounded-xl p-5 mb-8">
          <p className="text-sm text-zinc-400">
            Estimated verification time
          </p>

          <p className="text-yellow-400 font-semibold text-lg mt-2">
            24 – 48 Hours
          </p>
        </div>

        <button
          onClick={() => router.push("/settings")}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-full transition"
        >
          Return to Settings
        </button>

      </div>
    </main>
  );
}