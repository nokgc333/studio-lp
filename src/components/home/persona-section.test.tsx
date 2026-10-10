import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PERSONA_ITEMS, PERSONA_TITLE } from "./persona-content";
import { PersonaSection } from "./persona-section";

function renderPersona() {
  const { container } = render(<PersonaSection />);
  return container.querySelector("section#persona") as HTMLElement;
}

function circleOf(section: HTMLElement, index: number): HTMLElement {
  return section.querySelectorAll("[data-circle]")[index] as HTMLElement;
}

describe("PersonaSection", () => {
  it("is anchored as #persona with a level-2 heading", () => {
    renderPersona();

    expect(
      screen.getByRole("heading", { level: 2, name: PERSONA_TITLE }),
    ).toBeInTheDocument();
  });

  it("offers one switch per item, each named by its label", () => {
    renderPersona();

    for (const item of PERSONA_ITEMS) {
      expect(
        screen.getByRole("checkbox", { name: item.label }),
      ).not.toBeChecked();
    }
  });

  it("shows no circle until a switch is turned on", () => {
    const section = renderPersona();

    expect(section.querySelectorAll("[data-circle]")).toHaveLength(
      PERSONA_ITEMS.length,
    );
    for (let index = 0; index < PERSONA_ITEMS.length; index += 1) {
      expect(circleOf(section, index)).toHaveClass("opacity-0");
    }
  });

  it("shows the circle that belongs to the switch that was turned on", () => {
    const section = renderPersona();

    fireEvent.click(
      screen.getByRole("checkbox", { name: PERSONA_ITEMS[2].label }),
    );

    expect(circleOf(section, 2)).toHaveClass("opacity-100");
    expect(circleOf(section, 0)).toHaveClass("opacity-0");
  });

  it("hides the circle again when the switch is turned off", () => {
    const section = renderPersona();
    const toggle = screen.getByRole("checkbox", {
      name: PERSONA_ITEMS[1].label,
    });

    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(circleOf(section, 1)).toHaveClass("opacity-0");
  });

  it("lets every switch work on its own", () => {
    const section = renderPersona();

    fireEvent.click(
      screen.getByRole("checkbox", { name: PERSONA_ITEMS[0].label }),
    );
    fireEvent.click(
      screen.getByRole("checkbox", { name: PERSONA_ITEMS[3].label }),
    );

    expect(circleOf(section, 0)).toHaveClass("opacity-100");
    expect(circleOf(section, 1)).toHaveClass("opacity-0");
    expect(circleOf(section, 3)).toHaveClass("opacity-100");
  });

  it("keeps the real checkbox reachable by keyboard, only hidden from sight", () => {
    renderPersona();
    const toggle = screen.getByRole("checkbox", {
      name: PERSONA_ITEMS[0].label,
    });

    expect(toggle).toHaveClass("sr-only");
    expect(toggle).not.toHaveAttribute("hidden");
  });

  it("draws the person and keeps the pictures decorative", () => {
    const section = renderPersona();

    expect(section.querySelector("[data-human] img")).toHaveAttribute(
      "alt",
      "",
    );
    expect(section.querySelectorAll("[data-circle] img")).toHaveLength(4);
  });

  it("puts the list under the picture area on small screens", () => {
    const section = renderPersona();

    expect(section.querySelector("[data-contents]")).toHaveClass(
      "le768:flex-col-reverse",
    );
  });

  it("slides a decorative strip above the title, more slowly on small screens", () => {
    const strip = renderPersona().querySelector("[data-strip]");

    expect(strip).toHaveClass(
      "motion-safe:animate-strip-slide",
      "le768:motion-safe:animate-strip-slide-slow",
    );
  });
});
