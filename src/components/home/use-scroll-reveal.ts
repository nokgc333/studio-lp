"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * True once the top of an element is more than `offset` pixels above the bottom
 * of the window. It stays true while the element scrolls on above the window.
 */
export function isRevealed(
  top: number,
  windowHeight: number,
  offset: number,
): boolean {
  return top < windowHeight - offset;
}

/**
 * Says whether the page has been scrolled far enough for the element to be
 * shown. It turns false again when the page is scrolled back above that point.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  offset: number,
): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    function measure() {
      const element = ref.current;
      if (!element) return;
      setRevealed(
        isRevealed(
          element.getBoundingClientRect().top,
          window.innerHeight,
          offset,
        ),
      );
    }

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ref, offset]);

  return revealed;
}
