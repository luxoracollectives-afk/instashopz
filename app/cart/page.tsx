"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  // ✅ CART DATA
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 🔥 FIX: ensure qty exists (fallback)
    const fixedCart = storedCart.map((item: any) => ({
      ...item,
      qty: item.qty ?? item.quantity ?? 1,
      price: Number(item.price) || 0,
    }));

    setCartItems(fixedCart);
  }, []);

  // ✅ SELECTED ITEMS
  const [selected, setSelected] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === cartItems.length) {
      setSelected([]);
    } else {
      setSelected(cartItems.map((item) => item.id));
    }
  };

  // ❌ REMOVE ITEM
  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    setSelected((prev) => prev.filter((i) => i !== id));
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❤️ MOVE TO WISHLIST
  const moveToWishlist = (item: any) => {
    const existing = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const already = existing.find((i: any) => i.id === item.id);

    const updatedWishlist = already ? existing : [...existing, item];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    removeItem(item.id);

    alert("Added to wishlist ❤️");
  };

  // 🔢 UPDATE QUANTITY
  const updateQty = (id: number, type: "inc" | "dec") => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            qty:
              type === "inc"
                ? item.qty + 1
                : item.qty > 1
                ? item.qty - 1
                : 1,
          }
        : item
    );

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 TOTAL
  const total = cartItems
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Your Cart</h1>

        <button
          onClick={() => router.back()}
          className="text-2xl text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* EMPTY STATE */}
      {cartItems.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          🛒 Your cart is empty
        </div>
      )}

      {/* SELECT ALL */}
      {cartItems.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={selected.length === cartItems.length}
            onChange={toggleAll}
          />
          <p>Select All</p>
        </div>
      )}

      {/* ITEMS */}
      <div className="flex flex-col gap-4">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#1a1a1a] p-3 rounded-xl flex gap-3"
          >

            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />

            {/* IMAGE */}
            <img
              src={item.image}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* DETAILS */}
            <div className="flex flex-col flex-1">

              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">₹{item.price}</p>

              {/* QUANTITY */}
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => updateQty(item.id, "dec")}
                  className="px-2 bg-[#2a2a2a] rounded"
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => updateQty(item.id, "inc")}
                  className="px-2 bg-[#2a2a2a] rounded"
                >
                  +
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-2 text-sm">

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400"
                >
                  ✕ Remove
                </button>

                <button
                  onClick={() => moveToWishlist(item)}
                  className="text-blue-400"
                >
                  ❤️ Wishlist
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* SUMMARY */}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-[#1a1a1a] p-4 rounded-xl">

          <div className="flex justify-between mb-2 text-sm">
            <span>{selected.length} item(s) selected</span>
            <span className="font-semibold">₹{total}</span>
          </div>

          <button
            onClick={() => {
              if (selected.length === 0) {
                alert("Please select at least one item");
                return;
              }

              const selectedItems = cartItems.filter((item) =>
                selected.includes(item.id)
              );

              localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

              router.push("/checkout");
            }}
            className="w-full bg-yellow-500 py-3 rounded-xl font-semibold text-black"
          >
            Proceed to Checkout
          </button>

        </div>
      )}

    </main>
  );
}