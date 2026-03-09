"use client";

type Props = {
  title: string;
};

export default function StoreRow({ title }: Props) {
  return (
    <div className="mt-6">
      <h2 className="px-4 mb-3 text-lg font-semibold">{title}</h2>

      <div className="flex gap-4 overflow-x-auto px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[90px]"
          >
            <div className="w-16 h-16 rounded-full bg-gray-700 mb-2" />
            <p className="text-xs text-gray-300">Store {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
