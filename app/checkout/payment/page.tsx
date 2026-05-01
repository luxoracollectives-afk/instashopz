"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();

  const [method, setMethod] = useState("");
  const [address, setAddress] = useState<any>(null);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [items, setItems] = useState<any[]>([]);

  // ✅ LOAD DATA
  useEffect(() => {
    const storedAddress = JSON.parse(
      localStorage.getItem("selectedAddress") || "null"
    );
    setAddress(storedAddress);

    const storedCoupon = localStorage.getItem("appliedCoupon");
    if (storedCoupon) {
      setAppliedCoupon(storedCoupon);
      setCoupon(storedCoupon);
    }

    const storedItems = JSON.parse(
      localStorage.getItem("checkoutItems") || "[]"
    );
    setItems(storedItems);
  }, []);

  const options = [
    { id: "cod", label: "Cash on Delivery" },
    { id: "card", label: "Credit / Debit Card" },
    { id: "upi", label: "UPI Payment" },
  ];

  // 💰 CALCULATIONS
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  let discount = 0;

  if (appliedCoupon === "SAVE10") {
    discount = subtotal * 0.1;
  } else if (appliedCoupon === "WELCOME50") {
    discount = 50;
  }

  const delivery = appliedCoupon === "FREESHIP" ? 0 : 40;

  const total = subtotal - discount + delivery;

  // 🎟️ APPLY COUPON
  const handleApplyCoupon = () => {
    if (!coupon) {
      alert("Enter a coupon code");
      return;
    }

    localStorage.setItem("appliedCoupon", coupon);
    setAppliedCoupon(coupon);
    alert(`Coupon "${coupon}" applied 🎉`);
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("cart");
    localStorage.removeItem("appliedCoupon");

    router.push("/checkout/success");
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Payment</h1>
      </div>

      {/* 📍 ADDRESS */}
      {address && (
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
          <p className="text-sm text-gray-400 mb-1">Delivering to</p>

          <p className="font-semibold">{address.name}</p>
          <p className="text-sm text-gray-400">{address.phone}</p>

          <p className="text-sm mt-1">
            {address.address}, {address.city}
          </p>

          <p className="text-sm text-gray-400">
            {address.state} - {address.pincode}
          </p>
        </div>
      )}

      {/* 💳 PAYMENT */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
        <p className="text-sm text-gray-400 mb-3">Payment Method</p>

        {options.map((opt) => (
          <label key={opt.id} className="flex gap-3 mb-2">
            <input
              type="radio"
              value={opt.id}
              checked={method === opt.id}
              onChange={(e) => setMethod(e.target.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* 🎟️ COUPON */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4">
        <p className="text-sm text-gray-400 mb-2">Apply Coupon</p>

        <div className="flex gap-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter code"
            className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-sm"
          />

          <button
            onClick={handleApplyCoupon}
            className="bg-yellow-500 text-black px-4 rounded"
          >
            Apply
          </button>
        </div>
      </div>

      {/* ✅ APPLIED */}
      {appliedCoupon && (
        <div className="bg-green-900 text-green-300 p-3 rounded-xl mb-4">
          Coupon Applied: {appliedCoupon}
        </div>
      )}

      {/* 🔥 OFFERS */}
      <div
        onClick={() => router.push("/checkout/offers")}
        className="bg-[#1a1a1a] p-4 rounded-xl mb-4 flex justify-between cursor-pointer"
      >
        <span>Offers & Coupons</span>
        <span>›</span>
      </div>

      {/* 💰 PRICE BREAKDOWN */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6">

        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm mb-2 text-green-400">
          <span>Discount</span>
          <span>- ₹{discount.toFixed(0)}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </div>

        <hr className="border-gray-700 my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-yellow-400">
            ₹{total.toFixed(0)}
          </span>
        </div>

      </div>

      {/* PLACE ORDER */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
      >
        Place Order
      </button>

    </main>
  );
}