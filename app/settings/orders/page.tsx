"use client";

import { useRouter } from "next/navigation";
import { orders } from "../../../data/orders";
import { use } from "react";

export default function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
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

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center justify-center relative p-4">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-2xl"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">Orders</h1>
      </div>

      <div className="px-4 flex flex-col gap-8 pb-16">

        {/* PRODUCT CARD */}
        <div className="bg-[#3a3a3a] rounded-3xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-xs text-black">IMG</span>
            </div>

            <div>
              <p className="text-xl font-semibold">
                {order.items[0].name}
              </p>
              <p className="text-sm text-gray-200">
                {order.items[0].description}
              </p>
            </div>
          </div>

          <span className="text-2xl text-gray-300">{">"}</span>
        </div>

        {/* SEE DETAILS */}
        <p className="text-right text-sm text-gray-400">
          see product details
        </p>

        {/* TRACKING */}
        <div className="mt-2">
          <div className="flex items-center justify-between relative">

            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative">

                {/* LINE */}
                {index !== 0 && (
                  <div
                    className={`absolute top-[7px] left-[-50%] w-full h-[2px] ${
                      index <= order.trackingStage
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  />
                )}

                {/* DOT */}
                <div
                  className={`w-3 h-3 rounded-full z-10 ${
                    index <= order.trackingStage
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                />

                {/* LABEL */}
                <p className="text-[11px] mt-2 text-center capitalize text-gray-300">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* TRACK BUTTON */}
        <button className="bg-[#4a4a4a] py-3 rounded-xl text-white tracking-wide">
          TRACK ORDER
        </button>

        {/* PRODUCT DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-2">product details</h2>
          <p className="text-sm text-gray-400">
            {order.items[0].description}
          </p>
        </div>

        {/* PRICE */}
        <div className="flex justify-between items-center">
          <span className="text-lg">price</span>
          <span className="text-lg font-semibold">
            ₹{order.totalAmount}
          </span>
        </div>

        {/* SUPPORT */}
        <button className="bg-[#4a4a4a] py-3 rounded-xl">
          contact support
        </button>

        {/* ACTION BUTTONS */}
        {order.trackingStage < 3 && (
          <button className="bg-red-500 py-3 rounded-xl text-white font-semibold">
            cancel order
          </button>
        )}

        {order.trackingStage >= 3 && order.trackingStage < 5 && (
          <button className="bg-gray-600 py-3 rounded-xl text-white">
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
          <h2 className="text-xl font-semibold mb-2">shipping address</h2>
          <p className="text-sm text-gray-400">
            {order.address}
          </p>
        </div>

      </div>
    </main>
  );
}