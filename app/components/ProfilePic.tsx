"use client";

import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function ProfilePic({ src }: { src?: string }) {
  // If user has NO profile image → show default icon
  if (!src || src === "") {
    return (
      <UserCircleIcon className="w-10 h-10 text-gray-400" />
    );
  }

  // If user HAS profile image → show their image
  return (
    <Image
      src={src}
      alt="Profile Photo"
      width={40}
      height={40}
      className="rounded-full object-cover"
    />
  );
}
