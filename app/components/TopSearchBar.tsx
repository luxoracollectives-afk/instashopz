"use client";

import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function TopSearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);

    // later we will filter products here
  };

  return (
    <div className="sticky top-0 z-50 bg-black px-4 py-3">
      <div className="flex items-center gap-3">

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full"
        >
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search products, stores…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
          />
        </form>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-full"
        >
          <ShoppingCart size={20} className="text-white" />

          {/* Cart badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 rounded-full">
            2
          </span>
        </Link>

      </div>
    </div>
  );
}