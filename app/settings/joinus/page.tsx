"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  PlayCircle,
  BadgeCheck,
  Video,
  Store,
  ShoppingBag,
  Wallet,
  Users,
  ChevronDown,
  Info,
} from "lucide-react";

export default function JoinUsPage() {
  const router = useRouter();

  const faqs = [
    {
      q: "How long does approval take?",
      a: "Most seller applications are reviewed within 24–48 hours.",
    },
    {
      q: "Is GST mandatory?",
      a: "GST depends on your business type and category.",
    },
    {
      q: "How do I receive payments?",
      a: "Payments are securely transferred to your registered bank account.",
    },
    {
      q: "Can I upload reels?",
      a: "Yes. Approved sellers can upload reels linked to their products.",
    },
    {
      q: "How much commission is charged?",
      a: "We follow a transparent seller-friendly commission structure.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <button onClick={() => router.back()} className="text-2xl">
          ←
        </button>
        <h1 className="text-2xl font-semibold">Join us & Sell</h1>
      </div>

     {/* HERO */}
<section className="px-5 pt-8">

  <h1 className="text-4xl font-bold leading-tight">
    Grow Your Business with InstaShopz
  </h1>

  <p className="max-w-2xl text-gray-400 mt-5 text-[16px] leading-7">
    Create your own storefront, showcase products through engaging reels,
    reach more customers, and manage every order from one place.
  </p>

  {/* Trust Badges */}
  <div className="flex flex-wrap gap-3 mt-6">

    <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm flex items-center gap-2">
      <BadgeCheck size={16} className="text-yellow-400" />
      <span>Zero Setup Fee</span>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm flex items-center gap-2">
      <BadgeCheck size={16} className="text-yellow-400" />
      <span>Fast Approval</span>
    </div>

    <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm flex items-center gap-2">
      <BadgeCheck size={16} className="text-yellow-400" />
      <span>Seller-Friendly Commission</span>
    </div>

  </div>

  <button
    onClick={() => router.push("/settings/seller-registration")}
    className="mt-8 w-full bg-yellow-400 text-black font-semibold py-3 rounded-full"
  >
    Apply as Seller
  </button>

</section>

      {/* VIDEO */}
      <section className="px-5 mt-8">

        <div className="relative rounded-3xl overflow-hidden h-56 bg-zinc-900 flex items-center justify-center">

          <PlayCircle size={70} className="text-yellow-400" />

        </div>

        <p className="text-center text-sm text-gray-400 mt-3">
          Hear how sellers are growing with our platform.
        </p>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 mt-12">

        <h2 className="text-2xl font-bold mb-6">
          How It Works
        </h2>

        <div className="space-y-5">

         <Step
  icon={<BadgeCheck size={22} />}
  title="Apply"
  desc="Submit your seller application."
  route="/settings/seller-help/apply"
/>

<Step
  icon={<Users size={22} />}
  title="Get Verified"
  desc="Our team reviews your application."
  route="/settings/seller-help/get-verified"
/>

<Step
  icon={<Store size={22} />}
  title="Set Up Store"
  desc="Customize your storefront."
  route="/settings/seller-help/set-up-store"
/>

<Step
  icon={<Video size={22} />}
  title="Upload Products & Reels"
  desc="Showcase products through engaging videos."
  route="/settings/seller-help/upload-products-reels"
/>

<Step
  icon={<ShoppingBag size={22} />}
  title="Receive Orders"
  desc="Manage every order easily."
  route="/settings/seller-help/receive-orders"
/>

<Step
  icon={<Wallet size={22} />}
  title="Earn & Grow"
  desc="Receive payouts and grow your business."
  route="/settings/seller-help/earn-grow"
/>

        </div>

      </section>

      {/* BENEFITS */}
      <section className="px-5 mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Why Sell With Us?
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Benefit title="Zero Setup Fee" />
          <Benefit title="Low Commission" />
          <Benefit title="Fast Payouts" />
          <Benefit title="Seller Support" />
          <Benefit title="Nationwide Reach" />
          <Benefit title="Sell Through Reels" />

        </div>

      </section>

      {/* FAQ */}
      <section className="px-5 mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((item) => (
            <div
              key={item.q}
              className="bg-zinc-900 rounded-2xl p-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  {item.q}
                </h3>

                <ChevronDown size={18} />
              </div>

              <p className="text-gray-400 text-sm mt-3">
                {item.a}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="px-5 mt-12 mb-10">

        <div className="bg-yellow-400 rounded-3xl p-6 text-black">

          <h2 className="text-2xl font-bold">
            Ready to Grow?
          </h2>

          <p className="mt-2">
            Join our growing seller community and start building your business today.
          </p>

          <button
            onClick={() => router.push("/settings/seller-registration")}
            className="mt-5 bg-black text-white w-full py-3 rounded-full"
          >
            Become a Seller
          </button>

        </div>

      </section>

    </main>
  );
}

function Step({
  icon,
  title,
  desc,
  route,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  route: string;
}) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-4 items-start">
        <div className="bg-yellow-400 text-black p-3 rounded-full">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{desc}</p>
        </div>
      </div>

      <button
        onClick={() => router.push(route)}
        className="text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        <Info size={18} />
      </button>
    </div>
  );
}

function Benefit({ title }: { title: string }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4">

      <div className="w-10 h-10 bg-yellow-400 rounded-full mb-3" />

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm text-gray-400 mt-2">
        Grow your business with our seller-friendly platform.
      </p>

    </div>
  );
}