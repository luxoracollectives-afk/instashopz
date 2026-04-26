"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { orders } from "../../../../data/orders";

export default function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const order = orders.find(
    (o) => o.id === id || o.id === `ord_00${id}`
  );

  if (!order) {
    return <p className="text-white p-4">Order not found</p>;
  }

  const steps = [
    "ordered",
    "packed",
    "in transit",
    "shipped",
    "out for delivery",
    "delivered",
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Track Order</h1>
      </div>

      <div className="px-4 flex flex-col gap-8">

        {/* TRACKING ID */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl">
          <p className="text-sm text-gray-400">Tracking ID</p>
          <p className="font-semibold">{order.id}</p>
        </div>

        {/* PRODUCT */}
        <div className="bg-[#2a2a2a] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
              IMG
            </div>

            <div>
              <p className="text-lg font-semibold">
                {order.items[0].name}
              </p>
              <p className="text-sm text-gray-300">
                {order.items[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* TRACKING TIMELINE (SAME STYLE) */}
        <div className="px-2">
          <div className="flex items-center justify-between relative">

            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">

                {index !== 0 && (
                  <div
                    className={`absolute top-[7px] left-[-50%] w-full h-[2px] ${
                      index <= order.trackingStage
                        ? "bg-red-500"
                        : "bg-gray-600"
                    }`}
                  />
                )}

                <div
                  className={`w-3 h-3 rounded-full z-10 border-2 ${
                    index <= order.trackingStage
                      ? "bg-red-500 border-red-500"
                      : "bg-black border-gray-500"
                  }`}
                />

                <p
                  className={`text-[10px] mt-2 text-center capitalize ${
                    index <= order.trackingStage
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* STATUS */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl">
          <p className="text-sm text-gray-400">Current Status</p>
          <p className="font-semibold capitalize">{order.status}</p>
        </div>

      </div>
    </main>
  );
}