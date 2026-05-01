"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LikedPage() {
  const router = useRouter();

  const [sort, setSort] = useState("new");
  const [range, setRange] = useState("all");

  const [posts, setPosts] = useState<any[]>([]);

  // ✅ LOAD LIKED POSTS FROM STORAGE (FIXED)
  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("likedPosts") || "[]");

    // 🔥 safety fix
    if (!Array.isArray(stored)) stored = [];

    const formatted = stored.map((item: any) => ({
      id: item.id,
      image: item.poster || item.videoSrc || "/banner1.png", // ✅ FIXED
      date: item.date || new Date().toISOString(),
    }));

    setPosts(formatted);
  }, []);

  const now = new Date();

  // 📅 RANGE FILTER (UNCHANGED)
  const filterByRange = (postDate: Date) => {
    const diffDays =
      (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);

    switch (range) {
      case "today":
        return postDate.toDateString() === now.toDateString();
      case "7days":
        return diffDays <= 7;
      case "3months":
        return diffDays <= 90;
      case "6months":
        return diffDays <= 180;
      case "1year":
        return diffDays <= 365;
      default:
        return true;
    }
  };

  // 🔄 FILTER + SORT (UNCHANGED)
  let filtered = posts.filter((p) =>
    filterByRange(new Date(p.date))
  );

  filtered.sort((a, b) => {
    const d1 = new Date(a.date).getTime();
    const d2 = new Date(b.date).getTime();

    return sort === "new" ? d2 - d1 : d1 - d2;
  });

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()}>←</button>
        <h1 className="text-lg font-semibold">Liked Posts</h1>
      </div>

      {/* 🔽 FILTER SECTION */}
      <div className="px-4 flex flex-col gap-3 mb-4">

        {/* SORT */}
        <div className="flex gap-2">
          <button
            onClick={() => setSort("new")}
            className={`px-3 py-1 rounded-full text-sm ${
              sort === "new" ? "bg-yellow-500 text-black" : "bg-[#1a1a1a]"
            }`}
          >
            Newest
          </button>

          <button
            onClick={() => setSort("old")}
            className={`px-3 py-1 rounded-full text-sm ${
              sort === "old" ? "bg-yellow-500 text-black" : "bg-[#1a1a1a]"
            }`}
          >
            Oldest
          </button>
        </div>

        {/* DATE RANGE */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { label: "All", value: "all" },
            { label: "Today", value: "today" },
            { label: "7 Days", value: "7days" },
            { label: "3 Months", value: "3months" },
            { label: "6 Months", value: "6months" },
            { label: "1 Year", value: "1year" },
          ].map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                range === r.value
                  ? "bg-yellow-500 text-black"
                  : "bg-[#1a1a1a]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

      </div>

      {/* 📸 GRID (UI SAME, CLICK FIXED) */}
      <div className="grid grid-cols-3 gap-[2px]">

        {filtered.map((post) => (
          <div
            key={post.id}
            className="aspect-square bg-[#1a1a1a]"
            onClick={() => router.push(`/reels?start=${post.id}`)} // ✅ FIXED
          >
            <img
              src={post.image}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No liked posts in this range
        </p>
      )}

    </main>
  );
}