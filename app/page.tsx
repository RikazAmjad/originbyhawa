"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function CasaLunaraClone() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const girlRef = useRef<HTMLImageElement | null>(null);
  const textRefs = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Step 1 — fade in background
    tl.fromTo(
      bgRef.current,
      { autoAlpha: 0, scale: 1.05 },
      { autoAlpha: 1, scale: 1, duration: 1.2 }
    );

    // Step 2 — fade in model/girl
    tl.fromTo(
      girlRef.current,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.4 },
      "-=0.3"
    );

    // Step 3 — text animations
    const textEls = textRefs.current?.querySelectorAll(".fade-text");
    if (textEls) {
      tl.fromTo(
        textEls,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.25,
        },
        "-=0.6"
      );
    }
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#111] font-serif">
      {/* Background arches */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-center md:bg-contain bg-cover max-md:bg-no-repeat"
        style={{
          backgroundImage:
            "url('/arch-background.jpg')", // replace with arches/gradient image
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40"></div>

      {/* Girl image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          ref={girlRef}
          src="/pinkhijab.jpg"
          alt="Editorial Model"
          width={600}
          height={800}
          className="w-full h-full object-contain z-10"
        />
      </div>

      {/* Text overlays */}
      <div
        ref={textRefs}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-pink-500 z-20 top-100"
      >
        <span className="fade-text md:text-base font-light tracking-wide mb-4 text-gray-900">
          Origin By HAWWA
        </span>
        <h3 className="fade-text text-2xl md:text-4xl italic mb-2">
          Hijabs That Speak Style
        </h3>
        <h1 className="fade-text text-5xl md:text-7xl font-semibold tracking-tight mb-6">
          Refined Elegance
        </h1>
        <p className="fade-text max-w-2xl text-xs md:text-sm text-gray-800 px-4 leading-relaxed">
          Discover our curated collection of hijabs that blend contemporary
          fashion with timeless elegance. Each piece is designed to empower and
          inspire, offering a perfect harmony of style and grace for every
          occasion.
        </p>
      </div>
    </main>
  );
}
