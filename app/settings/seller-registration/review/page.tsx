"use client";

import { useRouter } from "next/navigation";

import ProgressBar from "../components/ProgressBar";
import SectionHeader from "../components/SectionHeader";

export default function ReviewPage() {
  const router = useRouter();

  function handleSubmit() {
    // TODO:
    // Submit registration to backend

    router.push("/settings/seller-registration/success");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">

        <ProgressBar
          currentStep={5}
          totalSteps={5}
        />

        <div className="mt-8">
          <SectionHeader
            title="Review & Submit"
            subtitle="Please review your information before submitting your seller application."
          />
        </div>

        <div className="space-y-6 mt-8">

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Business Details
            </h2>

            <div className="space-y-2 text-zinc-300">
              <p><strong>Business Name:</strong> Demo Business</p>
              <p><strong>Owner Name:</strong> John Doe</p>
              <p><strong>Business Type:</strong> Proprietorship</p>
              <p><strong>GSTIN:</strong> 22AAAAA0000A1Z5</p>
              <p><strong>PAN:</strong> ABCDE1234F</p>
              <p><strong>Email:</strong> demo@email.com</p>
              <p><strong>Mobile:</strong> 9876543210</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Business Address
            </h2>

            <div className="space-y-2 text-zinc-300">
              <p>Address information will appear here.</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Verification
            </h2>

            <div className="space-y-2 text-zinc-300">
              <p>Uploaded documents will appear here.</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Store Setup
            </h2>

            <div className="space-y-2 text-zinc-300">
              <p>Store information will appear here.</p>
            </div>
          </div>

        </div>

        <div className="flex justify-between items-center mt-10">

          <button
            type="button"
            onClick={() => router.back()}
            className="border border-zinc-700 hover:border-yellow-400 text-white px-6 py-3 rounded-full transition"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition"
          >
            Submit Application
          </button>

        </div>

      </div>
    </main>
  );
}