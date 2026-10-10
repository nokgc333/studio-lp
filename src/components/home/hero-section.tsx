import Image from "next/image";

import { Container } from "@/components/layout/container";

import { HERO_CATCH_ALT, HERO_LOGO_ALT, HERO_TEXT } from "./hero-content";

/** Fluid space above and below the content, growing with the screen width. */
const SECTION_CLASS =
  "relative w-full bg-[url(/images/placeholder/hero-bg.svg)] bg-cover bg-center bg-no-repeat pt-[clamp(2.5rem,_0.7394rem_+_7.5117vw,_7.5rem)] pb-[clamp(3rem,_-0.3891rem_+_14.4601vw,_12.625rem)]";

export function HeroSection() {
  return (
    <section id="hero" className={SECTION_CLASS}>
      <Container width="wide">
        <h1 className="h-[30px] w-[425px] le768:mx-auto le575:w-full">
          <Image
            src="/images/placeholder/logo.svg"
            alt={HERO_LOGO_ALT}
            width={425}
            height={30}
            priority
            unoptimized
          />
        </h1>
        <div
          data-hero-wrapper
          className="h-full w-full le768:flex le768:flex-col-reverse le768:items-center"
        >
          <div className="mt-[152px] w-[58.4%] le768:-mt-[18px] le768:w-full">
            <div className="relative h-[268px] w-full le768:h-[120px]">
              <Image
                src="/images/placeholder/hero-catch.svg"
                alt={HERO_CATCH_ALT}
                width={748}
                height={119}
                priority
                unoptimized
                className="absolute h-full w-full"
              />
            </div>
            <p className="mt-6 w-full text-left text-[1.5rem] leading-[1.44791667] font-medium tracking-[0.1em] text-paper [text-shadow:0_0_8px_rgba(2,0,102,0.6)] le575:mt-4 le575:text-[1.125rem] le575:tracking-[inherit]">
              {HERO_TEXT}
            </p>
          </div>
          <div
            data-model-slot
            aria-hidden="true"
            className="absolute top-[9.5%] right-[12.5%] h-[84%] w-1/4 rotate-[17deg] le768:static le768:mt-10 le768:h-[320px] le768:w-1/2"
          />
        </div>
      </Container>
    </section>
  );
}
