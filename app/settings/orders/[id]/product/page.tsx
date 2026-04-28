"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { useState } from "react";
import { orders } from "@/data/orders";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const order = orders.find((o) => o.id == id);

  if (!order) {
    return <p className="text-white p-4">Product not found</p>;
  }

  const reviews = order.reviews || [];
  const images = order.items[0].images || [];

  const [current, setCurrent] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">Product</h1>
      </div>

      {/* CONTENT */}
      <div className="px-4 flex flex-col gap-6 pb-28">

        {/* 🖼 IMAGE SLIDER */}
        <div className="w-full h-80 relative overflow-hidden rounded-xl bg-gray-300">

          {images.length > 0 ? (
            <img
              src={images[current]}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              IMG
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-1 rounded"
              >
                ‹
              </button>

              <button
                onClick={() =>
                  setCurrent((prev) =>
                    prev < images.length - 1 ? prev + 1 : prev
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-1 rounded"
              >
                ›
              </button>

              <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === current ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 📦 PRODUCT INFO */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            {order.items[0].name}
          </h2>

          <p className="text-sm text-gray-400">
            {order.items[0].description}
          </p>

          <div className="text-yellow-400 text-sm">
            ⭐ 4.3 • {reviews.length} reviews
          </div>

          {/* 💰 PRICE (dynamic with qty) */}
          <p className="text-2xl font-bold">
            ₹{order.totalAmount * qty}
          </p>

          <p className="text-green-400 text-sm">
            Free delivery by tomorrow
          </p>
        </div>

        {/* 🔢 QUANTITY */}
        <div className="flex items-center gap-4">
          <p className="text-sm">Quantity</p>

          <div className="flex items-center bg-[#2a2a2a] rounded-lg">
            <button
              onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
              className="px-3 py-1 text-lg"
            >
              −
            </button>

            <span className="px-4">{qty}</span>

            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="px-3 py-1 text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* 📄 DETAILS */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Product Details</h3>

          <ul className="text-sm text-gray-400 mt-2 flex flex-col gap-1">
            <li>• High quality material</li>
            <li>• 1 year warranty</li>
            <li>• Fast delivery available</li>
          </ul>
        </div>

        {/* ⭐ REVIEWS */}
        <div className="mt-4">
          <div
            onClick={() => router.push(`/settings/orders/${order.id}/reviews`)}
            className="flex items-center justify-between cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <span className="text-gray-400 text-xl">{">"}</span>
          </div>

          <div className="mt-2 flex flex-col gap-3">
            {reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="bg-[#2a2a2a] p-3 rounded-xl">
                <p className="text-yellow-400 text-sm">
                  {"⭐".repeat(review.rating)}
                </p>
                <p className="text-sm mt-1">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🎁 OFFERS */}
        <div className="mt-6">
          <div
            onClick={() => router.push(`/settings/orders/${order.id}/offers`)}
            className="flex items-center justify-between cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Offers</h3>
            <span className="text-gray-400 text-xl">{">"}</span>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="bg-[#2a2a2a] p-3 rounded-xl text-sm">
              💳 10% Instant Discount with HDFC Card
            </div>
            <div className="bg-[#2a2a2a] p-3 rounded-xl text-sm">
              🏷️ Buy 2 items, get 5% off
            </div>
          </div>
        </div>

        {/* 🚚 DELIVERY */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Delivery Details</h3>

          <p className="text-sm text-gray-400 mt-2">
            Delivering to Hyderabad - 500001
          </p>

          <p className="text-green-400 text-sm mt-1">
            FREE Delivery by Tomorrow
          </p>
        </div>

        {/* 📄 DESCRIPTION */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Description</h3>

          <p className="text-sm text-gray-400 mt-2">
            This product is built with premium quality materials and designed
            for long-lasting performance.
          </p>
        </div>

        {/* ⭐ FEATURES */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Key Features</h3>

          <ul className="text-sm text-gray-400 mt-2 flex flex-col gap-1">
            <li>• Durable and long-lasting</li>
            <li>• Lightweight and comfortable</li>
            <li>• Premium build quality</li>
            <li>• Trusted brand assurance</li>
          </ul>
        </div>

      </div>

      {/* 🛒 STICKY BAR (IMPROVED) */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 p-3 flex flex-col gap-2">

        {/* PRICE + QTY */}
        <div className="flex justify-between text-sm text-gray-300 px-1">
          <span>{qty} item(s)</span>
          <span className="font-semibold text-white">
            ₹{order.totalAmount * qty}
          </span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-[#2a2a2a] py-3 rounded-xl">
            Add to Cart
          </button>

          <button className="flex-1 bg-yellow-500 py-3 rounded-xl font-semibold text-black">
            Buy Now
          </button>
        </div>

      </div>

    </main>
  );
}