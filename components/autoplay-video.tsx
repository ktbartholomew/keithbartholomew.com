"use client";

import { useEffect, useRef, useState } from "react";

interface AutoplayVideoProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  type?: string;
  muted?: boolean;
}

export function AutoplayVideo({
  src,
  className = "",
  width,
  height,
  type = "video/mp4",
  muted = true,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      width={width}
      height={height}
      muted={muted}
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
