"use client";

import { ChevronRight } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  active?: boolean;
  completed?: boolean;
  onClick?: () => void;
}

export default function StepCard({
  step,
  title,
  description,
  active = false,
  completed = false,
  onClick,
}: StepCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-3xl
        border
        p-5
        transition-all
        duration-300
        flex
        items-center
        justify-between
        ${
          active
            ? "border-yellow-400 bg-zinc-900"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
        }
      `}
    >
      <div className="flex items-center gap-4">

        {/* Step Number */}
        <div
          className={`
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            font-bold
            text-lg
            ${
              completed || active
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-gray-400"
            }
          `}
        >
          {step}
        </div>

        {/* Text */}
        <div className="text-left">
          <h3 className="font-semibold text-lg text-white">
            {title}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {description}
          </p>
        </div>

      </div>

      <ChevronRight
        size={22}
        className={active ? "text-yellow-400" : "text-gray-500"}
      />
    </button>
  );
}