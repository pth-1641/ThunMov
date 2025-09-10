"use client";
import { imageCdnUrl } from "@/constants";
import { FC, useEffect, useState } from "react";

type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export const Image: FC<ImageProps> = (props) => {
  const { src, alt = "", className = "", height = 450, width = 300 } = props;

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (src.trim()) {
      setImgSrc(imageCdnUrl + src);
    }
  }, [src]);

  return (
    <div
      className={`bg-stone-900 overflow-hidden ${
        isComplete ? "animate-none" : "animate-pulse"
      } ${className}`}
    >
      <img
        src={`${imgSrc}&w=${width}&output=webp`}
        alt={alt}
        className={`duration-300 object-cover h-full w-full ${
          isComplete ? "opacity-100 blur-none" : "opacity-0 blur-lg"
        } `}
        width={width}
        height={height}
        onLoad={() => setIsComplete(true)}
        onError={() => {
          if (imgSrc.includes(imageCdnUrl)) {
            const backupUrl = imgSrc.includes("thumb")
              ? imgSrc.replace("thumb", "poster")
              : imgSrc.replace("poster", "thumb");
            setImgSrc(backupUrl);
            return;
          }
          setImgSrc(imageCdnUrl + src);
        }}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};
