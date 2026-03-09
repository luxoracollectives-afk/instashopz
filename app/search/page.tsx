"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const explore = [...Array(30)].map((_, i) => ({
    id: i,
    large: i % 7 === 0,
  }));

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      
      {/* SEARCH BAR */}
      <div className="p-4">
        <div className="flex items-center bg-[#1a1a1a] rounded-xl px-4 py-2 border border-gray-800">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="gray"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            type="text"
            placeholder="Search products, stores, reels"
            className="bg-transparent outline-none text-gray-300 ml-3 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-1 px-1">
        {explore.map((item) => (
          <div
            key={item.id}
            className={`bg-gray-900 ${
              item.large
                ? "col-span-2 row-span-2 aspect-square"
                : "aspect-square"
            }`}
          />
        ))}
      </div>

    </main>
  );
}
