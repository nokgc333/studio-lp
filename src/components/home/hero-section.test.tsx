import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HERO_CATCH_ALT, HERO_LOGO_ALT, HERO_TEXT } from "./hero-content";
import { HeroSection } from "./hero-section";

function renderHero() {
  const { container } = render(<HeroSection />);
  return container.querySelector("section#hero") as HTMLElement;
}

describe("HeroSection", () => {
  it("is anchored as #hero", () => {
    expect(renderHero()).toBeInTheDocument();
  });

  it("makes the logo the level-1 heading of the page", () => {
    renderHero();

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toContainElement(
      screen.getByRole("img", { name: HERO_LOGO_ALT }),
    );
  });

  it("shows the catch copy as a picture with a text alternative", () => {
    renderHero();

    const catchCopy = screen.getByRole("img", { name: HERO_CATCH_ALT });

    expect(catchCopy.getAttribute("src")).toContain("hero-catch");
  });

  it("shows the lead text", () => {
    expect(renderHero()).toHaveTextContent(HERO_TEXT);
  });

  it("keeps a slot for the 3D picture, which the layout positions", () => {
    const slot = renderHero().querySelector("[data-model-slot]");

    expect(slot).toBeInTheDocument();
    expect(slot).toHaveClass("absolute", "le768:static");
  });

  it("stacks the text below the picture on small screens", () => {
    const wrapper = renderHero().querySelector("[data-hero-wrapper]");

    expect(wrapper).toHaveClass("le768:flex-col-reverse");
  });

  it("spaces its content with fluid padding", () => {
    expect(renderHero().className).toContain("clamp(");
  });

  it("keeps the lead text white with a soft shadow", () => {
    const text =
      screen.queryByText(HERO_TEXT) ?? renderHero().querySelector("p");

    expect(text).toHaveClass("text-paper", "font-medium");
  });
});
