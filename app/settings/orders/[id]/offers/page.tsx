"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function OffersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const offers = [
    {
      title: "10% Instant Discount",
      description: "Use HDFC Credit Card and get instant discount",
    },
    {
      title: "Flat ₹500 Off",
      description: "On orders above ₹5000",
    },
    {
      title: "No Cost EMI",
      description: "Available on select cards",
    },
    {
      title: "Buy More Save More",
      description: "Buy 2 items and get 5% off",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">Offers</h1>
      </div>

      <div className="px-4 flex flex-col gap-4 pb-10">

        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-[#2a2a2a] p-4 rounded-xl"
          >
            <h3 className="font-semibold text-lg">
              {offer.title}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              {offer.description}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}