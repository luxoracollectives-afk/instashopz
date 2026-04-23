"use client";

import { useRouter } from "next/navigation";

export default function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  // mock data (later from backend)
  const order = {
    id: params.id,
    status: "Shipped",
    date: "April 22, 2026",
    items: [
      {
        name: "iPhone 14",
        desc: "128GB Blue",
        price: 69999,
      },
      {
        name: "Case Cover",
        desc: "Silicone Black",
        price: 999,
      },
    ],
    total: 70998,
    address: "Hyderabad, India",
  };

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Shipped") return "text-blue-400";
    return "text-yellow-400";
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Order Details</h1>
      </div>

      <div className="px-4 pb-10 flex flex-col gap-6">

        {/* ORDER INFO */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Order ID</p>
          <p className="font-semibold">{order.id}</p>

          <p className={`mt-2 text-sm ${getStatusColor(order.status)}`}>
            {order.status}
          </p>

          <p className="text-sm text-gray-400 mt-1">{order.date}</p>
        </div>

        {/* ITEMS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Items</h2>

          <div className="flex flex-col gap-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] p-3 rounded-xl flex gap-3"
              >
                {/* IMAGE */}
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">IMG</span>
                </div>

                {/* TEXT */}
                <div className="flex flex-col flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  <p className="mt-1 font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p className="text-sm text-gray-400">{order.address}</p>
        </div>

        {/* PRICE BREAKDOWN */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-3">Price Details</h2>

          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">

          <button className="bg-red-600 py-3 rounded-xl font-semibold">
            Cancel Order
          </button>

          <button className="bg-[#1a1a1a] py-3 rounded-xl">
            Contact Support
          </button>

        </div>

      </div>
    </main>
  );
}