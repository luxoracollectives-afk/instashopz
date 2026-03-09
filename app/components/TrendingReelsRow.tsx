"use client";

import Link from "next/link";
import { ChevronRight, VolumeX } from "lucide-react";

const reels = [
  { id: 1, video: "/video1.mp4", link: "/reels/1" },
  { id: 2, video: "/video2.mp4", link: "/reels/2" },
  { id: 3, video: "/video3.mp4", link: "/reels/3" },
];


export default function TrendingReelsRow() {
  return (
    <div className="mt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Trending Reels</h2>

        {/* Arrow → Full reels page */}
        <Link href="/reels" className="text-gray-400">
          <ChevronRight size={22} />
        </Link>
      </div>

      {/* 3 Reel Preview Grid */}
      <div className="grid grid-cols-3 gap-3">
        {reels.map((reel) => (
          <Link
            key={reel.id}
            href={reel.link}
            className="relative"
          >
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black">
              <video
  src={reel.video}
  muted
  loop
  autoPlay
  playsInline
  preload="metadata"
  className="w-full h-full object-cover"
/>

              {/* Muted icon */}
              <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full">
                <VolumeX size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>  
    </div>
  );
}
