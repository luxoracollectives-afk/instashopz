"use client";

import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

type Reel = {
  id: number;
  videoSrc: string;
  poster?: string;
  seller: {
    name: string;
    profile: string;
  };
  product: {
    name: string;
    price: string;
  };
};

export default function ReelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startId = searchParams.get("start");

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const lastTap = useRef(0);
  const [likedMap, setLikedMap] = useState<{ [key: number]: boolean }>({});

  const reels: Reel[] = [
    {
      id: 1,
      videoSrc: "/video1.mp4",
      poster: "/banner1.png",
      seller: { name: "artisan_shop", profile: "/default-profile.png" },
      product: { name: "Item Name", price: "₹999" },
    },
    {
      id: 2,
      videoSrc: "/video2.mp4",
      poster: "/banner2.png",
      seller: { name: "cozyhome", profile: "/default-profile.png" },
      product: { name: "Item Name", price: "₹699" },
    },
  ];

  // Jump to reel
  useEffect(() => {
    if (startId) {
      const index = reels.findIndex((r) => r.id === Number(startId));
      if (index !== -1) setCurrentIndex(index);
    }
  }, [startId]);

  // Load likes
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedMap") || "{}");
    setLikedMap(stored);
  }, []);

  // Play active video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  // Save liked post
  const saveLikedPost = (reel: Reel) => {
    let existing = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (!Array.isArray(existing)) existing = [];

    if (!existing.find((item: Reel) => item.id === reel.id)) {
      localStorage.setItem(
        "likedPosts",
        JSON.stringify([...existing, reel])
      );
    }
  };

  // Double tap like
  const handleDoubleTap = (reel: Reel) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      setLikedMap((prev) => {
        const updated = { ...prev, [reel.id]: true };
        localStorage.setItem("likedMap", JSON.stringify(updated));
        return updated;
      });

      saveLikedPost(reel);
    }

    lastTap.current = now;
  };

  // Toggle like
  const toggleLike = (reel: Reel) => {
    setLikedMap((prev) => {
      const isLiked = !prev[reel.id];

      const updated = { ...prev, [reel.id]: isLiked };
      localStorage.setItem("likedMap", JSON.stringify(updated));

      if (isLiked) saveLikedPost(reel);

      return updated;
    });
  };

  // Swipe controls
  const handlers = useSwipeable({
    onSwipedUp: () =>
      currentIndex < reels.length - 1 &&
      setCurrentIndex((p) => p + 1),
    onSwipedDown: () =>
      currentIndex > 0 &&
      setCurrentIndex((p) => p - 1),
    delta: 70,
    trackTouch: true,
  });

  return (
    <main className="relative h-screen bg-black text-white overflow-hidden">
      
      {/* ✅ CLEAN BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50 text-white"
      >
        <ArrowLeft size={28} />
      </button>

      <div {...handlers} className="absolute inset-0">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {reels.map((reel, idx) => (
            <div key={reel.id} className="h-screen w-full relative">
              
              {/* VIDEO */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={reel.videoSrc}
                poster={reel.poster}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                loop
                muted
                onTouchStart={() => handleDoubleTap(reel)}
              />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* ACTIONS */}
              <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
                <button onClick={() => toggleLike(reel)}>
                  <Heart
                    size={28}
                    className={
                      likedMap[reel.id]
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }
                  />
                </button>

                <MessageCircle size={28} />
                <Bookmark size={28} />
                <Send size={28} />
                <MoreVertical size={28} />
              </div>

              {/* PROFILE */}
              <div className="absolute bottom-32 left-4 flex items-center gap-3">
                <Image
                  src={reel.seller.profile}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full"
                />

                <p className="text-sm font-semibold">
                  {reel.seller.name}
                </p>

                <button className="bg-cyan-600 px-4 py-1 rounded-full text-sm">
                  follow
                </button>
              </div>

              {/* PRODUCT BAR */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md">
                <div className="bg-gray-700/80 backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center justify-between">
                  
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold">
                    add to cart
                  </button>

                  <div className="text-center">
                    <p className="text-sm">{reel.product.name}</p>
                    <p className="font-semibold">{reel.product.price}</p>
                  </div>

                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold">
                    buy now
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}