"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function TopSearchBar() {
  return (
    <div className="sticky top-0 z-50 bg-black px-4 py-3">
      <div className="flex items-center gap-3">

        {/* Search Bar */}
        <Link
          href="/search"
          className="flex-1 flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full"
        >
          <Search size={18} className="text-gray-400" />
          <span className="text-gray-400 text-sm">
            Search products, stores…
          </span>
        </Link>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-full"
        >
          <ShoppingCart size={20} className="text-white" />

          {/* Cart badge (optional, future‑ready) */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 rounded-full">
            2
          </span>
        </Link>

      </div>
    </div>
  );
}
