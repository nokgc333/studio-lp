import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useScrollActive = vi.hoisted(() => vi.fn<() => string | null>());
vi.mock("./use-scroll-active", () => ({ useScrollActive }));

import {
  CONCEPT_PRODUCTS,
  CONCEPT_TITLE_ALT,
  CONCEPT_WIDE_MEDIA,
} from "./concept-content";
import { ConceptSection } from "./concept-section";

function renderConcept() {
  const { container } = render(<ConceptSection />);
  return container.querySelector("section#concept") as HTMLElement;
}

beforeEach(() => {
  useScrollActive.mockReturnValue(null);
});

describe("ConceptSection", () => {
  it("is anchored as #concept", () => {
    expect(renderConcept()).toBeInTheDocument();
  });

  it("shows the logo picture as a level-2 heading", () => {
    renderConcept();

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toContainElement(
      screen.getByRole("img", { name: CONCEPT_TITLE_ALT }),
    );
  });

  it("has one block per product, each with its own id", () => {
    const section = renderConcept();

    for (const product of CONCEPT_PRODUCTS) {
      expect(section.querySelector(`#${product.id}`)).toBeInTheDocument();
    }
  });

  it("gives each product a name, a text and two tags", () => {
    const section = renderConcept();

    for (const product of CONCEPT_PRODUCTS) {
      const block = section.querySelector(`#${product.id}`) as HTMLElement;

      expect(block).toHaveTextContent(product.titleLines.join(""));
      expect(block).toHaveTextContent(product.text);
      for (const label of product.buttons) {
        expect(within(block).getByText(label)).toBeInTheDocument();
      }
    }
  });

  it("breaks a split name only on small screens", () => {
    const section = renderConcept();
    const [first] = CONCEPT_PRODUCTS;
    const block = section.querySelector(`#${first.id}`) as HTMLElement;

    expect(first.titleLines.length).toBeGreaterThan(1);
    expect(block.querySelector("br")).toHaveClass("hidden", "le768:block");
  });

  it("switches the name picture by screen width", () => {
    const section = renderConcept();
    const [first] = CONCEPT_PRODUCTS;
    const picture = section.querySelector(
      `[data-name="${first.id}"] picture`,
    ) as HTMLElement;

    expect(picture.querySelector("source")).toHaveAttribute(
      "media",
      CONCEPT_WIDE_MEDIA,
    );
    expect(picture.querySelector("source")).toHaveAttribute(
      "srcset",
      first.nameImage.pc,
    );
    expect(picture.querySelector("img")).toHaveAttribute(
      "src",
      first.nameImage.sp,
    );
  });

  it("hides every name picture until the page is scrolled to its block", () => {
    const section = renderConcept();

    for (const product of CONCEPT_PRODUCTS) {
      expect(section.querySelector(`[data-name="${product.id}"]`)).toHaveClass(
        "opacity-0",
      );
    }
  });

  it("shows only the name picture of the current block", () => {
    useScrollActive.mockReturnValue("product-2");
    const section = renderConcept();

    expect(section.querySelector('[data-name="product-2"]')).toHaveClass(
      "opacity-100",
    );
    expect(section.querySelector('[data-name="product-1"]')).toHaveClass(
      "opacity-0",
    );
  });

  it("keeps the name pictures sticky while their block scrolls", () => {
    const section = renderConcept();

    expect(section.querySelector("[data-name]")).toHaveClass("sticky");
  });

  it("paints a page-sized fixed background behind the section", () => {
    expect(renderConcept()).toHaveClass("before:fixed", "before:-z-10");
  });

  it("colours the tags by product", () => {
    const section = renderConcept();

    for (const product of CONCEPT_PRODUCTS) {
      const tag = within(
        section.querySelector(`#${product.id}`) as HTMLElement,
      ).getByText(product.buttons[0]);

      expect(tag.className).toContain("linear-gradient");
    }
  });
});
