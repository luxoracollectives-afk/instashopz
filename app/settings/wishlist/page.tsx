"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState<any[]>([]);

  // ✅ LOAD WISHLIST
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  // ❌ REMOVE ITEM
  const removeItem = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // 🛒 MOVE TO CART
  const moveToCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const exists = cart.find((i: any) => i.id === item.id);

    let updatedCart;

    if (exists) {
      updatedCart = cart.map((i: any) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...item, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // remove from wishlist
    removeItem(item.id);

    alert("Moved to cart 🛒");
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 pb-20">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">My Wishlist</h1>
      </div>

      {/* EMPTY */}
      {wishlist.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          ❤️ Your wishlist is empty
        </div>
      )}

      {/* ITEMS */}
      <div className="flex flex-col gap-4">

        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-[#1a1a1a] p-3 rounded-xl flex gap-3"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* DETAILS */}
            <div className="flex flex-col flex-1">

              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">₹{item.price}</p>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-2 text-sm">

                <button
                  onClick={() => moveToCart(item)}
                  className="text-green-400"
                >
                  🛒 Move to Cart
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400"
                >
                  ✕ Remove
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </main>
  );
}