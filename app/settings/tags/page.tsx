"use client";

import { useRouter } from "next/navigation";

export default function TagsPage() {
  const router = useRouter();

  // 🏷️ MOCK TAGS & MENTIONS DATA
  const tags = [
    {
      id: 1,
      user: "alex_07",
      action: "tagged you in a reel",
      time: "2h",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      user: "john_doe",
      action: 'mentioned you in a comment: "@you check this 🔥"',
      time: "5h",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      user: "sarah",
      action: "tagged you in a post",
      time: "1d",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Tags & Mentions</h1>
      </div>

      {/* LIST */}
      <div className="flex flex-col">

        {tags.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No tags or mentions
          </p>
        )}

        {tags.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 cursor-pointer active:scale-[0.98]"
            onClick={() => router.push(`/post/${t.id}`)} // future reel/post page
          >

            {/* PROFILE */}
            <img
              src={t.avatar}
              className="w-10 h-10 rounded-full"
            />

            {/* TEXT */}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{t.user}</span>{" "}
                {t.action}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {t.time} ago
              </p>
            </div>

          </div>
        ))}

      </div>

    </main>
  );
}