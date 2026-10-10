import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Props = Record<string, unknown> & { children?: ReactNode };
const carousels = vi.hoisted(() => ({ list: [] as Record<string, unknown>[] }));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/effect-creative", () => ({}));
vi.mock("swiper/modules", () => ({
  Autoplay: "Autoplay",
  EffectCreative: "EffectCreative",
  Parallax: "Parallax",
}));
vi.mock("swiper/react", () => ({
  Swiper: ({ children, ...props }: Props) => {
    carousels.list.push(props);
    return <div data-carousel>{children}</div>;
  },
  SwiperSlide: ({ children }: Props) => <div data-slide>{children}</div>,
}));

import {
  LINEUP_PRODUCTS,
  LINEUP_SLIDES,
  LINEUP_TITLE,
  LINEUP_WIDE_GROUPS,
} from "./lineup-content";
import { LineupSection } from "./lineup-section";

function renderLineup() {
  const { container } = render(<LineupSection />);
  return container.querySelector("section#lineup") as HTMLElement;
}

function mockScreen({
  isReduced = false,
  isSmall = false,
}: { isReduced?: boolean; isSmall?: boolean } = {}) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("reduce") ? isReduced : isSmall,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  carousels.list.length = 0;
  mockScreen();
});

afterEach(() => {
  carousels.list.length = 0;
});

describe("LineupSection", () => {
  it("has a level-2 heading", () => {
    renderLineup();

    expect(
      screen.getByRole("heading", { level: 2, name: LINEUP_TITLE }),
    ).toBeInTheDocument();
  });

  it("has a black background with white text", () => {
    expect(renderLineup()).toHaveClass("bg-ink", "text-paper");
  });

  it("shows all six pictures in one carousel on small screens", () => {
    const section = renderLineup();
    const small = section.querySelector(
      "[data-small-carousels]",
    ) as HTMLElement;

    expect(small).toHaveClass("hidden", "le768:block");
    expect(
      [...small.querySelectorAll(".swiper-slide img")].map((img) =>
        img.getAttribute("src"),
      ),
    ).toEqual([...LINEUP_SLIDES]);
  });

  it("shows two pictures in each of three carousels on wide screens", () => {
    const section = renderLineup();
    const wide = section.querySelector("[data-wide-carousels]") as HTMLElement;

    expect(wide).toHaveClass("block", "le768:hidden");
    // A running carousel (mocked here) and a still one are both one group.
    const groups = [...wide.querySelectorAll(".swiper, [data-carousel]")];
    expect(groups).toHaveLength(LINEUP_WIDE_GROUPS.length);
    groups.forEach((group, index) => {
      expect(
        [...group.querySelectorAll("img")].map((img) =>
          img.getAttribute("src"),
        ),
      ).toEqual(LINEUP_WIDE_GROUPS[index].map((slide) => LINEUP_SLIDES[slide]));
    });
  });

  it("runs only the carousels that fit the current screen", () => {
    mockScreen({ isSmall: false });
    renderLineup();
    expect(carousels.list).toHaveLength(LINEUP_WIDE_GROUPS.length);

    carousels.list.length = 0;
    mockScreen({ isSmall: true });
    renderLineup();
    expect(carousels.list).toHaveLength(1);
  });

  it("shows still pictures in the carousels that are not running", () => {
    mockScreen({ isSmall: true });
    const section = renderLineup();
    const wide = section.querySelector("[data-wide-carousels]") as HTMLElement;

    expect(wide.querySelectorAll("[data-carousel]")).toHaveLength(0);
    expect(wide.querySelectorAll(".swiper-slide img").length).toBeGreaterThan(
      0,
    );
  });

  it("slides with the creative effect, looping, and no touch dragging", () => {
    renderLineup();

    expect(carousels.list.length).toBeGreaterThan(0);
    for (const props of carousels.list) {
      expect(props).toMatchObject({
        loop: true,
        effect: "creative",
        speed: 1500,
        allowTouchMove: false,
        parallax: true,
      });
      expect(props.modules).toEqual(["Autoplay", "EffectCreative", "Parallax"]);
    }
  });

  it("changes pictures by itself every 2.5 seconds, even after a visitor touches it", () => {
    renderLineup();

    for (const props of carousels.list) {
      expect(props.autoplay).toEqual({
        delay: 2500,
        disableOnInteraction: false,
      });
    }
  });

  it("does not change pictures by itself when the visitor prefers less motion", () => {
    mockScreen({ isReduced: true });
    renderLineup();

    expect(carousels.list.length).toBeGreaterThan(0);
    for (const props of carousels.list) {
      expect(props.autoplay).toBe(false);
    }
  });

  it("describes each product in a card", () => {
    const section = renderLineup();
    const cards = section.querySelectorAll("[data-product]");

    expect(cards).toHaveLength(LINEUP_PRODUCTS.length);
    LINEUP_PRODUCTS.forEach((product, index) => {
      const card = within(cards[index] as HTMLElement);

      expect(card.getByText(product.title)).toBeInTheDocument();
      expect(card.getByText(product.detail)).toBeInTheDocument();
      expect(card.getByText(product.price)).toBeInTheDocument();
      expect(card.getByText(product.setLabel)).toBeInTheDocument();
    });
  });

  it("writes the English name on three lines", () => {
    const section = renderLineup();
    const [first] = LINEUP_PRODUCTS;
    const name = section.querySelector(
      "[data-product] [data-name]",
    ) as HTMLElement;

    expect(name).toHaveTextContent(first.nameLines.join(""));
    expect(name.querySelectorAll("br")).toHaveLength(
      first.nameLines.length - 1,
    );
  });

  it("gives the third card's text box its own minimum height on small screens", () => {
    const section = renderLineup();
    const boxes = [...section.querySelectorAll("[data-product-body]")];

    // One minimum height per box: with two, the later rule would win.
    expect(boxes[0]).toHaveClass("le768:min-h-[193px]");
    expect(boxes[0]).not.toHaveClass("le768:min-h-[171px]");
    expect(boxes[2]).toHaveClass("le768:min-h-[171px]");
    expect(boxes[2]).not.toHaveClass("le768:min-h-[193px]");
  });

  it("sizes the price and the size note by font size only, keeping the line height", () => {
    const section = renderLineup();

    for (const span of section.querySelectorAll("[data-product] span")) {
      expect(span.className).not.toContain("text-2xl");
      expect(span.className).toContain("text-[1.5rem]");
    }
  });

  it("keeps the product pictures decorative", () => {
    const section = renderLineup();

    for (const image of section.querySelectorAll("[data-product] img")) {
      expect(image).toHaveAttribute("alt", "");
    }
  });
});
