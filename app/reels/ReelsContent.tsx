"use client";

import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

type Reply = {
  id: number;
  user: string;
  text: string;
  liked: boolean;
  likes: number;
  createdAt: number;
};

type Comment = {
  id: number;
  user: string;
  text: string;
  liked: boolean;
  likes: number;
  replies: Reply[];
  createdAt: number;
};

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
  const [showHeart, setShowHeart] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const now = Date.now();

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "user1",
      text: "Nice product 🔥",
      liked: false,
      likes: 0,
      replies: [],
      createdAt: now - 1000 * 60 * 5,
    },
    {
      id: 2,
      user: "user2",
      text: "Where can I buy this?",
      liked: false,
      likes: 0,
      replies: [],
      createdAt: now - 1000 * 60 * 60 * 2,
    },
  ]);

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

  // ⏱️ TIME FUNCTION
  const getTimeAgo = (time: number) => {
    const diff = Math.floor((Date.now() - time) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo`;
    return `${Math.floor(diff / 31536000)}y`;
  };

  useEffect(() => {
    if (startId) {
      const index = reels.findIndex((r) => r.id === Number(startId));
      if (index !== -1) setCurrentIndex(index);
    }
  }, [startId]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedMap") || "{}");
    setLikedMap(stored);
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
      setLikedMap((prev) => ({ ...prev, [reel.id]: true }));
    }
    lastTap.current = now;
  };

  const toggleLike = (reel: Reel) => {
    setLikedMap((prev) => ({
      ...prev,
      [reel.id]: !prev[reel.id],
    }));
  };

  const toggleCommentLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const toggleReplyLike = (cid: number, rid: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === rid
                  ? {
                      ...r,
                      liked: !r.liked,
                      likes: r.liked ? r.likes - 1 : r.likes + 1,
                    }
                  : r
              ),
            }
          : c
      )
    );
  };

  const handlePost = () => {
    if (!input.trim()) return;

    if (replyTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: Date.now(),
                    user: "you",
                    text: input,
                    liked: false,
                    likes: 0,
                    createdAt: Date.now(),
                  },
                ],
              }
            : c
        )
      );
    } else {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          user: "you",
          text: input,
          liked: false,
          likes: 0,
          replies: [],
          createdAt: Date.now(),
        },
      ]);
    }

    setInput("");
    setReplyTo(null);
  };

  const handlers = useSwipeable({
    onSwipedUp: () =>
      currentIndex < reels.length - 1 &&
      setCurrentIndex((p) => p + 1),
    onSwipedDown: () =>
      currentIndex > 0 &&
      setCurrentIndex((p) => p - 1),
  });

  return (
    <main className="relative h-screen bg-black text-white">

      <button onClick={() => router.back()} className="absolute top-4 left-4 z-50">
        <ArrowLeft />
      </button>

      <div {...handlers} className="absolute inset-0">
        {reels.map((reel, idx) => (
          <div key={reel.id} className="h-screen relative">

            {showHeart === reel.id && (
              <div className="absolute inset-0 flex justify-center items-center">
                <Heart className="w-24 h-24 text-white animate-pulse" fill="white"/>
              </div>
            )}

            <video
              ref={(el) => {
  videoRefs.current[idx] = el;
}}
              src={reel.videoSrc}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onClick={() => handleDoubleTap(reel)}
            />

            <div className="absolute right-4 bottom-32 flex flex-col gap-4">
              <button onClick={() => toggleLike(reel)}>
                <Heart className={likedMap[reel.id] ? "text-red-500 fill-red-500" : ""}/>
              </button>

              <button onClick={() => setShowComments(true)}>
                <MessageCircle />
              </button>
            </div>

          </div>
        ))}
      </div>

      {showComments && (
        <div className="absolute inset-0 bg-black/40 flex justify-end flex-col">
          <div className="bg-white text-black p-4 rounded-t-2xl h-[60%] flex flex-col">

            <div className="flex justify-between mb-2">
              <p>Comments</p>
              <button onClick={() => setShowComments(false)}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {comments.map((c) => (
                <div key={c.id}>
                  
                  <div className="flex gap-2 text-sm">
                    <b>{c.user}</b>
                    <span className="text-gray-400">{getTimeAgo(c.createdAt)}</span>
                  </div>

                  <p>{c.text}</p>

                  <div className="flex gap-3 text-xs mt-1">
                    <button onClick={() => toggleCommentLike(c.id)}>
                      ❤️ {c.likes}
                    </button>
                    <button onClick={() => setReplyTo(c.id)}>Reply</button>
                  </div>

                  {c.replies.map((r) => (
                    <div key={r.id} className="ml-4 mt-2">

                      <div className="flex gap-2 text-xs">
                        <b>{r.user}</b>
                        <span className="text-gray-400">{getTimeAgo(r.createdAt)}</span>
                      </div>

                      <p className="text-xs">{r.text}</p>

                      <div className="flex gap-2 text-xs">
                        <button onClick={() => toggleReplyLike(c.id, r.id)}>
                          ❤️ {r.likes}
                        </button>
                        <button onClick={() => setReplyTo(c.id)}>Reply</button>
                      </div>

                    </div>
                  ))}

                </div>
              ))}
            </div>

            <div className="mt-2">
              {replyTo && <p className="text-xs">Replying...</p>}
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border px-2"
                />
                <button onClick={handlePost}>Post</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}