"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  { id: 1, image: "/banners/banner1.png", link: "/collection/fashion" },
  { id: 2, image: "/banners/banner2.png", link: "/collection/electronics" },
  { id: 3, image: "/banners/banner3.png", link: "/collection/home" },
  { id: 4, image: "/banners/banner4.png", link: "/collection/deals" },
];

export default function HeroBannerSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // 🔁 Start auto slide
  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
  };

  // ⛔ Stop auto slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start on mount
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  // Scroll to active banner
  useEffect(() => {
    if (!containerRef.current || isUserInteracting) return;

    const width = containerRef.current.clientWidth;
    containerRef.current.scrollTo({
      left: width * activeIndex,
      behavior: "smooth",
    });
  }, [activeIndex, isUserInteracting]);

  // Detect manual scroll
  const handleScroll = () => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const index = Math.round(containerRef.current.scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full mt-3">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={() => {
          setIsUserInteracting(true);
          stopAutoSlide();
        }}
        onTouchEnd={() => {
          setIsUserInteracting(false);
          startAutoSlide();
        }}
        onMouseDown={() => {
          setIsUserInteracting(true);
          stopAutoSlide();
        }}
        onMouseUp={() => {
          setIsUserInteracting(false);
          startAutoSlide();
        }}
        className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="min-w-full snap-center px-4"
          >
            <div className="relative h-[38vh] rounded-2xl overflow-hidden">
              <Image
                src={banner.image}
                alt="banner"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex ? "bg-white w-5" : "bg-gray-500 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
