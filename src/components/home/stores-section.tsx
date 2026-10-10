"use client";

import { Fragment, useState } from "react";

import { JapanMap } from "./japan-map";
import { SectionTitle } from "./section-title";
import { StoreSlider } from "./store-slider";
import { DEFAULT_REGION, STORES_TITLE_LINES, storesOf } from "./stores-content";
import type { RegionId } from "./stores-content";

export function StoresSection() {
  const [region, setRegion] = useState<RegionId>(DEFAULT_REGION);

  return (
    <section id="stores" className="bg-surface py-[120px] le768:py-[60px]">
      <div className="mx-auto max-w-[1040px] px-5 le768:max-w-full le768:px-0">
        <SectionTitle>
          {STORES_TITLE_LINES.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br className="hidden le768:block" />}
              {line}
            </Fragment>
          ))}
        </SectionTitle>
        <div
          data-card
          className="relative mt-[clamp(2.5rem,_1.6197rem_+_3.7559vw,_5rem)] flex w-full items-center justify-between gap-[8%] rounded-2xl bg-paper p-10 shadow-[0_0_30px_0_rgba(0,0,0,0.102)] le768:flex-col-reverse le768:items-center le768:gap-7 le768:rounded-none le768:px-5 le768:py-10 le768:shadow-none"
        >
          <StoreSlider key={region} stores={storesOf(region)} />
          <JapanMap selected={region} onSelect={setRegion} />
        </div>
      </div>
    </section>
  );
}
