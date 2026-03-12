"use client";

import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
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

        {/* Search */}
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

          {/* Search Results */}
          {query && (
            <div className="absolute top-12 left-0 right-0 bg-[#111] rounded-lg p-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 text-sm text-white hover:bg-[#222] rounded"
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-full"
        >
          <ShoppingCart size={20} className="text-white" />
        </Link>

      </div>
    </div>
  );
}