import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { COPYRIGHT_TEXT, PAGE_LINKS, SOCIAL_LINKS } from "./footer-content";
import { Footer } from "./footer";

function renderFooter() {
  const { container } = render(<Footer />);
  return container.querySelector("footer") as HTMLElement;
}

describe("Footer", () => {
  it("is a footer element", () => {
    expect(renderFooter()).toBeInTheDocument();
  });

  it("shows the logo as a decorative picture", () => {
    const logo = renderFooter().querySelector("img");

    expect(logo).toHaveAttribute("alt", "");
    expect(logo?.getAttribute("src")).toContain("/images/placeholder/logo.svg");
  });

  it("lists the social links first and the page links second", () => {
    const [social, pages] = within(renderFooter()).getAllByRole("list");

    expect(
      within(social)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(SOCIAL_LINKS.map((link) => link.label));
    expect(
      within(pages)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual(PAGE_LINKS.map((link) => link.label));
  });

  it("gives every link a destination", () => {
    for (const link of within(renderFooter()).getAllByRole("link")) {
      expect(link).toHaveAttribute("href");
    }
  });

  it("points the column link at the knowledge section", () => {
    const column = PAGE_LINKS.find((link) => link.label === "Column");

    expect(column?.href).toBe("#knowledge");
  });

  it("shows the copyright notice in small print", () => {
    const small = renderFooter().querySelector("small");

    expect(small).toHaveTextContent(COPYRIGHT_TEXT);
  });

  it("draws a divider before the page links", () => {
    const [, pages] = within(renderFooter()).getAllByRole("list");

    expect(pages).toHaveClass("relative", "before:bg-paper");
  });

  it("uses the brand gradient and white text", () => {
    const footer = renderFooter();

    expect(footer).toHaveClass("text-paper", "text-center");
    expect(footer.className).toContain("linear-gradient(167.79deg");
  });
});
