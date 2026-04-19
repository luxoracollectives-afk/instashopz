"use client";

import {
  User,
  Package,
  Heart,
  Headphones,
  CreditCard,
  MapPin,
  Mail,
  Tag,
  ThumbsUp,
  Bookmark,
  Clock,
  Bell,
  Ban,
  AtSign,
  EyeOff,
  Shield,
  Languages,
  Globe,
  HelpCircle,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-y-auto">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-4">
        <span className="text-xl">←</span>
        <h1 className="text-xl font-semibold">settings and profile</h1>
      </div>

      {/* SEARCH */}
      <div className="px-4 mb-4">
        <div className="bg-gray-300 text-black rounded-full px-4 py-2">
          SEARCH
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 flex flex-col gap-4">

        <SettingItem icon={<Tag />} text="Join Us and Sell" />

        <SettingItem
          icon={<User />}
          text="Account Settings"
          sub="Shopping settings"
        />

        <SettingItem icon={<Package />} text="My Orders" />
        <SettingItem icon={<Heart />} text="My Wishlist" />
        <SettingItem icon={<Headphones />} text="Support" />
        <SettingItem icon={<CreditCard />} text="My Transactions" />
        <SettingItem icon={<MapPin />} text="Saved Address" />
        <SettingItem icon={<Mail />} text="Mail Box" />
        <SettingItem icon={<Tag />} text="Deals" />

        {/* SECTION TITLE */}
        <p className="text-gray-400 text-sm mt-4">Entertainment</p>

        <SettingItem icon={<ThumbsUp />} text="Liked posts" />
        <SettingItem icon={<Bookmark />} text="Saved posts" />
        <SettingItem icon={<Clock />} text="Your Activity" />

        <SettingItem icon={<Bell />} text="Notifications" />
        <SettingItem icon={<Ban />} text="Blocked" />
        <SettingItem icon={<AtSign />} text="Tags and mentions" />
        <SettingItem icon={<EyeOff />} text="Hidden Words" />
        <SettingItem icon={<Shield />} text="Account type and tools" />
        <SettingItem icon={<Languages />} text="Translation" />

        {/* SECTION TITLE */}
        <p className="text-gray-400 text-sm mt-4">Support and Help</p>

        <SettingItem icon={<Globe />} text="App permissions" />
        <SettingItem icon={<HelpCircle />} text="Help" />

        {/* LOGOUT */}
        <p className="text-red-500 mt-6">LOG OUT</p>

        {/* bottom spacing */}
        <div className="h-20" />
      </div>
    </main>
  );
}

function SettingItem({
  icon,
  text,
  sub,
}: {
  icon: React.ReactNode;
  text: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800">

      <div className="flex items-center gap-4">
        <div>{icon}</div>

        <div>
          <p>{text}</p>
          {sub && <p className="text-sm text-gray-400">{sub}</p>}
        </div>
      </div>

      <span className="text-gray-400">{">"}</span>
    </div>
  );
}