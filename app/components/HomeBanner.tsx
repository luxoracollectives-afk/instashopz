"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomeBanner() {
  const banners = [
    {
      id: 1,
      image: "/banners/banner1.png",
      link: "/new-arrivals",
    },
    {
      id: 2,
      image: "/banners/banner2.png",
      link: "/deals",
    },
    {
      id: 3,
      image: "/banners/banner3.png",
      link: "/fashion",
    },
  ];

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap no-scrollbar py-3">
      {banners.map((banner) => (
        <Link
          key={banner.id}
          href={banner.link}
          className="inline-block mr-3"
        >
          <div className="relative w-[90vw] h-[30vw] rounded-xl overflow-hidden">
            <Image
              src={banner.image}
              alt="banner"
              fill
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
