"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CSSProperties } from "react";

import { FadeUp } from "./fade-up";
import {
  FEATURE_CATCH_IMAGE,
  FEATURE_ITEM_IMAGE,
  FEATURE_TILES,
  FEATURE_WIDE_MEDIA,
} from "./feature-content";
import type { FeatureTile } from "./feature-content";
import { useScrollReveal } from "./use-scroll-reveal";

/** The distance from the bottom of the window at which a circle starts to open. */
const CIRCLE_TRIGGER_OFFSET_PX = 80;

const MOSAIC_CLASS =
  "relative flex le575:flex-col after:absolute after:inset-0 after:h-full after:w-full after:bg-[rgb(0,133,255)] after:mix-blend-difference after:content-['']";

/** Wide screens read the --*-pc values and small screens the --*-sp ones. */
const CIRCLE_BASE_CLASS =
  "absolute top-0 left-0 z-[100] block h-full w-full bg-(image:--bg-pc) bg-cover bg-center bg-no-repeat le575:bg-(image:--bg-sp) [--cx:var(--cx-pc)] [--cy:var(--cy-pc)] [--cr:var(--cr-pc)] le575:[--cx:var(--cx-sp)] le575:[--cy:var(--cy-sp)] le575:[--cr:var(--cr-sp)]";

const CIRCLE_CLOSED_CLASS = "[clip-path:circle(0_at_var(--cx)_var(--cy))]";

/** Opens with an animation, or is open at once when the visitor prefers less motion. */
const CIRCLE_OPEN_CLASS =
  "motion-safe:animate-circle-in motion-reduce:[clip-path:circle(var(--cr)_at_var(--cx)_var(--cy))]";

function circleStyle(tile: FeatureTile): CSSProperties {
  const { pc, sp } = tile.circle;
  return {
    "--bg-pc": `url(${tile.pc})`,
    "--bg-sp": `url(${tile.sp})`,
    "--cx-pc": pc.x,
    "--cy-pc": pc.y,
    "--cr-pc": pc.radius,
    "--cx-sp": sp.x,
    "--cy-sp": sp.y,
    "--cr-sp": sp.radius,
  } as CSSProperties;
}

function Tile({ tile }: { tile: FeatureTile }) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = useScrollReveal(ref, CIRCLE_TRIGGER_OFFSET_PX);

  return (
    <div ref={ref} data-tile={tile.id} className="relative grow">
      <picture>
        <source srcSet={tile.pc} media={FEATURE_WIDE_MEDIA} />
        <img src={tile.sp} alt="" />
      </picture>
      <div
        data-circle={tile.id}
        aria-hidden="true"
        style={circleStyle(tile)}
        className={`${CIRCLE_BASE_CLASS} ${
          isOpen ? CIRCLE_OPEN_CLASS : CIRCLE_CLOSED_CLASS
        }`}
      />
    </div>
  );
}

export function FeatureSection() {
  const [first, second, third, fourth] = FEATURE_TILES;

  return (
    <section id="feature" className="relative h-full">
      <div data-mosaic className={MOSAIC_CLASS}>
        <div className="flex flex-col le575:flex-col-reverse">
          <div className="flex">
            <Tile tile={first} />
            <Tile tile={second} />
          </div>
          <Tile tile={fourth} />
        </div>
        <Tile tile={third} />
      </div>
      <FadeUp
        data-item
        className="absolute top-[10%] left-[39.2%] z-[100] w-[34.5%] le575:top-[23%] le575:left-[18.6%] le575:w-[71.3%]"
      >
        <Image
          src={FEATURE_ITEM_IMAGE}
          alt=""
          width={995}
          height={1314}
          unoptimized
        />
      </FadeUp>
      <div
        data-catch
        className="absolute top-[77.5%] left-[53.8%] z-[100] h-[11%] w-[41%] le575:top-[48.7%] le575:left-[7%] le575:w-[85.4%]"
      >
        <Image
          src={FEATURE_CATCH_IMAGE}
          alt=""
          width={748}
          height={119}
          unoptimized
        />
      </div>
    </section>
  );
}
