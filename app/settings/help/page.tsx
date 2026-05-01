"use client";

import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();

  const options = [
    { title: "FAQ", desc: "Common questions and answers" },
    { title: "Contact Support", desc: "Reach out for help" },
    { title: "Terms & Privacy", desc: "Read policies" },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Help</h1>
      </div>

      {/* OPTIONS */}
      <div className="flex flex-col gap-3">

        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => {
              if (opt.title === "FAQ") {
                router.push("/settings/help/faq");
              } else if (opt.title === "Contact Support") {
                router.push("/settings/help/contact");
              } else {
                router.push("/settings/help/terms");
              }
            }}
            className="bg-[#1a1a1a] p-4 rounded-xl cursor-pointer active:scale-[0.98]"
          >
            <p className="font-semibold">{opt.title}</p>
            <p className="text-sm text-gray-400 mt-1">
              {opt.desc}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}