"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Container } from "@/components/layout/container";

import {
  CONCEPT_PRODUCTS,
  CONCEPT_TITLE_ALT,
  CONCEPT_TITLE_IMAGE,
  CONCEPT_WIDE_MEDIA,
} from "./concept-content";
import type { ConceptProduct, ConceptVariant } from "./concept-content";
import { useScrollActive } from "./use-scroll-active";

/** A page-sized background that stays put while the page scrolls past it. */
const SECTION_CLASS =
  "relative py-[60px] le768:py-[30px] before:fixed before:top-0 before:bottom-0 before:-z-10 before:min-h-screen before:w-full before:bg-[#333] before:bg-[url(/images/placeholder/concept-bg.svg)] before:bg-cover before:bg-center before:bg-no-repeat before:bg-blend-multiply before:content-['']";

const TITLE_CLASS =
  "sticky top-[60px] mt-[60px] mr-[3%] inline-block h-full w-[7.5%] le768:top-[30px] le768:mt-[30px] le768:w-[16.3%] le375:w-[24.3%]";

const NAME_CLASS =
  "sticky top-[60px] mt-[60px] w-auto motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-in-out le768:top-[30px] le768:mt-[30px]";

/** From the second product on, the name picture is pushed in from the left. */
const NAME_INDENT_CLASS: Record<ConceptVariant, string> = {
  mixed: "",
  green: "pl-[9%] le768:pl-[24%]",
  hot: "pl-[9%] le768:pl-[24%]",
};

const TAG_CLASS =
  "inline-flex h-[60px] w-[18.75rem] min-w-[240px] items-center justify-center rounded-[10px] text-[clamp(1rem,_0.912rem_+_0.3756vw,_1.25rem)] leading-[1.8] font-bold text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.4)] le768:mt-5 le768:h-[50px] le768:w-full";

const TAG_COLOUR_CLASS: Record<ConceptVariant, string> = {
  mixed:
    "bg-[linear-gradient(125.88deg,var(--color-primary)_-1.47%,var(--color-secondary)_50.9%,var(--color-highlight)_100.83%)]",
  green: "bg-[linear-gradient(90deg,#03b10f_0%,#3cffb9_27.69%,#e7f91b_56.55%)]",
  hot: "bg-[linear-gradient(90deg,#b00202_0%,#ff8a00_29.18%,#e83a54_58.97%)]",
};

const TITLE_TEXT_CLASS: Record<ConceptVariant, string> = {
  mixed: "",
  green: "",
  hot: "tracking-[0.02em] le768:tracking-[0.1em]",
};

function ProductName({
  product,
  isActive,
}: {
  product: ConceptProduct;
  isActive: boolean;
}) {
  return (
    <div
      data-name={product.id}
      className={`${NAME_CLASS} ${NAME_INDENT_CLASS[product.variant]} ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <picture>
        <source srcSet={product.nameImage.pc} media={CONCEPT_WIDE_MEDIA} />
        {/* A plain img inside picture: the source above swaps the picture by width. */}
        <img src={product.nameImage.sp} alt="" />
      </picture>
    </div>
  );
}

function ProductBlock({ product }: { product: ConceptProduct }) {
  return (
    <div
      id={product.id}
      className="w-[69.5%] py-[61px] text-paper le768:w-[80.6%] le768:py-[30px]"
    >
      <div className="relative">
        <Image
          src={product.image}
          alt=""
          width={398}
          height={1080}
          unoptimized
          className="mx-auto w-[30.9%] pt-[clamp(2.25rem,_1.1056rem_+_4.8826vw,_5.5rem)] le768:w-[28.9%]"
        />
      </div>
      <div
        className={`mt-[55px] text-center text-[clamp(1.625rem,_1.2729rem_+_1.5023vw,_2.625rem)] leading-[0.952380952] font-medium tracking-[0.1em] le768:mx-auto le768:mt-[19.5px] le768:w-[93%] le768:leading-[1.538461538] ${TITLE_TEXT_CLASS[product.variant]}`}
      >
        {product.titleLines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br className="hidden le768:block" />}
            {line}
          </Fragment>
        ))}
      </div>
      <div className="mt-[35px] text-[clamp(1.125rem,_0.993rem_+_0.5634vw,_1.5rem)] tracking-[0.1em] le768:mt-2">
        {product.text}
      </div>
      <div className="mt-[52.5px] flex justify-between gap-[4.2%] le768:mt-2 le768:flex-col le768:items-center">
        {product.buttons.map((label) => (
          <div
            key={label}
            className={`${TAG_CLASS} ${TAG_COLOUR_CLASS[product.variant]}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

const PRODUCT_IDS = CONCEPT_PRODUCTS.map((product) => product.id);

export function ConceptSection() {
  const activeId = useScrollActive(PRODUCT_IDS);

  return (
    <section id="concept" className={SECTION_CLASS}>
      <Container>
        <div className="flex w-full justify-between">
          <h2 className={TITLE_CLASS}>
            <Image
              src={CONCEPT_TITLE_IMAGE}
              alt={CONCEPT_TITLE_ALT}
              width={48}
              height={680}
              unoptimized
            />
          </h2>
          <div>
            {CONCEPT_PRODUCTS.map((product) => (
              <div key={product.id}>
                <div className="flex justify-between">
                  <div className="w-[27%] le768:w-[12.4%]">
                    <ProductName
                      product={product}
                      isActive={activeId === product.id}
                    />
                  </div>
                  <ProductBlock product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
