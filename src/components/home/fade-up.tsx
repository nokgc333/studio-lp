"use client";

import { useRef } from "react";
import type { ComponentProps } from "react";

import { useIsMounted } from "./use-media-query";
import { useScrollReveal } from "./use-scroll-reveal";

/** The distance from the bottom of the window at which the content starts to rise. */
const TRIGGER_OFFSET_PX = 120;

/**
 * Content that rises into view and fades in when the page is scrolled to it.
 * Nothing is hidden on the server or when the visitor prefers less motion.
 */
export function FadeUp({ className = "", ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();
  const isRevealed = useScrollReveal(ref, TRIGGER_OFFSET_PX);
  const state =
    isMounted && !isRevealed
      ? "motion-safe:translate-y-[100px] motion-safe:opacity-0"
      : "motion-safe:translate-y-0 motion-safe:opacity-100";

  return (
    <div
      ref={ref}
      className={`${className} ${state} motion-safe:transition-[opacity,translate] motion-safe:duration-[800ms] motion-safe:ease-[ease]`.trim()}
      {...props}
    />
  );
}
