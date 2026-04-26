"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { orders } from "../../../../data/orders";

export default function TrackOrder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const order = orders.find((o) => o.id === id);
  if (!order) return <p className="text-white p-4">Order not found</p>;

  // 🔥 detailed tracking steps
  const timeline = [
    {
      title: "Order placed",
      desc: "Your order has been placed",
      date: order.date,
    },
    {
      title: "Packed",
      desc: "Seller has packed your item",
      date: "April 23, 2026",
    },
    {
      title: "Shipped",
      desc: "Item shipped from warehouse",
      date: "April 24, 2026",
    },
    {
      title: "Out for delivery",
      desc: "Courier is delivering your order",
      date: "April 25, 2026",
    },
    {
      title: "Delivered",
      desc: "Order delivered successfully",
      date: "April 26, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Track Order</h1>
      </div>

      <div className="px-4 flex flex-col gap-6 pb-16">

        {/* TRACKING ID */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Tracking ID</p>
          <p className="font-semibold">{order.id}</p>
        </div>

        {/* PRODUCT */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl flex gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
            IMG
          </div>

          <div>
            <p className="font-semibold">{order.items[0].name}</p>
            <p className="text-sm text-gray-400">
              {order.items[0].description}
            </p>
          </div>
        </div>

        {/* DELIVERY INFO */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Delivery Status</p>
          <p className="font-semibold">{order.status}</p>

          <p className="text-sm text-gray-500 mt-1">
            {order.status === "Delivered"
              ? "Delivered successfully"
              : "Arriving soon"}
          </p>
        </div>

        {/* TIMELINE */}
        <div className="bg-[#2a2a2a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-4">Tracking Details</h2>

          <div className="flex flex-col gap-6">

            {timeline.map((step, index) => {
              const active = index <= order.trackingStage;

              return (
                <div key={index} className="flex gap-3">

                  {/* DOT + LINE */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        active ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />

                    {index !== timeline.length - 1 && (
                      <div className="w-[2px] h-10 bg-gray-600 mt-1" />
                    )}
                  </div>

                  {/* TEXT */}
                  <div>
                    <p
                      className={`font-semibold ${
                        active ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      {step.desc}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {step.date}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </main>
  );
}