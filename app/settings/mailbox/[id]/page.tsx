"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

export default function MailDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  // ✅ MOCK DATA (same as mailbox)
  const mails = [
    {
      id: "1",
      title: "Order Shipped 🚚",
      message: "Your order has been shipped and is on the way.",
      fullMessage:
        "Your order #ORD001 has been shipped via BlueDart. It will reach you within 2-3 days.",
      orderId: "ORD001",
      sender: "instashopzzz",
      date: "29 Apr 2026",
    },
    {
      id: "2",
      title: "Payment Successful 💳",
      message: "Payment completed successfully.",
      fullMessage:
        "Your payment of ₹2499 for order #ORD002 has been successfully processed.",
      orderId: "ORD002",
      sender: "instashopzzz",
      date: "28 Apr 2026",
    },
    {
      id: "3",
      title: "Return Request Received 🔁",
      message: "Your return request is under review.",
      fullMessage:
        "We have received your return request for order #ORD003. Our team will review and update you soon.",
      orderId: "ORD003",
      sender: "instashopzzz",
      date: "27 Apr 2026",
    },
  ];

  const mail = mails.find((m) => m.id === id);

  if (!mail) {
    return <p className="text-white p-4">Message not found</p>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Message</h1>
      </div>

      {/* CARD */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl">

        <p className="text-lg font-semibold">{mail.title}</p>

        <p className="text-sm text-gray-400 mt-1">
          From: {mail.sender}
        </p>

        <p className="text-sm text-gray-500">
          Date: {mail.date}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Order ID: {mail.orderId}
        </p>

        <div className="mt-4 text-sm leading-relaxed">
          {mail.fullMessage}
        </div>

      </div>

    </main>
  );
}