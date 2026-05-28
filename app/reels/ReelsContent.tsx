"use client";

import ReelShare from "./ReelShare";
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
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
  };
};

export default function ReelsContent() {
  const [showOptions, setShowOptions] = useState(false);
const [selectedOptionReel, setSelectedOptionReel] = useState<Reel | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

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
      product: {
        id: 101,
        name: "Handmade Vase",
        price: 999,
        image: "/product1.png",
        description: "Premium handmade ceramic vase",
      },
    },
    {
      id: 2,
      videoSrc: "/video2.mp4",
      poster: "/banner2.png",
      seller: { name: "cozyhome", profile: "/default-profile.png" },
      product: {
        id: 102,
        name: "Wooden Lamp",
        price: 699,
        image: "/product2.png",
        description: "Minimal wooden bedside lamp",
      },
    },
  ];

  useEffect(() => {
    if (startId) {
      const index = reels.findIndex((r) => r.id === Number(startId));
      if (index !== -1) setCurrentIndex(index);
    }
  }, [startId]);

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

  const handleDoubleTap = (reel: Reel) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      setShowHeart(reel.id);
      setTimeout(() => setShowHeart(null), 600);
      toggleLike(reel);
    }

    lastTap.current = now;
  };

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

  // ✅ STEP 2: ADD TO CART LOGIC
  const handleAddToCart = (reel: Reel) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(cart)) cart = [];

    const exists = cart.find(
      (item: any) => item.id === reel.product.id
    );

    if (exists) {
      setPopupText("Already in cart");
    } else {
      cart.push({
  id: reel.product.id,
  name: reel.product.name,
  price: reel.product.price,
  image: reel.product.image,
  qty: 1,
});
      localStorage.setItem("cart", JSON.stringify(cart));
      setPopupText("Added to cart");
    }

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

              {showHeart === reel.id && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <Heart className="w-28 h-28 animate-pulse" fill="white" />
                </div>
              )}

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

                <button onClick={() => toggleLike(reel)} className="flex flex-col items-center">
                  <Heart size={28} className={likedMap[reel.id] ? "fill-red-500 text-red-500" : "text-white"} />
                  {likeCountMap[reel.id] > 0 && <span className="text-xs">{likeCountMap[reel.id]}</span>}
                </button>

                <button onClick={() => setShowComments(true)}>
                  <MessageCircle size={28} />
                </button>

                <button onClick={() => toggleSavePost(reel)} className="flex flex-col items-center">
                  <Bookmark size={28} className={savedMap[reel.id] ? "fill-white text-white" : "text-white"} />
                  {savedCountMap[reel.id] > 0 && <span className="text-xs">{savedCountMap[reel.id]}</span>}
                </button>

                <button
                  onClick={() => {
                    setSelectedReel(reel);
                    setShowShare(true);
                  }}
                >
                  <Send size={28} />
                </button>

               <button
  onClick={() => {
    setSelectedOptionReel(reel);
    setShowOptions(true);
  }}
>
  <MoreVertical size={28} />
</button>
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

                  <button
                    onClick={() => handleAddToCart(reel)}
                    className="bg-yellow-400 px-4 py-2 rounded-xl"
                  >
                    add to cart
                  </button>

                  <div className="text-center">
                    <p>{reel.product.name}</p>
                    <p>₹{reel.product.price}</p>
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

      {showShare && (
        <ReelShare
          reel={selectedReel!}
          onClose={() => setShowShare(false)}
        />
      )}
    {showOptions && selectedOptionReel && (
  <div className="absolute inset-0 bg-black/60 flex items-end z-50">
    <div className="w-full bg-black text-white rounded-t-2xl p-5 space-y-4">

      <button
        onClick={() => {
          const url = `${window.location.origin}/reels?start=${selectedOptionReel.id}`;
          navigator.clipboard.writeText(url);
          setPopupText("Link copied");
          setShowSavedPopup(true);
          setShowOptions(false);
        }}
        className="w-full text-left"
      >
        Copy Link
      </button>

      <button
        onClick={() => {
          setPopupText("Not interested");
          setShowSavedPopup(true);
          setShowOptions(false);
        }}
        className="w-full text-left"
      >
        Not Interested
      </button>

      <button
        onClick={() => {
          setPopupText("Reported");
          setShowSavedPopup(true);
          setShowOptions(false);
        }}
        className="w-full text-left text-red-500"
      >
        Report
      </button>

      <button
        onClick={() => setShowOptions(false)}
        className="w-full text-center text-gray-400"
      >
        Cancel
      </button>

    </div>
  </div>
)}
    </main>
  );
}