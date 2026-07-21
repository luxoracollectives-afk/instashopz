"use client";

import { Check, Lock, Circle } from "lucide-react";

interface StepStatusProps {
  title: string;
  status: "completed" | "current" | "locked";
}

export default function StepStatus({
  title,
  status,
}: StepStatusProps) {
  const styles = {
    completed: {
      icon: <Check size={18} />,
      bg: "bg-green-500",
      text: "text-white",
    },
    current: {
      icon: <Circle size={18} fill="currentColor" />,
      bg: "bg-yellow-400",
      text: "text-black",
    },
    locked: {
      icon: <Lock size={16} />,
      bg: "bg-zinc-700",
      text: "text-gray-300",
    },
  };

  const currentStyle = styles[status];

  return (
    <div className="flex items-center gap-3">

      <div
        className={`
          w-8
          h-8
          rounded-full
          flex
          items-center
          justify-center
          ${currentStyle.bg}
          ${currentStyle.text}
        `}
      >
        {currentStyle.icon}
      </div>

      <span
        className={`
          font-medium
          ${
            status === "locked"
              ? "text-gray-500"
              : "text-white"
          }
        `}
      >
        {title}
      </span>

    </div>
  );
}