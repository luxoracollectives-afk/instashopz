"use client";

import { useRouter } from "next/navigation";

export default function PersonalDetailsPage() {
  const router = useRouter();

  const items = [
    "Name",
    "Username",
    "Email",
    "Phone number",
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Personal Details</h1>
      </div>

      {/* LIST */}
      <div className="mt-6 px-4 flex flex-col gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center cursor-pointer hover:opacity-70 transition"
          >
            <p className="text-lg">{item}</p>
            <span className="text-2xl">{">"}</span>
          </div>
        ))}
      </div>
    </main>
  );
}