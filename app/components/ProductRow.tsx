"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  link: string;
};

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Handmade Jacket",
    price: "₹2,499",
    image: "/products/product1.png",
    link: "/product/1",
  },
  {
    id: 2,
    title: "Minimal Sneakers",
    price: "₹1,999",
    image: "/products/product2.png",
    link: "/product/2",
  },
  {
    id: 3,
    title: "Wooden Lamp",
    price: "₹1,299",
    image: "/products/product3.png",
    link: "/product/3",
  },
  {
    id: 4,
    title: "Casual Shirt",
    price: "₹1,099",
    image: "/products/product4.png",
    link: "/product/4",
  },
];

export default function ProductRow({ title }: { title: string }) {
  return (
    <div className="mt-8">

      {/* 🔹 SECTION HEADER (SAME STYLE AS TRENDING REELS) */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Arrow → section page */}
        <Link
          href={
            title === "Trending Products"
              ? "/products/trending"
              : "/products/new-arrivals"
          }
          className="text-gray-400 hover:text-white transition"
        >
          <ChevronRight size={22} />
        </Link>
      </div>

      {/* 🔹 PRODUCTS ROW (UNCHANGED) */}
      <div className="flex gap-4 overflow-x-scroll px-4 no-scrollbar">
        {sampleProducts.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            className="min-w-[150px]"
          >
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="relative h-44">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-2">
                <p className="text-sm truncate">{product.title}</p>
                <p className="text-sm font-semibold mt-1">
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
