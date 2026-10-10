import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useScrollReveal = vi.hoisted(() => vi.fn<() => boolean>());
vi.mock("./use-scroll-reveal", () => ({ useScrollReveal }));

import {
  FEATURE_CATCH_IMAGE,
  FEATURE_ITEM_IMAGE,
  FEATURE_TILES,
  FEATURE_WIDE_MEDIA,
} from "./feature-content";
import { FeatureSection } from "./feature-section";

function renderFeature() {
  const { container } = render(<FeatureSection />);
  return container.querySelector("section#feature") as HTMLElement;
}

function circles(section: HTMLElement) {
  return [...section.querySelectorAll("[data-circle]")] as HTMLElement[];
}

beforeEach(() => {
  useScrollReveal.mockReturnValue(false);
});

describe("FeatureSection", () => {
  it("is anchored as #feature", () => {
    expect(renderFeature()).toBeInTheDocument();
  });

  it("lays four pictures out as a mosaic", () => {
    const section = renderFeature();
    const tiles = section.querySelectorAll("[data-tile]");

    expect(tiles).toHaveLength(FEATURE_TILES.length);
  });

  it("switches each picture by screen width", () => {
    const section = renderFeature();

    for (const tile of FEATURE_TILES) {
      const picture = section.querySelector(
        `[data-tile="${tile.id}"] picture`,
      ) as HTMLElement;

      expect(picture.querySelector("source")).toHaveAttribute(
        "media",
        FEATURE_WIDE_MEDIA,
      );
      expect(picture.querySelector("source")).toHaveAttribute(
        "srcset",
        tile.pc,
      );
      expect(picture.querySelector("img")).toHaveAttribute("src", tile.sp);
      expect(picture.querySelector("img")).toHaveAttribute("alt", "");
    }
  });

  it("stacks the mosaic in one column on small screens", () => {
    const section = renderFeature();

    expect(section.querySelector("[data-mosaic]")).toHaveClass(
      "le575:flex-col",
    );
    expect(section.querySelector("[data-mosaic] > div")).toHaveClass(
      "le575:flex-col-reverse",
    );
  });

  it("puts a circle over each picture", () => {
    expect(circles(renderFeature())).toHaveLength(FEATURE_TILES.length);
  });

  it("keeps the circles closed until the page is scrolled to them", () => {
    for (const circle of circles(renderFeature())) {
      expect(circle.className).toContain(
        "[clip-path:circle(0_at_var(--cx)_var(--cy))]",
      );
      expect(circle).not.toHaveClass("motion-safe:animate-circle-in");
    }
  });

  it("opens the circles when the page is scrolled to them", () => {
    useScrollReveal.mockReturnValue(true);

    for (const circle of circles(renderFeature())) {
      expect(circle).toHaveClass("motion-safe:animate-circle-in");
      expect(circle.className).not.toContain("[clip-path:circle(0_at");
    }
  });

  it("shows the circles open at once when the visitor prefers less motion", () => {
    useScrollReveal.mockReturnValue(true);

    for (const circle of circles(renderFeature())) {
      expect(circle.className).toContain(
        "motion-reduce:[clip-path:circle(var(--cr)_at_var(--cx)_var(--cy))]",
      );
    }
  });

  it("gives each circle its own centre and size for wide and small screens", () => {
    const section = renderFeature();

    for (const tile of FEATURE_TILES) {
      const circle = section.querySelector(
        `[data-circle="${tile.id}"]`,
      ) as HTMLElement;
      const { pc, sp } = tile.circle;

      expect(circle.style.getPropertyValue("--cx-pc")).toBe(pc.x);
      expect(circle.style.getPropertyValue("--cy-pc")).toBe(pc.y);
      expect(circle.style.getPropertyValue("--cr-pc")).toBe(pc.radius);
      expect(circle.style.getPropertyValue("--cx-sp")).toBe(sp.x);
      expect(circle.style.getPropertyValue("--cr-sp")).toBe(sp.radius);
    }
  });

  it("shows the item picture on top, rising into view", () => {
    const section = renderFeature();
    const item = section.querySelector("[data-item]") as HTMLElement;

    expect(item.querySelector("img")).toHaveAttribute(
      "src",
      FEATURE_ITEM_IMAGE,
    );
    expect(item).toHaveClass("absolute", "z-[100]");
    expect(item).toHaveClass("motion-safe:transition-[opacity,translate]");
  });

  it("shows the catch copy picture on top as well", () => {
    const title = renderFeature().querySelector("[data-catch]") as HTMLElement;

    expect(title.querySelector("img")).toHaveAttribute(
      "src",
      FEATURE_CATCH_IMAGE,
    );
    expect(title).toHaveClass("absolute", "z-[100]");
  });

  it("tints the mosaic with a blended colour layer", () => {
    expect(renderFeature().querySelector("[data-mosaic]")?.className).toContain(
      "after:mix-blend-difference",
    );
  });
});
