"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Fashion",
    image: "/collections/fashion.png",
    link: "/collection/fashion",
  },
  {
    title: "Electronics",
    image: "/collections/electronics.png",
    link: "/collection/electronics",
  },
  {
    title: "Home",
    image: "/collections/home.png",
    link: "/collection/home",
  },
  {
    title: "Beauty",
    image: "/collections/beauty.png",
    link: "/collection/beauty",
  },
  {
    title: "Deals",
    image: "/collections/deals.png",
    link: "/collection/deals",
  },
];

export default function CollectionRow() {
  return (
    <div className="mt-4">
      <div className="flex gap-3 overflow-x-scroll px-4 no-scrollbar">
        {collections.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className="min-w-[120px]"
          >
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="relative h-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm text-center py-2">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
