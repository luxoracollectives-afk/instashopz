"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
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
  const [showToast, setShowToast] = useState(false);

  // ✅ CART COUNT
  const [cartCount, setCartCount] = useState(0);

  // ✅ LOAD CART COUNT
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(stored.length);
  }, []);

  // 🛒 ADD TO CART
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const item = {
      id: order.id,
      name: order.items[0].name,
      price: order.totalAmount,
      qty: qty,
      image: order.items[0].images?.[0] || "",
    };

    const already = existingCart.find((i: any) => i.id === item.id);

    let updatedCart;

    if (already) {
      updatedCart = existingCart.map((i: any) =>
        i.id === item.id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      updatedCart = [...existingCart, item];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🔔 TOAST
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);

    // 🔥 UPDATE BADGE
    setCartCount(updatedCart.length);
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* 🔝 HEADER WITH CART ICON */}
      <div className="flex items-center justify-between p-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-2xl">←</button>
          <h1 className="text-xl font-semibold">Product</h1>
        </div>

        {/* RIGHT (CART ICON + BADGE) */}
        <button
          onClick={() => router.push("/cart")}
          className="relative text-2xl"
        >
          🛒

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

      </div>

      {/* CONTENT */}
      <div className="px-4 flex flex-col gap-6 pb-28">

        {/* 🖼 IMAGE */}
        <div className="w-full h-80 relative overflow-hidden rounded-xl bg-gray-300">

          {images.length > 0 ? (
            <img src={images[current]} className="w-full h-full object-cover" />
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

        {/* 📦 INFO */}
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

      </div>

      {/* 🛒 STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 p-3 flex flex-col gap-2">

        <div className="flex justify-between text-sm text-gray-300 px-1">
          <span>{qty} item(s)</span>
          <span className="font-semibold text-white">
            ₹{order.totalAmount * qty}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={addToCart}
            className="flex-1 bg-[#2a2a2a] py-3 rounded-xl"
          >
            Add to Cart
          </button>

          <button className="flex-1 bg-yellow-500 py-3 rounded-xl font-semibold text-black">
            Buy Now
          </button>
        </div>

      </div>

      {/* 🔔 TOAST */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-[#1a1a1a] border border-gray-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-4">
          <p className="text-sm">Item added to cart 🛒</p>

          <button
            onClick={() => setShowToast(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

    </main>
  );
}