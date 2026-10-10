import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionTitle } from "./section-title";

describe("SectionTitle", () => {
  it("is a level-2 heading with its text", () => {
    render(<SectionTitle>見出し</SectionTitle>);

    expect(
      screen.getByRole("heading", { level: 2, name: "見出し" }),
    ).toBeInTheDocument();
  });

  it("is centred and bold, smaller on small screens", () => {
    render(<SectionTitle>見出し</SectionTitle>);

    expect(screen.getByRole("heading")).toHaveClass(
      "text-center",
      "font-bold",
      "text-[32px]",
      "le768:text-[22px]",
    );
  });

  it("keeps classes given by the caller", () => {
    render(<SectionTitle className="extra">見出し</SectionTitle>);

    expect(screen.getByRole("heading")).toHaveClass("extra", "text-center");
  });
});
