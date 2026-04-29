"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function DealsPage() {
  const router = useRouter();

  const [copiedId, setCopiedId] = useState<number | null>(null);

  // ✅ MOCK DEALS
  const deals = [
    {
      id: 1,
      title: "50% OFF on Shoes 👟",
      desc: "Grab top brands at half price",
      price: 1999,
      oldPrice: 3999,
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free 👕",
      desc: "T-shirts combo offer",
      price: 999,
      oldPrice: 1999,
    },
    {
      id: 3,
      title: "Electronics Sale 🔥",
      desc: "Up to 40% off on gadgets",
      price: 14999,
      oldPrice: 24999,
    },
  ];

  // ✅ FIXED COPY FUNCTION (NO ERROR NOW)
  const handleCopy = (id: number) => {
    const text = `DEAL${id}`;

    // Modern method (works on HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback (works on HTTP / localhost / IP)
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Copy failed", err);
      }

      document.body.removeChild(textarea);
    }

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-xl font-semibold">Deals</h1>
      </div>

      {/* DEAL LIST */}
      <div className="flex flex-col gap-4">

        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-[#1a1a1a] p-4 rounded-xl"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-center">

              <p className="font-semibold">{deal.title}</p>

              {/* COPY BUTTON */}
              <button
                onClick={() => handleCopy(deal.id)}
                className="text-gray-400 hover:text-white"
              >
                <Copy size={18} />
              </button>

            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-400 mt-1">
              {deal.desc}
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-2">
              <p className="text-lg font-semibold text-yellow-400">
                ₹{deal.price}
              </p>

              <p className="text-sm line-through text-gray-500">
                ₹{deal.oldPrice}
              </p>
            </div>

            {/* SUCCESS MESSAGE */}
            {copiedId === deal.id && (
              <p className="text-green-400 text-xs mt-2">
                Code copied ✅
              </p>
            )}

          </div>
        ))}

      </div>

    </main>
  );
}