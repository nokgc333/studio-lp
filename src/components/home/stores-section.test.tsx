import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

type Props = Record<string, unknown> & { children?: ReactNode };
const sliders = vi.hoisted(() => ({ list: [] as Record<string, unknown>[] }));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));
vi.mock("swiper/modules", () => ({ Navigation: "Navigation" }));
vi.mock("swiper/react", () => ({
  Swiper: ({ children, ...props }: Props) => {
    sliders.list.push(props);
    return <div data-slider>{children}</div>;
  },
  SwiperSlide: ({ children }: Props) => <div data-slide>{children}</div>,
}));

import {
  DEFAULT_REGION,
  MAP_BLOCKS,
  REGIONS,
  STORES_BUTTON_LABEL,
  STORES_TITLE_LINES,
  storesOf,
} from "./stores-content";
import { StoresSection } from "./stores-section";

function renderStores() {
  const { container } = render(<StoresSection />);
  return container.querySelector("section#stores") as HTMLElement;
}

function regionButton(label: string) {
  return screen.getByRole("button", { name: label });
}

beforeEach(() => {
  sliders.list.length = 0;
});

describe("StoresSection", () => {
  it("has a level-2 heading made of two lines", () => {
    const section = renderStores();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: STORES_TITLE_LINES.join(""),
      }),
    ).toBeInTheDocument();
    expect(section.querySelector("h2 br")).toHaveClass("hidden", "le768:block");
  });

  it("labels every region of the map with a button", () => {
    renderStores();

    for (const region of REGIONS) {
      expect(regionButton(region.label)).toBeInTheDocument();
    }
  });

  it("starts with the default region selected", () => {
    renderStores();
    const first = REGIONS.find((region) => region.id === DEFAULT_REGION)!;

    expect(regionButton(first.label)).toHaveAttribute("aria-pressed", "true");
    for (const region of REGIONS.filter((item) => item.id !== DEFAULT_REGION)) {
      expect(regionButton(region.label)).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    }
  });

  it("selects a region when its label is pressed, and only that one", () => {
    renderStores();

    fireEvent.click(regionButton("関東"));

    expect(regionButton("関東")).toHaveAttribute("aria-pressed", "true");
    expect(regionButton("北海道・東北")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("selects a region when its block on the map is clicked", () => {
    const section = renderStores();

    fireEvent.click(section.querySelector('[data-block="kansai"]') as Element);

    expect(regionButton("関西")).toHaveAttribute("aria-pressed", "true");
  });

  it("selects the region of an unlabelled block, such as the far south", () => {
    const section = renderStores();

    fireEvent.click(section.querySelector('[data-block="okinawa"]') as Element);

    expect(regionButton("九州・沖縄")).toHaveAttribute("aria-pressed", "true");
  });

  it("draws a block for every part of the map", () => {
    const section = renderStores();

    expect(section.querySelectorAll("[data-block]")).toHaveLength(
      MAP_BLOCKS.length,
    );
  });

  it("lights a block while the pointer is over it", () => {
    const section = renderStores();
    const block = section.querySelector('[data-block="kanto"]') as Element;

    fireEvent.mouseEnter(block);
    expect(block).toHaveAttribute("data-state", "active");

    fireEvent.mouseLeave(block);
    expect(block).not.toHaveAttribute("data-state", "active");
  });

  it("marks the blocks of the selected region as chosen", () => {
    const section = renderStores();

    fireEvent.click(regionButton("九州・沖縄"));

    expect(section.querySelector('[data-block="kyusyu"]')).toHaveAttribute(
      "data-state",
      "chosen",
    );
    expect(section.querySelector('[data-block="okinawa"]')).toHaveAttribute(
      "data-state",
      "chosen",
    );
    expect(section.querySelector('[data-block="kanto"]')).not.toHaveAttribute(
      "data-state",
      "chosen",
    );
  });

  it("shows the stores of the selected region in a slider", () => {
    const section = renderStores();
    const stores = storesOf(DEFAULT_REGION);

    expect(section.querySelectorAll("[data-slide]")).toHaveLength(
      stores.length,
    );
    stores.forEach((store, index) => {
      const slide = within(
        section.querySelectorAll("[data-slide]")[index] as HTMLElement,
      );

      expect(slide.getByText(store.address)).toBeInTheDocument();
      expect(slide.getByText(store.tel)).toBeInTheDocument();
      expect(slide.getByRole("link", { name: store.url })).toBeInTheDocument();
    });
  });

  it("starts the slider again from the first store when another region is chosen", () => {
    renderStores();
    const before = sliders.list.length;

    fireEvent.click(regionButton("北陸"));

    expect(sliders.list.length).toBeGreaterThan(before);
  });

  it("moves the slider with a previous and a next button", () => {
    const section = renderStores();

    expect(
      within(section).getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(
      within(section).getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
    expect(sliders.list[0]).toMatchObject({ loop: true, slidesPerView: 1 });
    // The arrows are drawn by CSS, so Swiper must not add an icon of its own.
    expect(sliders.list.at(-1)?.navigation).toMatchObject({ addIcons: false });
    expect(sliders.list[0].modules).toEqual(["Navigation"]);
  });

  it("keeps the store pictures decorative", () => {
    const section = renderStores();

    for (const image of section.querySelectorAll("[data-slide] img")) {
      expect(image).toHaveAttribute("alt", "");
    }
  });

  it("offers the distance button, which the design shows", () => {
    renderStores();

    expect(
      screen.getByRole("button", { name: STORES_BUTTON_LABEL }),
    ).toBeInTheDocument();
  });

  it("puts the slider under the map on small screens", () => {
    const section = renderStores();

    expect(section.querySelector("[data-card]")).toHaveClass(
      "le768:flex-col-reverse",
    );
  });
});
