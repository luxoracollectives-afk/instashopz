"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

type CommentType = {
  id: number;
  user: string;
  text: string;
  liked: boolean;
  likes: number;
  replies: {
    id: number;
    user: string;
    text: string;
    liked: boolean;
    likes: number;
  }[];
};

export default function ReelComments({
  onClose,
}: {
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      user: "user1",
      text: "Nice product 🔥",
      liked: false,
      likes: 0,
      replies: [],
    },
    {
      id: 2,
      user: "user2",
      text: "Where can I buy this?",
      liked: false,
      likes: 0,
      replies: [],
    },
  ]);

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

  const toggleReplyLike = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId
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
        },
      ]);
    }

    setInput("");
    setReplyTo(null);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40">
      <div className="bg-white text-black rounded-t-2xl p-4 h-[60%] flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold">Comments</p>
          <button onClick={onClose}>✕</button>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {comments.map((c) => (
            <div key={c.id}>
              <p className="font-semibold text-sm">{c.user}</p>
              <p className="text-sm">{c.text}</p>

              <div className="flex gap-4 mt-1 text-xs items-center">
                <button
                  onClick={() => toggleCommentLike(c.id)}
                  className="flex items-center gap-1"
                >
                  <Heart
                    size={14}
                    className={
                      c.liked
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }
                  />
                  {c.likes > 0 && <span>{c.likes}</span>}
                </button>

                <button
                  onClick={() => setReplyTo(c.id)}
                  className="text-gray-500"
                >
                  Reply
                </button>
              </div>

              {/* REPLIES */}
              {c.replies.length > 0 && (
                <div className="ml-4 mt-2 space-y-2">
                  {c.replies.map((r) => (
                    <div key={r.id}>
                      <p className="text-xs font-semibold">{r.user}</p>
                      <p className="text-xs">{r.text}</p>

                      <div className="flex gap-3 mt-1 text-xs items-center">
                        <button
                          onClick={() => toggleReplyLike(c.id, r.id)}
                          className="flex items-center gap-1"
                        >
                          <Heart
                            size={12}
                            className={
                              r.liked
                                ? "text-red-500 fill-red-500"
                                : "text-gray-500"
                            }
                          />
                          {r.likes > 0 && <span>{r.likes}</span>}
                        </button>

                        <button
                          onClick={() => setReplyTo(c.id)}
                          className="text-gray-500"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={replyTo ? "Replying..." : "Add a comment..."}
            className="flex-1 border rounded-full px-3 py-2 text-sm"
          />
          <button
            onClick={handlePost}
            className="text-blue-500 font-semibold"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
}