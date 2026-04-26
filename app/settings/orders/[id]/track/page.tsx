"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { orders } from "./../../../../data/orders";

export default function TrackPage({
  params,
}: {
 params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const order = orders.find((o) => o.id === id);

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

  const getStatusText = (stage: number) => {
    switch (stage) {
      case 0: return "Order placed";
      case 1: return "Packed";
      case 2: return "In transit";
      case 3: return "Shipped";
      case 4: return "Out for delivery";
      case 5: return "Delivered";
      default: return "Processing";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-xl font-semibold">Track Order</h1>
      </div>

      <div className="px-4 flex flex-col gap-8">

        {/* ETA (AMAZON STYLE) */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl">
          <p className="text-sm text-gray-400">Delivery</p>

          <p className="font-semibold text-lg mt-1">
            {order.eta}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            via {order.courier}
          </p>
        </div>

        {/* TRACKING ID */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl">
          <p className="text-sm text-gray-400">Tracking ID</p>
          <p className="font-semibold">{order.trackingId}</p>
        </div>

        {/* PRODUCT */}
        <div className="bg-[#2a2a2a] rounded-2xl p-4 flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
            IMG
          </div>

          <div>
            <p className="text-lg font-semibold">{order.items[0].name}</p>
            <p className="text-sm text-gray-300">{order.items[0].description}</p>
          </div>
        </div>

        {/* TIMELINE */}
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

                <p className="text-[10px] mt-2 text-center capitalize">
                  {step}
                </p>

                {/* DATE (AMAZON STYLE) */}
                <p className="text-[9px] text-gray-500">
                  {order.timeline[index]?.date}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* CURRENT STATUS */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl">
          <p className="text-sm text-gray-400">Current Status</p>

          <p className="font-semibold text-lg mt-1">
            {getStatusText(order.trackingStage)}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {order.trackingStage === 0 && "Order confirmed"}
            {order.trackingStage === 1 && "Packed and ready"}
            {order.trackingStage === 2 && "Moving through network"}
            {order.trackingStage === 3 && "Shipped to your city"}
            {order.trackingStage === 4 && "Out for delivery today 🚚"}
            {order.trackingStage === 5 && "Delivered successfully"}
          </p>
        </div>

      </div>
    </main>
  );
}