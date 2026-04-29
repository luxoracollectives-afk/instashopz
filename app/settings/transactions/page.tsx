"use client";

import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();

  // ✅ MOCK DATA (MORE REALISTIC)
  const transactions = [
    {
      id: "TXN12345",
      orderId: "ORD001",
      amount: 2499,
      status: "SUCCESS",
      method: "UPI",
      date: "28 Apr 2026",
      desc: "Nike Shoes Purchase",
    },
    {
      id: "TXN12346",
      orderId: "ORD002",
      amount: 70998,
      status: "SUCCESS",
      method: "Credit Card",
      date: "27 Apr 2026",
      desc: "iPhone 14 Purchase",
    },
    {
      id: "TXN12347",
      orderId: "ORD003",
      amount: 1499,
      status: "FAILED",
      method: "UPI",
      date: "26 Apr 2026",
      desc: "Payment Failed",
    },
    {
      id: "TXN12348",
      orderId: "ORD004",
      amount: 3999,
      status: "PENDING",
      method: "COD",
      date: "25 Apr 2026",
      desc: "Order Placed (Cash on Delivery)",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">My Transactions</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4">

        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-[#1a1a1a] p-4 rounded-xl"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">₹{txn.amount}</p>

              <p
                className={`text-sm font-semibold ${
                  txn.status === "SUCCESS"
                    ? "text-green-400"
                    : txn.status === "FAILED"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {txn.status}
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm mt-1">{txn.desc}</p>

            {/* DETAILS */}
            <div className="text-xs text-gray-400 mt-2 flex flex-col gap-1">
              <p>Transaction ID: {txn.id}</p>
              <p>Order ID: {txn.orderId}</p>
              <p>Payment Method: {txn.method}</p>
              <p>Date: {txn.date}</p>
            </div>

          </div>
        ))}

      </div>

    </main>
  );
}