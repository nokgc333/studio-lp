import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { isRevealed, useScrollReveal } from "./use-scroll-reveal";

describe("isRevealed", () => {
  const WINDOW_HEIGHT = 800;

  it("is true once the top of the element is far enough above the bottom of the window", () => {
    expect(isRevealed(600, WINDOW_HEIGHT, 120)).toBe(true);
  });

  it("is false while the top is closer to the bottom than the offset", () => {
    expect(isRevealed(700, WINDOW_HEIGHT, 120)).toBe(false);
  });

  it("is false while the element is below the window", () => {
    expect(isRevealed(900, WINDOW_HEIGHT, 120)).toBe(false);
  });

  it("stays true after the element has scrolled out above the window", () => {
    expect(isRevealed(-1500, WINDOW_HEIGHT, 120)).toBe(true);
  });

  it("is false exactly on the trigger line", () => {
    expect(isRevealed(680, WINDOW_HEIGHT, 120)).toBe(false);
  });
});

function elementAt(top: number): HTMLElement {
  const element = document.createElement("div");
  element.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.append(element);
  return element;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useScrollReveal", () => {
  it("starts hidden until the element is measured", () => {
    const element = elementAt(5000);

    const { result } = renderHook(() =>
      useScrollReveal({ current: element }, 80),
    );

    expect(result.current).toBe(false);
  });

  it("is revealed when the element is already in view", () => {
    const element = elementAt(100);

    const { result } = renderHook(() =>
      useScrollReveal({ current: element }, 80),
    );

    expect(result.current).toBe(true);
  });

  it("is revealed once the page is scrolled to the element", () => {
    let top = 5000;
    const element = document.createElement("div");
    element.getBoundingClientRect = () => ({ top }) as DOMRect;
    const { result } = renderHook(() =>
      useScrollReveal({ current: element }, 80),
    );

    top = 100;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("hides again when the page is scrolled back above the trigger line", () => {
    let top = 100;
    const element = document.createElement("div");
    element.getBoundingClientRect = () => ({ top }) as DOMRect;
    const { result } = renderHook(() =>
      useScrollReveal({ current: element }, 80),
    );

    top = 5000;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(false);
  });
});
