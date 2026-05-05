"use client";

import { X } from "lucide-react";

export default function ReelShare({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full bg-black text-white rounded-t-2xl p-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Share</p>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* TEMP CONTENT */}
        <div className="text-center text-gray-400 py-10">
          Share UI here (we will design later)
        </div>

      </div>
    </div>
  );
}