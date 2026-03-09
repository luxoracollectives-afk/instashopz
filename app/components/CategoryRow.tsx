"use client";

export default function CategoryRow() {
  const categories = [
    "Fashion",
    "Electronics",
    "Home",
    "Beauty",
    "Deals",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3">
      {categories.map((cat) => (
        <div
          key={cat}
          className="min-w-[90px] px-4 py-2 bg-gray-800 rounded-full text-sm text-center"
        >
          {cat}
        </div>
      ))}
    </div>
  );
}
