"use client";

import { useRouter } from "next/navigation";
import { orders } from "./../../data/orders";

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return <p className="text-white p-4">Order not found</p>;
  }

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

      <div className="px-4 flex flex-col gap-6 pb-10">

        {/* ORDER INFO */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <p className="text-sm text-gray-400">Order ID</p>
          <p className="font-semibold">{order.id}</p>

          <p className={`mt-2 text-sm ${getStatusColor(order.status)}`}>
            {order.status}
          </p>

          <p className="text-sm text-gray-400 mt-1">{order.date}</p>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-4">Order Status</h2>

          <div className="flex flex-col gap-4">

            <TimelineStep title="Order Placed" active />

            <Line />

            <TimelineStep
              title="Shipped"
              active={order.status !== "Processing"}
            />

            <Line />

            <TimelineStep
              title="Out for Delivery"
              active={order.status === "Shipped" || order.status === "Delivered"}
              current={order.status === "Shipped"}
            />

            <Line />

            <TimelineStep
              title="Delivered"
              active={order.status === "Delivered"}
            />

          </div>
        </div>

        {/* ITEMS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Items</h2>

          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] p-3 rounded-xl flex gap-3"
              >
                <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">IMG</span>
                </div>

                <div className="flex flex-col flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>
                  <p className="mt-1 font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDRESS */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p className="text-sm text-gray-400">{order.address}</p>
        </div>

        {/* PRICE */}
        <div className="bg-[#1a1a1a] p-4 rounded-2xl">
          <h2 className="font-semibold mb-3">Price Details</h2>

          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">

          {/* PROCESSING */}
          {order.status === "Processing" && (
            <button className="bg-red-600 py-3 rounded-xl font-semibold">
              Cancel Order
            </button>
          )}

          {/* SHIPPED */}
          {order.status === "Shipped" && (
            <button className="bg-gray-600 py-3 rounded-xl">
              Cancel Unavailable (In Transit)
            </button>
          )}

          {/* DELIVERED */}
          {order.status === "Delivered" && (
            <>
              <button className="bg-yellow-500 py-3 rounded-xl font-semibold">
                Return Order
              </button>

              <button className="bg-[#1a1a1a] py-3 rounded-xl">
                Replace Order
              </button>
            </>
          )}

        </div>

      </div>
    </main>
  );
}

function TimelineStep({
  title,
  active,
  current,
}: {
  title: string;
  active?: boolean;
  current?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-3 h-3 rounded-full mt-1 ${
          active
            ? current
              ? "bg-yellow-400"
              : "bg-green-500"
            : "bg-gray-500"
        }`}
      />
      <p className={`${!active && "text-gray-500"}`}>{title}</p>
    </div>
  );
}

function Line() {
  return <div className="ml-1.5 h-5 border-l border-gray-600" />;
}