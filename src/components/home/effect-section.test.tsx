import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  EFFECT_IMAGES,
  EFFECT_NOTE,
  EFFECT_POINTS,
  EFFECT_SLIDER_LABEL,
  EFFECT_TITLE_LINES,
  EFFECT_WIDE_MEDIA,
} from "./effect-content";
import { EffectSection } from "./effect-section";

function renderEffect() {
  const { container } = render(<EffectSection />);
  return container.querySelector("section#effect") as HTMLElement;
}

function slider() {
  return screen.getByRole("slider", { name: EFFECT_SLIDER_LABEL });
}

function beforePane(section: HTMLElement) {
  return section.querySelector("[data-before]") as HTMLElement;
}

describe("EffectSection", () => {
  it("has a level-2 heading made of two lines", () => {
    const section = renderEffect();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: EFFECT_TITLE_LINES.join(""),
      }),
    ).toBeInTheDocument();
    expect(section.querySelector("h2 br")).toHaveClass("hidden", "le768:block");
  });

  it("offers a slider from 0 to 100, set to the middle", () => {
    renderEffect();

    expect(slider()).toHaveAttribute("min", "0");
    expect(slider()).toHaveAttribute("max", "100");
    expect(slider()).toHaveValue("50");
  });

  it("covers the left part of the picture with the before picture at first", () => {
    const section = renderEffect();

    expect(beforePane(section)).toHaveClass(
      "border-r-[6px]",
      "le768:border-r-2",
    );
    expect(beforePane(section)).toHaveClass("w-[38.8%]", "le768:w-[35.5%]");
    expect(beforePane(section).getAttribute("style") ?? "").not.toContain(
      "width",
    );
  });

  it("sets the width of the before picture to the slider value", () => {
    const section = renderEffect();

    fireEvent.change(slider(), { target: { value: "70" } });

    expect(beforePane(section)).toHaveStyle({ width: "70%" });
  });

  it("takes the white edge away at both ends of the slider", () => {
    const section = renderEffect();

    // Only one of the two edge settings may be present, or the later rule wins.
    for (const atEnd of ["0", "100"]) {
      fireEvent.change(slider(), { target: { value: atEnd } });
      expect(beforePane(section)).toHaveClass("border-r-0");
      expect(beforePane(section)).not.toHaveClass("border-r-[6px]");
    }

    fireEvent.change(slider(), { target: { value: "30" } });
    expect(beforePane(section)).not.toHaveClass("border-r-0");
    expect(beforePane(section)).toHaveClass("border-r-[6px]");
  });

  it("switches both pictures by screen width", () => {
    const section = renderEffect();

    for (const [name, images] of [
      ["before", EFFECT_IMAGES.before],
      ["after", EFFECT_IMAGES.after],
    ] as const) {
      const picture = section.querySelector(
        `[data-${name}] picture`,
      ) as HTMLElement;

      expect(picture.querySelector("source")).toHaveAttribute(
        "media",
        EFFECT_WIDE_MEDIA,
      );
      expect(picture.querySelector("source")).toHaveAttribute(
        "srcset",
        images.pc,
      );
      expect(picture.querySelector("img")).toHaveAttribute("src", images.sp);
    }
  });

  it("explains the slider under it", () => {
    renderEffect();

    expect(screen.getByText(EFFECT_NOTE)).toBeInTheDocument();
  });

  it("lists the points, breaking a split one only on small screens", () => {
    const section = renderEffect();
    const paragraphs = section.querySelectorAll("[data-points] p");

    expect(paragraphs).toHaveLength(EFFECT_POINTS.length);
    EFFECT_POINTS.forEach((lines, index) => {
      expect(paragraphs[index]).toHaveTextContent(lines.join(""));
      if (lines.length > 1) {
        expect(paragraphs[index].querySelector("br")).toHaveClass(
          "hidden",
          "le575:block",
        );
      }
    });
  });

  it("puts the points on the brand gradient", () => {
    const section = renderEffect();

    expect(section.querySelector("[data-panel]")).toHaveClass(
      "bg-brand-diagonal",
    );
  });
});
