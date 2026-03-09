"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

type Reel = {
  id: number;
  videoSrc: string;
  poster?: string;
  seller: {
    username: string;
    profileImage: string;
  };
  product: {
    id: string;
    name: string;
    price: string;
    link?: string;
  };
  caption?: string;
};

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const reels: Reel[] = [
    {
      id: 1,
      videoSrc: "/video1.mp4",
      poster: "/banner1.png",
      seller: { username: "artisan_shop", profileImage: "/default-profile.png" },
      product: { id: "p1", name: "Handmade Bag", price: "₹1,299" },
      caption: "Handmade leather bag — perfect for daily use.",
    },
    {
      id: 2,
      videoSrc: "/video2.mp4",
      poster: "/banner2.png",
      seller: { username: "cozyhome", profileImage: "/default-profile.png" },
      product: { id: "p2", name: "Ceramic Mug Set", price: "₹699" },
      caption: "Minimal ceramic mugs — microwave safe.",
    },
    {
      id: 3,
      videoSrc: "/video3.mp4",
      poster: "/banner3.png",
      seller: { username: "urbanwear", profileImage: "/default-profile.png" },
      product: { id: "p3", name: "Eco Tee", price: "₹799" },
      caption: "Soft organic cotton tee.",
    },
    {
      id: 4,
      videoSrc: "/video4.mp4",
      poster: "/banner4.png",
      seller: { username: "dailywear", profileImage: "/default-profile.png" },
      product: { id: "p4", name: "Street Jacket", price: "₹1,999" },
      caption: "Winter streetwear essential.",
    },
  ];

  // ▶️ Play only active reel
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        video.muted = !soundOn;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    return () => {
      videoRefs.current.forEach((v) => v?.pause());
    };
  }, [currentIndex, soundOn]);

  // 👆 Swipe
  const handlers = useSwipeable({
    onSwipedUp: () =>
      currentIndex < reels.length - 1 && setCurrentIndex((p) => p + 1),
    onSwipedDown: () =>
      currentIndex > 0 && setCurrentIndex((p) => p - 1),
    delta: 70,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  // ▶️ Tap video to play/pause
  const togglePlay = (idx: number) => {
    const video = videoRefs.current[idx];
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div {...handlers} className="absolute inset-0">

        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {reels.map((reel, idx) => (
            <div key={reel.id} className="w-full h-screen relative">

              {/* 🎥 VIDEO */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={reel.videoSrc}
                poster={reel.poster}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted={!soundOn}
                loop
                preload="metadata"
                onError={() => {
                  console.error("Video failed:", reel.videoSrc);
                }}
                onClick={() => togglePlay(idx)}
              />

              {/* LEFT INFO */}
              <div className="absolute left-5 bottom-24 max-w-[60%]">
                <p className="font-semibold">@{reel.seller.username}</p>
                <p className="text-sm text-gray-300 mt-1">{reel.caption}</p>

                <div className="mt-2 bg-black/40 backdrop-blur px-3 py-2 rounded-lg">
                  <p className="font-medium text-sm">{reel.product.name}</p>
                  <p className="text-sm text-gray-300">{reel.product.price}</p>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="absolute right-5 bottom-32 flex flex-col gap-6 items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-700">
                  <Image
                    src={reel.seller.profileImage}
                    width={48}
                    height={48}
                    alt="profile"
                  />
                </div>
                <button>❤️</button>
                <button>💬</button>
                <button>➦</button>
                <button onClick={() => setSoundOn((p) => !p)}>
                  {soundOn ? "🔊" : "🔇"}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
