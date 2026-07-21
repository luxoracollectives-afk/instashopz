"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
} from "lucide-react";

import ProgressBar from "./components/ProgressBar";
import StepCard from "./components/StepCard";
import { registrationSteps } from "./data/registrationSteps";

export default function SellerRegistrationPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-5">
        <button
          onClick={() => router.back()}
          className="text-white"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="text-2xl font-semibold">
          Seller Registration
        </h1>
      </div>

      <div className="px-5 py-8 max-w-4xl mx-auto">

        {/* Progress */}
        <ProgressBar
          currentStep={1}
          totalSteps={5}
        />

        {/* Welcome */}
        <section className="mt-10">

          <h1 className="text-4xl font-bold leading-tight">
            Become an
            <br />
            InstaShopz Seller
          </h1>

          <p className="text-gray-400 mt-5 leading-7">
            Start selling through short videos,
            build your own storefront,
            and reach customers across India.
          </p>

        </section>

        {/* Benefits */}
        <section className="mt-10">

          <h2 className="text-xl font-semibold mb-5">
            Why Sell With InstaShopz?
          </h2>

          <div className="space-y-4">

            {[
              "Zero Setup Fee",
              "Seller-Friendly Commission",
              "Fast Approval",
              "Secure Payments",
              "Video-first Shopping",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <BadgeCheck
                  size={20}
                  className="text-yellow-400"
                />

                <span>{item}</span>
              </div>
            ))}

          </div>

        </section>

        {/* Registration Steps */}
        <section className="mt-12">

          <h2 className="text-xl font-semibold mb-5">
            Registration Process
          </h2>

          <div className="space-y-4">

            {registrationSteps.map((step) => (
              <StepCard
                key={step.id}
                step={step.id}
                title={step.title}
                description={step.description}
                active={step.id === 1}
              />
            ))}

          </div>

        </section>

    

        {/* Start Button */}
        <button
          onClick={() =>
            router.push(
              "/settings/seller-registration/business-details"
            )
          }
          className="
            mt-10
            w-full
            bg-yellow-400
            text-black
            font-bold
            text-lg
            py-4
            rounded-full
            transition-all
            duration-300
            hover:bg-yellow-300
            hover:scale-[1.01]
            active:scale-[0.98]
          "
        >
          Start Registration
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-5">
          By continuing, you agree to the Seller Terms & Conditions.
        </p>

      </div>

    </main>
  );
}