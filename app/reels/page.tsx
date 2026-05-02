"use client";

import { Suspense } from "react";
import ReelsContent from "./ReelsContent";

export default function ReelsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ReelsContent />
    </Suspense>
  );
}