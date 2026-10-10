import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { activeBlockId, useScrollActive } from "./use-scroll-active";

type Rect = { top: number; bottom: number };

function mountBlocks(rects: Record<string, Rect>) {
  for (const [id, rect] of Object.entries(rects)) {
    const element = document.createElement("div");
    element.id = id;
    element.getBoundingClientRect = () => ({ ...rect }) as DOMRect;
    document.body.append(element);
  }
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("activeBlockId", () => {
  const LINE = 300;

  it("picks the block that crosses the line", () => {
    const result = activeBlockId(
      [
        { id: "a", top: -900, bottom: 100 },
        { id: "b", top: 100, bottom: 1000 },
        { id: "c", top: 1000, bottom: 1900 },
      ],
      LINE,
    );

    expect(result).toBe("b");
  });

  it("picks nothing while every block is below the line", () => {
    expect(
      activeBlockId([{ id: "a", top: 400, bottom: 1300 }], LINE),
    ).toBeNull();
  });

  it("picks nothing once every block is above the line", () => {
    expect(
      activeBlockId([{ id: "a", top: -900, bottom: 200 }], LINE),
    ).toBeNull();
  });

  it("treats a block whose top is exactly on the line as not yet reached", () => {
    expect(
      activeBlockId([{ id: "a", top: 300, bottom: 1200 }], LINE),
    ).toBeNull();
  });
});

describe("useScrollActive", () => {
  it("starts with nothing active until the page is measured", () => {
    mountBlocks({ a: { top: 500, bottom: 1400 } });

    const { result } = renderHook(() => useScrollActive(["a"]));

    expect(result.current).toBeNull();
  });

  it("follows the scroll position", () => {
    mountBlocks({ a: { top: 100, bottom: 1000 } });
    const { result } = renderHook(() => useScrollActive(["a"]));

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe("a");
  });

  it("stops listening when the component goes away", () => {
    mountBlocks({ a: { top: 500, bottom: 1400 } });
    const { result, unmount } = renderHook(() => useScrollActive(["a"]));
    unmount();

    // The block now crosses the line, but nobody is listening any more.
    const element = document.getElementById("a") as HTMLElement;
    element.getBoundingClientRect = () =>
      ({ top: 100, bottom: 1000 }) as DOMRect;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBeNull();
  });
});
