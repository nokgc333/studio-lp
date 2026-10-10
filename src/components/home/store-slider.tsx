"use client";

import Image from "next/image";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { STORES_BUTTON_ICON, STORES_BUTTON_LABEL } from "./stores-content";
import type { Store } from "./stores-content";

/** The arrows: a black square with a white triangle, set 10px in from the edge. */
// `top` and `width` need `!`: Swiper's CSS is unlayered, so it beats Tailwind's layered utilities.
const ARROW_CLASS =
  "top-1/4! w-[27px]! before:absolute before:top-0 before:right-0 before:h-9 before:w-9 before:bg-ink before:content-[''] after:absolute after:top-[9px] after:h-[calc(10px*tan(60deg))] after:w-3 after:bg-paper after:content-['']";
const PREV_ARROW_CLASS = `${ARROW_CLASS} before:left-[-10px] after:left-0 after:[clip-path:polygon(0_50%,100%_0,100%_100%)]`;
const NEXT_ARROW_CLASS = `${ARROW_CLASS} before:left-0 after:left-3.5 after:[clip-path:polygon(0_0,100%_50%,0_100%)]`;

const BUTTON_CLASS =
  "mt-3 inline-flex h-[46px] w-full min-w-[303px] z-10 items-center justify-center rounded-[4px] bg-brand-diagonal text-[1rem] leading-[2.25] font-bold text-paper";

/** What one slide holds. (Swiper only counts a SwiperSlide that is a direct child as a slide.) */
function StoreDetails({ store }: { store: Store }) {
  return (
    <>
      <div>
        <Image src={store.image} alt="" width={772} height={460} unoptimized />
      </div>
      <div className="relative">
        <div className="w-full px-5 pt-4 text-[14px] le768:pt-2 le768:pr-2 le768:pl-4">
          <div className="text-[1rem] leading-[1.625] font-bold">
            {store.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </div>
          <p className="mt-[9px] le768:mt-[5px]">{store.address}</p>
          <p className="mt-[9px] le768:mt-[5px]">{store.tel}</p>
          <p className="mt-[9px] le768:mt-[5px]">
            <a href="#stores">{store.url}</a>
          </p>
        </div>
      </div>
    </>
  );
}

/** The stores of one region, one at a time, with arrows to move between them. */
export function StoreSlider({ stores }: { stores: readonly Store[] }) {
  const [prevButton, setPrevButton] = useState<HTMLButtonElement | null>(null);
  const [nextButton, setNextButton] = useState<HTMLButtonElement | null>(null);

  return (
    <Swiper
      modules={[Navigation]}
      loop
      slidesPerView={1}
      speed={900}
      // The arrows are drawn by the classes below: Swiper must not add an icon of its own.
      navigation={
        prevButton && nextButton
          ? { prevEl: prevButton, nextEl: nextButton, addIcons: false }
          : false
      }
      className="w-[42.2%] min-w-[335px] rounded-2xl bg-surface [--swiper-navigation-sides-offset:10px] le768:w-[90%] le768:max-w-[575px]"
    >
      {stores.map((store) => (
        <SwiperSlide key={store.id}>
          <StoreDetails store={store} />
        </SwiperSlide>
      ))}
      <button
        slot="container-end"
        ref={setPrevButton}
        type="button"
        aria-label="Previous slide"
        className={`swiper-button-prev ${PREV_ARROW_CLASS}`}
      />
      <button
        slot="container-end"
        ref={setNextButton}
        type="button"
        aria-label="Next slide"
        className={`swiper-button-next ${NEXT_ARROW_CLASS}`}
      />
      <div
        slot="container-end"
        className="flex w-full justify-center px-5 pb-5 le768:px-4 le768:pb-4"
      >
        <button type="button" className={BUTTON_CLASS}>
          <Image
            src={STORES_BUTTON_ICON}
            alt=""
            width={26}
            height={30}
            unoptimized
            className="w-[30px]"
          />
          {STORES_BUTTON_LABEL}
        </button>
      </div>
    </Swiper>
  );
}
