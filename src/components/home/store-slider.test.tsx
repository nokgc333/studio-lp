import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StoreSlider } from "./store-slider";
import { DEFAULT_REGION, storesOf } from "./stores-content";

// These tests use the real Swiper, which only treats a SwiperSlide that is a
// direct child as a slide. A mocked Swiper would hide a slide put in the wrong place.
describe("StoreSlider (with the real Swiper)", () => {
  it("puts every store inside the slide wrapper", () => {
    const stores = storesOf(DEFAULT_REGION);
    const { container } = render(<StoreSlider stores={stores} />);

    const wrapper = container.querySelector(".swiper-wrapper") as HTMLElement;
    const slides = wrapper.querySelectorAll(":scope > .swiper-slide");

    // Looping adds copies of the slides, so there are at least as many as stores.
    expect(slides.length).toBeGreaterThanOrEqual(stores.length);
    expect(
      container.querySelectorAll(":scope > .swiper > .swiper-slide"),
    ).toHaveLength(0);
  });

  it("keeps the arrows and the button outside the slide wrapper", () => {
    const { container } = render(
      <StoreSlider stores={storesOf(DEFAULT_REGION)} />,
    );

    const wrapper = container.querySelector(".swiper-wrapper") as HTMLElement;

    expect(wrapper.querySelector("button")).toBeNull();
    expect(
      container.querySelector(".swiper > button.swiper-button-prev"),
    ).not.toBeNull();
  });

  it("does not let Swiper add its own arrow icon on top of the drawn arrows", () => {
    const { container } = render(
      <StoreSlider stores={storesOf(DEFAULT_REGION)} />,
    );

    for (const arrow of container.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next",
    )) {
      expect(arrow.querySelector("svg")).toBeNull();
    }
  });

  it("forces the arrow position and width over Swiper's own unlayered CSS", () => {
    const { container } = render(
      <StoreSlider stores={storesOf(DEFAULT_REGION)} />,
    );

    for (const arrow of container.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next",
    )) {
      expect(arrow).toHaveClass("top-1/4!", "w-[27px]!");
    }
  });
});
