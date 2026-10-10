"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Container } from "@/components/layout/container";

import {
  LINEUP_PRODUCTS,
  LINEUP_SLIDES,
  LINEUP_TITLE,
  LINEUP_WIDE_GROUPS,
} from "./lineup-content";
import type { LineupProduct, LineupVariant } from "./lineup-content";
import { ProductCarousel } from "./product-carousel";
import { useMediaQuery } from "./use-media-query";
import { SectionTitle } from "./section-title";

const CAROUSEL_GAP_CLASS = "mt-[clamp(2.5rem,_1.6197rem_+_3.7559vw,_5rem)]";

const NAME_GRADIENT_CLASS: Record<LineupVariant, string> = {
  mixed:
    "bg-[linear-gradient(85.69deg,var(--color-primary)_3.5%,var(--color-secondary)_30.59%,var(--color-highlight)_56.41%)]",
  green: "bg-[linear-gradient(90deg,#03b10f_0%,#3cffb9_27.69%,#e7f91b_56.55%)]",
  hot: "bg-[linear-gradient(90deg,#b00202_0%,#ff8a00_29.18%,#e83a54_58.97%)]",
};

function ProductCard({ product }: { product: LineupProduct }) {
  // One minimum height only: with two, the later rule would win.
  const bodyHeightClass =
    product.variant === "hot" ? "le768:min-h-[171px]" : "le768:min-h-[193px]";

  return (
    <div
      data-product
      className="w-[29%] le768:mt-11 le768:flex le768:w-full le768:flex-col le768:items-center le768:first:mt-10"
    >
      <div className="relative w-full max-w-[290px]">
        <div
          data-name
          className={`w-full bg-clip-text text-left font-display text-[37px] leading-[1.081081081] tracking-[0.1em] text-transparent ${NAME_GRADIENT_CLASS[product.variant]}`}
        >
          {product.nameLines.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </div>
        <div className="mt-[23px] text-[0.875rem] leading-[1.785714285]">
          {product.region}
          <br />
          <span className="mt-2 block font-display text-[1.5rem] leading-[1.666666666] tracking-[0.1em]">
            {product.size}
          </span>
        </div>
        <div className="absolute top-0 right-0 w-[27.5862068966%]">
          <Image
            src={product.image}
            alt=""
            width={398}
            height={1080}
            unoptimized
          />
        </div>
      </div>
      <div
        data-product-body
        className={`mt-[42px] min-h-[259px] border-b border-paper text-[1rem] leading-[1.571428571] tracking-[0.1em] le768:mt-[26px] le768:text-[0.875rem] ${bodyHeightClass}`}
      >
        <div className="font-bold">{product.title}</div>
        <div className="mt-5 le768:mt-[15px] le768:h-auto">
          {product.detail}
        </div>
      </div>
      <div className="mt-[21px] w-full text-[0.875rem] font-bold tracking-[0.1em] le768:mt-[18px] le768:flex le768:items-baseline le768:justify-between">
        <p>{product.setLabel}</p>
        <p>
          <span className="pr-1 text-[1.5rem] tracking-[0.1em]">
            {product.price}
          </span>
          {product.taxNote}
        </p>
      </div>
    </div>
  );
}

/** The width up to which the small-screen carousel is shown. */
const SMALL_SCREEN_QUERY = "(max-width: 768px)";

export function LineupSection() {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_QUERY);

  return (
    <section
      id="lineup"
      className="bg-ink py-[120px] text-paper le768:pt-[60px] le768:pb-[53px]"
    >
      <SectionTitle>{LINEUP_TITLE}</SectionTitle>
      <div data-small-carousels className="hidden le768:block">
        <div className={CAROUSEL_GAP_CLASS}>
          <ProductCarousel
            images={LINEUP_SLIDES}
            isActive={isSmallScreen}
            className="w-full"
          />
        </div>
      </div>
      <div data-wide-carousels className="block le768:hidden">
        <div className={`${CAROUSEL_GAP_CLASS} flex`}>
          {LINEUP_WIDE_GROUPS.map((group) => (
            <ProductCarousel
              key={group.join("-")}
              images={group.map((slide) => LINEUP_SLIDES[slide])}
              isActive={!isSmallScreen}
              className="w-[33.4%]"
            />
          ))}
        </div>
      </div>
      <Container>
        <div className="mt-[100px] flex flex-wrap justify-between le768:mt-0 le768:items-center">
          {LINEUP_PRODUCTS.map((product) => (
            <ProductCard key={product.variant} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
