"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [mode, setMode] = useState<"return" | "exchange" | null>(null);

  // 🧠 CHECK RETURN WINDOW (24 HOURS)
  const canReturn = (date: string) => {
    const orderTime = new Date(date).getTime();
    const now = Date.now();
    const diffHours = (now - orderTime) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  // ✅ LOAD ORDERS (WITH FAKE DATA)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");

    if (stored.length === 0) {
      const fakeOrders = [
        {
          id: "1001",
          status: "Delivered",
          date: new Date(Date.now() - 5 * 60 * 60 * 1000).toLocaleString(),
          total: 1299,
          items: [
            { id: "p1", name: "Black T-Shirt", price: 499, qty: 1 },
            { id: "p2", name: "Sneakers", price: 800, qty: 1 },
          ],
        },
        {
          id: "1002",
          status: "Processing",
          date: new Date().toLocaleString(),
          total: 699,
          items: [
            { id: "p3", name: "Blue Jeans", price: 699, qty: 1 },
          ],
        },
        {
          id: "1003",
          status: "Delivered",
          date: new Date(Date.now() - 30 * 60 * 60 * 1000).toLocaleString(),
          total: 1599,
          items: [
            { id: "p4", name: "Jacket", price: 1599, qty: 1 },
          ],
        },
      ];

      localStorage.setItem("orders", JSON.stringify(fakeOrders));
      setOrders(fakeOrders);
    } else {
      setOrders(stored);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button onClick={() => router.back()} className="text-xl">←</button>
        <h1 className="text-lg font-semibold">Order History</h1>
      </div>

      {/* EMPTY */}
      {orders.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          No orders yet
        </div>
      )}

      {/* ORDERS */}
      <div className="flex flex-col">

        {orders.map((order) => {
          const isDelivered = order.status === "Delivered";
          const allowReturn = isDelivered && canReturn(order.date);

          return (
            <div key={order.id} className="border-b border-gray-800 p-4">

              {/* HEADER */}
              <div className="flex justify-between mb-2 text-sm">
                <span>Order #{order.id.slice(-5)}</span>
                <span className="text-yellow-400">{order.status}</span>
              </div>

              {/* DATE */}
              <p className="text-xs text-gray-400 mb-3">{order.date}</p>

              {/* ITEMS */}
              <div className="flex flex-col gap-2 mb-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between font-semibold text-sm mb-3">
                <span>Total</span>
                <span className="text-yellow-400">₹{order.total}</span>
              </div>

              {/* ACTIONS */}
              {allowReturn && (
                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setMode("return");
                    }}
                    className="flex-1 border border-yellow-500 py-2 rounded text-sm"
                  >
                    Return
                  </button>

                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setMode("exchange");
                    }}
                    className="flex-1 border border-blue-500 py-2 rounded text-sm"
                  >
                    Exchange
                  </button>

                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* 🔁 MODAL */}
      {selectedOrder && mode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">

          <div className="bg-[#1a1a1a] p-4 rounded-xl w-full max-w-md">

            <h2 className="text-lg font-semibold mb-3 capitalize">
              {mode} Request
            </h2>

            {/* RETURN FORM */}
            {mode === "return" && (
              <>
                <p className="text-sm mb-2">Reason</p>

                <select className="w-full bg-black border border-gray-700 p-2 rounded mb-3">
                  <option>Wrong item</option>
                  <option>Not satisfied</option>
                  <option>Quality issue</option>
                </select>

                <p className="text-sm mb-2">Checklist</p>

                <label className="block text-sm">
                  <input type="checkbox" className="mr-2" />
                  Tags available
                </label>

                <label className="block text-sm">
                  <input type="checkbox" className="mr-2" />
                  Barcode intact
                </label>
              </>
            )}

            {/* EXCHANGE FORM */}
            {mode === "exchange" && (
              <>
                <p className="text-sm mb-2">Select Issue</p>

                <select className="w-full bg-black border border-gray-700 p-2 rounded mb-3">
                  <option>Size issue</option>
                  <option>Color issue</option>
                  <option>Damaged product</option>
                </select>
              </>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => {
                  alert(`${mode} request submitted ✅`);
                  setSelectedOrder(null);
                  setMode(null);
                }}
                className="flex-1 bg-yellow-500 text-black py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setMode(null);
                }}
                className="flex-1 border border-gray-600 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}