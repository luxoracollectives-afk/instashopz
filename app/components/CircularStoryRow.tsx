"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const stories = [
  { name: "Urban Wear", image: "/stories/store1.png", link: "/store/urban-wear" },
  { name: "Home Decor", image: "/stories/store2.png", link: "/store/home-decor" },
  { name: "Beauty Hub", image: "/stories/store3.png", link: "/store/beauty-hub" },
  { name: "Tech Zone", image: "/stories/store4.png", link: "/store/tech-zone" },
  { name: "Fashion", image: "/stories/store5.png", link: "/store/fashion" },
];

export default function CircularStoryRow() {
  return (
    <div className="px-4">
      <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
        {/* STORY CIRCLES */}
        {stories.map((story) => (
          <Link
            key={story.name}
            href={story.link}
            className="flex flex-col items-center min-w-[64px]"
          >
            <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-orange-500">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-[11px] mt-2 text-center text-gray-400 truncate w-16">
              {story.name}
            </p>
          </Link>
        ))}

        {/* ARROW (INLINE, RIGHT SIDE) */}
        <Link
          href="/stories"
          className="min-w-[40px] h-14 flex items-center justify-center text-gray-400"
        >
          <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  );
}
