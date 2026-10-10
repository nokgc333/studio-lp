"use client";

import Image from "next/image";
import { Autoplay, EffectCreative, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { CreativeEffectOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-creative";

import { useIsMounted } from "./use-media-query";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const AUTOPLAY = { delay: 2500, disableOnInteraction: false } as const;

/** The next picture comes in from the right; the previous one slides back, in shadow. */
const CREATIVE_EFFECT: CreativeEffectOptions = {
  prev: { shadow: true, translate: ["-20%", 0, -1] },
  next: { translate: ["100%", 0, 0] },
};

type ProductCarouselProps = {
  images: readonly string[];
  /** Only the carousel that fits the current screen runs; the other stays still. */
  isActive: boolean;
  className?: string;
};

function SlideImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={960}
      height={660}
      unoptimized
      className="h-full w-full"
    />
  );
}

/**
 * Still pictures laid out like the carousel's first view. They are what the
 * server sends, what a hidden carousel shows, and what shows without scripts.
 */
function StillCarousel({
  images,
  className = "",
}: Omit<ProductCarouselProps, "isActive">) {
  return (
    <div className={`swiper ${className}`.trim()}>
      <div className="swiper-wrapper">
        {images.map((image) => (
          <div key={image} className="swiper-slide overflow-hidden">
            <SlideImage src={image} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A carousel of pictures that changes by itself, unless the visitor wants less motion. */
export function ProductCarousel({
  images,
  isActive,
  className,
}: ProductCarouselProps) {
  const isMounted = useIsMounted();
  const isReduced = usePrefersReducedMotion();

  if (!isMounted || !isActive) {
    return <StillCarousel images={images} className={className} />;
  }

  return (
    <Swiper
      modules={[Autoplay, EffectCreative, Parallax]}
      loop
      parallax
      effect="creative"
      creativeEffect={CREATIVE_EFFECT}
      autoplay={isReduced ? false : AUTOPLAY}
      speed={1500}
      allowTouchMove={false}
      className={className}
    >
      {images.map((image) => (
        <SwiperSlide
          key={image}
          data-swiper-parallax-x="90%"
          className="overflow-hidden"
        >
          <SlideImage src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
