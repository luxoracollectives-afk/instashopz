"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

type StoryItem = {
  type: "image" | "video";
  src: string;
};

type CreatorStories = {
  username: string;
  stories: StoryItem[];
};

const creators: CreatorStories[] = [
  {
    username: "Urban Wear",
    stories: [
      { type: "image", src: "/stories/store1.png" },
      { type: "video", src: "/reels/reel1.mp4" },
    ],
  },
  {
    username: "Home Decor",
    stories: [
      { type: "image", src: "/stories/store2.png" },
      { type: "image", src: "/stories/store3.png" },
    ],
  },
];

export default function StoriesPage() {
  const router = useRouter();

  const [creatorIndex, setCreatorIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [message, setMessage] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentCreator = creators[creatorIndex];
  const currentStory = currentCreator.stories[storyIndex];

  /* IMAGE AUTO PLAY */
  useEffect(() => {
    if (currentStory.type !== "image" || paused) return;

    setProgress(0);

    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStory();
          return 0;
        }
        return p + 1;
      });
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [creatorIndex, storyIndex, paused]);

  /* VIDEO PROGRESS */
  const onVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  const onVideoEnd = () => nextStory();

  /* NAVIGATION */
  const nextStory = () => {
    if (storyIndex < currentCreator.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else if (creatorIndex < creators.length - 1) {
      setCreatorIndex(creatorIndex + 1);
      setStoryIndex(0);
    } else {
      router.back();
    }
  };

  const prevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else if (creatorIndex > 0) {
      const prev = creators[creatorIndex - 1];
      setCreatorIndex(creatorIndex - 1);
      setStoryIndex(prev.stories.length - 1);
    }
  };

  /* TOUCH */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
    if (videoRef.current) videoRef.current.pause();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    setPaused(false);
    if (videoRef.current) videoRef.current.play();

    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextStory();
    if (diff < -50) prevStory();
  };

  /* ACTIONS */
  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Message to seller:", currentCreator.username, message);
    setMessage("");
  };

  const shareStory = () => {
    console.log("Share story of:", currentCreator.username);
    alert("Open user list to share (hook backend later)");
  };

  return (
    <div
      className="fixed inset-0 bg-black text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={nextStory}
    >
      {/* CLOSE */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-4 z-20"
      >
        <X size={24} />
      </button>

      {/* PROGRESS */}
      <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
        {currentCreator.stories.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-gray-700 rounded">
            {i < storyIndex && (
              <div className="h-full bg-white rounded w-full" />
            )}
            {i === storyIndex && (
              <div
                className="h-full bg-white rounded"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* CREATOR NAME */}
      <div className="absolute top-7 left-4 z-10 font-semibold text-sm">
        {currentCreator.username}
      </div>

      {/* STORY CONTENT */}
      <div className="relative w-full h-full">
        {currentStory.type === "image" ? (
          <Image
            src={currentStory.src}
            alt="story"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            src={currentStory.src}
            autoPlay
            muted
            playsInline
            onTimeUpdate={onVideoTimeUpdate}
            onEnded={onVideoEnd}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* MESSAGE + SHARE BAR */}
<div
  className="absolute bottom-6 left-4 right-4 z-[999] flex items-center gap-3"
  onClick={(e) => e.stopPropagation()}
>
  <input
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder={`Message ${currentCreator.username}`}
    className="flex-1 bg-black/70 border border-gray-500 rounded-full px-4 py-2 text-sm text-white outline-none"
  />

  <button
    onClick={sendMessage}
    className="bg-white text-black p-2 rounded-full"
  >
    <Send size={18} />
  </button>

  <button
    onClick={shareStory}
    className="bg-black/70 border border-gray-500 p-2 rounded-full"
  >
    <Share2 size={18} />
  </button>
</div>

    </div>
  );
}
