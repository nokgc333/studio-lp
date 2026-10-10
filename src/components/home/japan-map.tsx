"use client";

import Image from "next/image";
import { useState } from "react";

import { MAP_BLOCKS, REGIONS, STORES_MAP_IMAGE } from "./stores-content";
import type { RegionId } from "./stores-content";

type JapanMapProps = {
  selected: RegionId;
  onSelect: (region: RegionId) => void;
};

/**
 * The map: blocks for the parts of the country, a label button for each
 * region, and a picture above. A region lights up under the pointer and stays
 * lit once chosen.
 */
export function JapanMap({ selected, onSelect }: JapanMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-1/2 le768:w-[63%] le768:min-w-[335px]">
      <div className="absolute top-[12.7%] left-[-8%] flex w-[60%] flex-col items-center le768:top-[12.2%] le768:left-0 le768:w-1/2">
        <div
          aria-hidden="true"
          className="h-[17px] w-full bg-ink [mask:url(/images/placeholder/logo.svg)_no-repeat_center/contain]"
        />
        <Image
          src={STORES_MAP_IMAGE}
          alt=""
          width={312}
          height={218}
          unoptimized
          className="mt-[10%] w-[56%] le768:w-[65%]"
        />
      </div>
      <svg
        viewBox="0 0 460 490"
        aria-hidden="true"
        className="block w-full"
        fill="none"
      >
        {MAP_BLOCKS.map((block) => {
          const isChosen = block.region === selected;
          const isHovered = hovered === block.id;
          return (
            <rect
              key={block.id}
              data-block={block.id}
              data-state={
                isChosen ? "chosen" : isHovered ? "active" : undefined
              }
              x={block.x}
              y={block.y}
              width={block.width}
              height={block.height}
              rx={10}
              className={`cursor-pointer transition-[fill] duration-300 ${
                isChosen || isHovered ? "fill-[#dbff00]" : "fill-[#d2dfd5]"
              }`}
              onMouseEnter={() => setHovered(block.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(block.region)}
            />
          );
        })}
      </svg>
      {REGIONS.map((region) => (
        <button
          key={region.id}
          type="button"
          aria-pressed={region.id === selected}
          onClick={() => onSelect(region.id)}
          className={`absolute text-[clamp(0.875rem,_0.831rem_+_0.1878vw,_1rem)] font-bold [text-shadow:none] ${region.labelClass}`}
        >
          {region.label}
        </button>
      ))}
    </div>
  );
}
