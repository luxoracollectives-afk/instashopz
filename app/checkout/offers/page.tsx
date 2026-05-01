"use client";

import { useRouter } from "next/navigation";

export default function OffersPage() {
  const router = useRouter();

  const applyCoupon = (code: string) => {
    localStorage.setItem("appliedCoupon", code);
    alert(`Coupon "${code}" applied 🎉`);
    router.back();
  };

  const offers = [
    {
      code: "SAVE10",
      desc: "Get 10% off on orders above ₹999",
    },
    {
      code: "FREESHIP",
      desc: "Free delivery on your order",
    },
    {
      code: "WELCOME50",
      desc: "Flat ₹50 off for new users",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Offers</h1>
      </div>

      {/* OFFERS LIST */}
      <div className="flex flex-col gap-4">

        {offers.map((offer) => (
          <div
            key={offer.code}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700"
          >

            <p className="font-semibold text-yellow-400">
              {offer.code}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {offer.desc}
            </p>

            <button
              onClick={() => applyCoupon(offer.code)}
              className="mt-3 text-sm text-yellow-400"
            >
              Apply Coupon
            </button>

          </div>
        ))}

      </div>

    </main>
  );
}