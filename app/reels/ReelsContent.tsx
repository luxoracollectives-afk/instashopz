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

import ReelComments from "./ReelsComments";

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
  const [likeCountMap, setLikeCountMap] = useState<{ [key: number]: number }>({});

  const [savedMap, setSavedMap] = useState<{ [key: number]: boolean }>({});
  const [savedCountMap, setSavedCountMap] = useState<{ [key: number]: number }>({});

  const [showHeart, setShowHeart] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  const [popupText, setPopupText] = useState("");
  const [showSavedPopup, setShowSavedPopup] = useState(false);

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

  // ✅ START POSITION
  useEffect(() => {
    if (startId) {
      const index = reels.findIndex((r) => r.id === Number(startId));
      if (index !== -1) setCurrentIndex(index);
    }
  }, [startId]);

  // ✅ LOAD LIKES + COUNT
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedPosts") || "[]");

    const map: any = {};
    const countMap: any = {};

    stored.forEach((item: Reel) => {
      map[item.id] = true;
      countMap[item.id] = (countMap[item.id] || 0) + 1;
    });

    setLikedMap(map);
    setLikeCountMap(countMap);
  }, []);

  // ✅ LOAD SAVED + COUNT
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts") || "[]");

    const map: any = {};
    const countMap: any = {};

    stored.forEach((item: Reel) => {
      map[item.id] = true;
      countMap[item.id] = (countMap[item.id] || 0) + 1;
    });

    setSavedMap(map);
    setSavedCountMap(countMap);
  }, []);

  // ✅ VIDEO CONTROL
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) video.play().catch(() => {});
      else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  // ✅ DOUBLE TAP LIKE
  const handleDoubleTap = (reel: Reel) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      setShowHeart(reel.id);
      setTimeout(() => setShowHeart(null), 600);

      toggleLike(reel);
    }

    lastTap.current = now;
  };

  // ✅ LIKE / UNLIKE + COUNT (FINAL FIX)
  const toggleLike = (reel: Reel) => {
    let existing = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (!Array.isArray(existing)) existing = [];

    const isLiked = likedMap[reel.id];

    let updated;

    if (isLiked) {
      updated = existing.filter((item: Reel) => item.id !== reel.id);

      setLikeCountMap((prev) => ({
        ...prev,
        [reel.id]: Math.max((prev[reel.id] || 1) - 1, 0),
      }));
    } else {
      updated = [...existing, reel];

      setLikeCountMap((prev) => ({
        ...prev,
        [reel.id]: (prev[reel.id] || 0) + 1,
      }));
    }

    localStorage.setItem("likedPosts", JSON.stringify(updated));

    setLikedMap((prev) => ({
      ...prev,
      [reel.id]: !isLiked,
    }));
  };

  // ✅ SAVE / UNSAVE
  const toggleSavePost = (reel: Reel) => {
    let existing = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    if (!Array.isArray(existing)) existing = [];

    const isSaved = savedMap[reel.id];

    let updated;

    if (isSaved) {
      updated = existing.filter((item: Reel) => item.id !== reel.id);
      setPopupText("Post unsaved");

      setSavedCountMap((prev) => ({
        ...prev,
        [reel.id]: Math.max((prev[reel.id] || 1) - 1, 0),
      }));
    } else {
      updated = [
        ...existing,
        { ...reel, date: new Date().toISOString() },
      ];
      setPopupText("Post saved");

      setSavedCountMap((prev) => ({
        ...prev,
        [reel.id]: (prev[reel.id] || 0) + 1,
      }));
    }

    localStorage.setItem("savedPosts", JSON.stringify(updated));

    setSavedMap((prev) => ({
      ...prev,
      [reel.id]: !isSaved,
    }));

    setShowSavedPopup(true);
    setTimeout(() => setShowSavedPopup(false), 2000);
  };

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

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50"
      >
        <ArrowLeft size={28} />
      </button>

      <div {...handlers} className="absolute inset-0">
        <div
          className="transition-transform duration-300"
          style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
        >
          {reels.map((reel, idx) => (
            <div key={reel.id} className="h-screen w-full relative">

              {/* ❤️ HEART */}
              {showHeart === reel.id && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <Heart className="w-28 h-28 animate-pulse" fill="white" />
                </div>
              )}

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
                onClick={() => handleDoubleTap(reel)}
              />

              {/* ACTIONS */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">

                {/* ❤️ LIKE + COUNT */}
                <button
                  onClick={() => toggleLike(reel)}
                  className="flex flex-col items-center"
                >
                  <Heart
                    size={28}
                    className={
                      likedMap[reel.id]
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }
                  />
                  {likeCountMap[reel.id] > 0 && (
                    <span className="text-xs">
                      {likeCountMap[reel.id]}
                    </span>
                  )}
                </button>

                <button onClick={() => setShowComments(true)}>
                  <MessageCircle size={28} />
                </button>

                {/* SAVE */}
                <button
                  onClick={() => toggleSavePost(reel)}
                  className="flex flex-col items-center"
                >
                  <Bookmark
                    size={28}
                    className={
                      savedMap[reel.id]
                        ? "fill-white text-white"
                        : "text-white"
                    }
                  />
                  {savedCountMap[reel.id] > 0 && (
                    <span className="text-xs">
                      {savedCountMap[reel.id]}
                    </span>
                  )}
                </button>

                <Send size={28} />
                <MoreVertical size={28} />
              </div>

              {/* PROFILE */}
              <div className="absolute bottom-32 left-4 flex gap-3 z-20">
                <Image
                  src={reel.seller.profile || "/default-profile.png"}
                  width={40}
                  height={40}
                  alt="profile"
                  className="rounded-full"
                />
                <p>{reel.seller.name}</p>
              </div>

              {/* PRODUCT */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-20">
                <div className="bg-gray-700/80 rounded-2xl px-4 py-3 flex justify-between">
                  <button className="bg-yellow-400 px-4 py-2 rounded-xl">
                    add to cart
                  </button>

                  <div className="text-center">
                    <p>{reel.product.name}</p>
                    <p>{reel.product.price}</p>
                  </div>

                  <button className="bg-yellow-400 px-4 py-2 rounded-xl">
                    buy now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {showComments && (
        <ReelComments onClose={() => setShowComments(false)} />
      )}

      {showSavedPopup && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black px-4 py-2 rounded-full text-sm">
            {popupText}
          </div>
        </div>
      )}

    </main>
  );
}