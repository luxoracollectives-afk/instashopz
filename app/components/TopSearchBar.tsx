"use client";

import { useState } from "react";
import { Search, ShoppingCart, PackageSearch } from "lucide-react";
import Link from "next/link";
import { products } from "../data/products";

export default function TopSearchBar() {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="sticky top-0 z-50 bg-black px-4 py-3">

      <div className="flex items-center gap-3">

        {/* 🔍 SEARCH */}
        <div className="flex-1 relative">

          <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full"
            />
          </div>

          {/* 🔽 SEARCH RESULTS */}
          {query && (
            <div className="absolute top-12 left-0 right-0 bg-[#111] rounded-lg p-2 shadow-lg">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 text-sm text-white hover:bg-[#222] rounded cursor-pointer"
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-400">
                  No results found
                </div>
              )}
            </div>
          )}

        </div>

        {/* 📦 ORDERS BUTTON */}
        <Link
          href="/orders"
          className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-full hover:bg-[#222] transition"
        >
          <PackageSearch size={20} className="text-white" />
        </Link>

        {/* 🛒 CART BUTTON */}
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-full hover:bg-[#222] transition"
        >
          <ShoppingCart size={20} className="text-white" />
        </Link>

      </div>

    </div>
  );
}
