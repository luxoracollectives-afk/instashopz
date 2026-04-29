"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FAQPage() {
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How to cancel order?",
      answer: "Go to Orders → Select order → Click Cancel.",
    },
    {
      question: "How to return item?",
      answer: "Go to delivered orders → Click Return and select reason.",
    },
    {
      question: "Refund time?",
      answer: "Refunds are processed within 3–5 business days.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">FAQs</h1>
      </div>

      {/* FAQ LIST */}
      <div className="flex flex-col gap-3">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-xl p-4 cursor-pointer"
            onClick={() => toggle(index)}
          >

            {/* QUESTION */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">{faq.question}</p>
              <span className="text-gray-400">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {/* ANSWER */}
            {openIndex === index && (
              <p className="text-sm text-gray-400 mt-3">
                {faq.answer}
              </p>
            )}

          </div>
        ))}

      </div>

    </main>
  );
}