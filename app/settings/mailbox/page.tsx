"use client";

import { useRouter } from "next/navigation";

export default function MailboxPage() {
  const router = useRouter();

  // ✅ FAKE MESSAGES
  const mails = [
    {
      id: 1,
      title: "Order Shipped 🚚",
      message: "Your order #ORD001 has been shipped.",
      date: "29 Apr 2026",
      unread: true,
    },
    {
      id: 2,
      title: "Payment Successful 💳",
      message: "Payment of ₹2499 completed successfully.",
      date: "28 Apr 2026",
      unread: false,
    },
    {
      id: 3,
      title: "Return Request Received 🔁",
      message: "Your return request is under review.",
      date: "27 Apr 2026",
      unread: true,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Mail Box</h1>
      </div>

      {/* MAIL LIST */}
      <div className="flex flex-col gap-3">

        {mails.map((mail) => (
          <div
            key={mail.id}
            onClick={() => router.push(`/settings/mailbox/${mail.id}`)}
            className={`p-4 rounded-xl cursor-pointer active:scale-[0.98] ${
              mail.unread ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"
            }`}
          >

            <div className="flex justify-between items-center">
              <p className="font-semibold">{mail.title}</p>

              {mail.unread && (
                <span className="text-xs bg-yellow-500 text-black px-2 rounded">
                  New
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-1">
              {mail.message}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {mail.date}
            </p>

          </div>
        ))}

      </div>

    </main>
  );
}