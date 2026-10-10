"use client";

import { useEffect, useState } from "react";

/** Distance from the top of the window at which a block counts as the current one. */
const ACTIVE_LINE_PX = 300;

type BlockPosition = { id: string; top: number; bottom: number };

/**
 * The block that spans the line: it has started above the line (top < line)
 * and has not ended yet (bottom > line). Null when no block does.
 */
export function activeBlockId(
  blocks: readonly BlockPosition[],
  line: number,
): string | null {
  const active = blocks.find(
    (block) => block.top < line && block.bottom > line,
  );
  return active?.id ?? null;
}

/** Follows the scroll position and says which of the blocks (by id) is current. */
export function useScrollActive(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  // A stable key, so passing a new array each render does not re-subscribe.
  const key = ids.join("|");

  useEffect(() => {
    const idList = key.split("|");

    function measure() {
      const blocks = idList.flatMap((id) => {
        const element = document.getElementById(id);
        if (!element) return [];
        const { top, bottom } = element.getBoundingClientRect();
        return [{ id, top, bottom }];
      });
      setActive(activeBlockId(blocks, ACTIVE_LINE_PX));
    }

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [key]);

  return active;
}
