"use client";

import { useMediaQuery } from "./use-media-query";

/** True when the visitor asked the system for less motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
