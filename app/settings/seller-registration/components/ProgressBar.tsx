"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Seller Registration
        </h3>

        <span className="text-sm text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress */}
      <div className="flex items-center">

        {Array.from({ length: totalSteps }).map((_, index) => {
          const active = index < currentStep;

          return (
            <div
              key={index}
              className="flex items-center flex-1"
            >
              {/* Circle */}
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                  active
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-zinc-900 border-zinc-700"
                }`}
              />

              {/* Line */}
              {index !== totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 transition-all duration-300 ${
                    index < currentStep - 1
                      ? "bg-yellow-400"
                      : "bg-zinc-700"
                  }`}
                />
              )}
            </div>
          );
        })}

      </div>

    </div>
  );
}