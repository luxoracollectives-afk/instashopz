"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

// ✅ SHARED REVIEWS DATA (later move to data/reviews.ts)
const reviews = [
  { rating: 5, text: "Excellent product, totally worth it!" },
  { rating: 4, text: "Very good quality, fast delivery." },
  { rating: 3, text: "Decent product, could be better." },
  { rating: 5, text: "Loved it! Will buy again." },
  { rating: 4, text: "Nice product for the price." },
];

export default function ReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  // ✅ CALCULATE AVERAGE
  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  // ✅ COUNT PER STAR
  const countRatings = (star: number) =>
    reviews.filter((r) => r.rating === star).length;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Customer Reviews</h1>
      </div>

      <div className="px-4 flex flex-col gap-6 pb-10">

        {/* ⭐ OVERALL RATING */}
        <div className="bg-[#2a2a2a] p-5 rounded-xl flex flex-col items-center">

          <p className="text-4xl font-bold text-yellow-400">
            {avg.toFixed(1)} ★
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Based on {reviews.length} reviews
          </p>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Most customers are satisfied with this product.
          </p>

        </div>

        {/* 📊 RATING BREAKDOWN */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl flex flex-col gap-2">

          {[5, 4, 3, 2, 1].map((star) => {
            const count = countRatings(star);
            const percentage = (count / reviews.length) * 100;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-8">{star}★</span>

                <div className="flex-1 h-2 bg-gray-700 rounded">
                  <div
                    className="h-2 bg-yellow-400 rounded transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-xs text-gray-400 w-6">
                  {count}
                </span>
              </div>
            );
          })}

        </div>

        {/* 🧾 ALL REVIEWS */}
        <div className="flex flex-col gap-4">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#2a2a2a] p-4 rounded-xl"
            >
              <p className="text-yellow-400 text-sm">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="text-sm mt-2">
                {review.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}