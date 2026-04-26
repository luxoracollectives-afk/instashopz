"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { orders } from "@/app/data/orders";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const order = orders.find((o) => o.id === id);
  if (!order) return <p className="text-white p-4">Order not found</p>;

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
      <div className="flex justify-center items-center relative p-4">
        <button onClick={() => router.back()} className="absolute left-4 text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Orders</h1>
      </div>

      <div className="px-4 flex flex-col gap-8 pb-16">

        {/* PRODUCT CARD */}
        <div className="bg-[#2a2a2a] rounded-3xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-xs text-black">IMG</span>
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

          <span className="text-xl text-gray-400">{">"}</span>
        </div>

        {/* TRACKING (FIXED FOR MOBILE) */}
        <div className="overflow-x-auto">
          <div className="flex items-center min-w-[600px] px-2">

            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">

                {/* STEP */}
                <div className="flex flex-col items-center min-w-[80px]">

                  <div
                    className={`w-3 h-3 rounded-full ${
                      index <= order.trackingStage
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  />

                  <p className="text-[10px] mt-2 text-center text-gray-400 capitalize">
                    {step}
                  </p>
                </div>

                {/* LINE */}
                {index !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] ${
                      index < order.trackingStage
                        ? "bg-red-500"
                        : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}

          </div>
        </div>

        {/* TRACK BUTTON */}
        <button className="bg-[#3a3a3a] py-3 rounded-xl">
          TRACK ORDER
        </button>

        {/* PRODUCT DETAILS */}
        <div>
          <h2 className="text-lg font-semibold">product details</h2>
          <p className="text-sm text-gray-400 mt-2">
            {order.items[0].description}
          </p>
        </div>

        {/* PRICE */}
        <div className="flex justify-between">
          <span>price</span>
          <span className="font-semibold">₹{order.totalAmount}</span>
        </div>

        {/* SUPPORT */}
        <button className="bg-[#3a3a3a] py-3 rounded-xl">
          contact support
        </button>

        {/* ACTION BUTTONS */}
        {order.trackingStage < 3 && (
          <button className="bg-red-500 py-3 rounded-xl">
            cancel order
          </button>
        )}

        {order.trackingStage >= 3 && order.trackingStage < 5 && (
          <button className="bg-gray-600 py-3 rounded-xl">
            cannot cancel (in transit)
          </button>
        )}

        {order.trackingStage === 5 && (
          <>
            <button className="bg-yellow-500 py-3 rounded-xl font-semibold">
              return order
            </button>

            <button className="bg-[#1a1a1a] py-3 rounded-xl">
              replace order
            </button>
          </>
        )}

        {/* ADDRESS */}
        <div>
          <h2 className="text-lg font-semibold">shipping address</h2>
          <p className="text-sm text-gray-400 mt-2">
            {order.address}
          </p>
        </div>

      </div>
    </main>
  );
}