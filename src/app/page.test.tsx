import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders exactly one level-1 heading", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
  });

  it("follows the key visual with the concept section", () => {
    const { container } = render(<Home />);

    expect(
      container.querySelector("section#hero + section#concept"),
    ).toBeInTheDocument();
  });

  it("follows the concept with the persona section", () => {
    const { container } = render(<Home />);

    expect(
      container.querySelector("section#concept + section#persona"),
    ).toBeInTheDocument();
  });

  it("starts with the key visual section", () => {
    const { container } = render(<Home />);

    expect(container.querySelector("main > section#hero")).toBeInTheDocument();
  });
});
