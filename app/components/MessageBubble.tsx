"use client";

import Image from "next/image";

type Msg = {
  from: string; 
  text?: string;
  media?: {
    url: string;
    type: "image" | "video";
  };
  product?: {
    id: string;
    name: string;
    price: string;
    image?: string;
    link?: string;
  } | null;
};

export default function MessageBubble({
  msg,
  isMine,
}: {
  msg: Msg;
  isMine: boolean;
}) {
  return (
    <div
      className={`max-w-[80%] px-3 py-2 rounded-xl ${
        isMine
          ? "ml-auto bg-blue-600 text-white"
          : "bg-[#111] text-gray-200"
      }`}
    >
      {/* Media messages */}
      {msg.media && msg.media.type === "image" && (
        <img
          src={msg.media.url}
          className="rounded-md max-h-60 w-auto mb-2"
          alt="sent image"
        />
      )}

      {msg.media && msg.media.type === "video" && (
        <video
          src={msg.media.url}
          controls
          className="rounded-md max-h-60 w-auto mb-2"
        />
      )}

      {/* Product preview */}
      {msg.product && (
        <a
          href={msg.product.link || "#"}
          className="block border border-gray-700 rounded-md p-2 mb-2 bg-[#0b0b0b]"
        >
          <div className="flex gap-3 items-center">
            <img
              src={msg.product.image}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-medium">{msg.product.name}</p>
              <p className="text-sm text-gray-300">
                {msg.product.price}
              </p>
            </div>
          </div>
        </a>
      )}

      {msg.text && <p>{msg.text}</p>}
    </div>
  );
}
