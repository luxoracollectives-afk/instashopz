"use client";

type Props = {
  src: string;
};

export default function VideoCard({ src }: Props) {
  return (
    <video
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
