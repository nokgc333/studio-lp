"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

import { Container } from "@/components/layout/container";

import {
  EFFECT_IMAGES,
  EFFECT_NOTE,
  EFFECT_POINTS,
  EFFECT_SLIDER_LABEL,
  EFFECT_TITLE_LINES,
  EFFECT_WIDE_MEDIA,
} from "./effect-content";
import { SectionTitle } from "./section-title";

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_START = 50;

const BEFORE_CLASS =
  "absolute bottom-0 left-0 h-full w-[38.8%] le768:w-[35.5%] before:absolute before:top-[44%] before:-right-[30px] before:bottom-0 before:z-[1] before:h-[54px] before:w-[54px] before:bg-[url(/images/placeholder/effect-arrow.svg)] before:bg-contain before:bg-no-repeat before:content-[''] le768:before:-right-[15px] le768:before:h-[30px] le768:before:w-[30px]";

/** The white edge between the two pictures; it goes away at both ends of the slider. */
const EDGE_CLASS = "border-r-[6px] border-paper le768:border-r-2";

/** The two pictures of one state: the wide one first, the small one as the fallback. */
function StatePicture({
  images,
  className,
}: {
  images: { pc: string; sp: string };
  className?: string;
}) {
  return (
    <picture>
      <source srcSet={images.pc} media={EFFECT_WIDE_MEDIA} />
      <img src={images.sp} alt="" className={className} />
    </picture>
  );
}

function Lines({
  lines,
  breakClass,
}: {
  lines: readonly string[];
  breakClass: string;
}) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 && <br className={breakClass} />}
      {line}
    </Fragment>
  ));
}

export function EffectSection() {
  // Until the slider is moved, the before picture keeps the width the design starts with.
  const [value, setValue] = useState<number | null>(null);
  const isAtEnd = value === SLIDER_MIN || value === SLIDER_MAX;

  return (
    <section id="effect" className="bg-paper py-[120px] le768:py-[60px]">
      <Container>
        <SectionTitle>
          <Lines lines={EFFECT_TITLE_LINES} breakClass="hidden le768:block" />
        </SectionTitle>
        <div className="relative mt-20 w-full overflow-hidden rounded-2xl le768:mt-10">
          <div
            data-before
            className={`${BEFORE_CLASS} ${isAtEnd ? "border-r-0" : EDGE_CLASS}`}
            style={value === null ? undefined : { width: `${value}%` }}
          >
            <StatePicture
              images={EFFECT_IMAGES.before}
              className="absolute bottom-0 left-0 h-full w-full object-cover object-left"
            />
          </div>
          <div data-after>
            <StatePicture images={EFFECT_IMAGES.after} />
          </div>
          <input
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            defaultValue={SLIDER_START}
            aria-label={EFFECT_SLIDER_LABEL}
            onChange={(event) => setValue(Number(event.target.value))}
            className="absolute top-0 left-0 z-[1] m-0 h-full w-full cursor-pointer p-0 opacity-0"
          />
        </div>
        <div className="mt-[30px] text-center text-[clamp(0.75rem,_0.662rem_+_0.3756vw,_1rem)] leading-[1.448125] font-medium tracking-[0.1em] le768:mt-[18px] le768:text-left">
          {EFFECT_NOTE}
        </div>
        <div
          data-panel
          className="mt-[clamp(2rem,_1.3838rem_+_2.6291vw,_3.75rem)] w-full rounded-2xl bg-brand-diagonal px-[7.3%] py-[3.4%] le575:p-6"
        >
          <div className="flex items-center gap-[7.4%] le575:flex-col le575:justify-center le575:gap-[46px]">
            <div className="relative w-[290px] le575:mt-[27px] le575:w-[90%]">
              <Image
                src={EFFECT_IMAGES.symbol}
                alt=""
                width={580}
                height={276}
                unoptimized
              />
              <Image
                src={EFFECT_IMAGES.parts}
                alt=""
                width={263}
                height={388}
                unoptimized
                className="absolute top-[-23%] left-[56%] w-[45%]"
              />
            </div>
            <div
              data-points
              className="text-[clamp(1.25rem,_1.162rem_+_0.3756vw,_1.5rem)] leading-[1.447916666] font-bold tracking-[0.1em] text-paper"
            >
              {EFFECT_POINTS.map((lines) => (
                <p
                  key={lines.join("")}
                  className="mt-4 first:mt-0 le575:mt-5 le575:text-center"
                >
                  <Lines lines={lines} breakClass="hidden le575:block" />
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
