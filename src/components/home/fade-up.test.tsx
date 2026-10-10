import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useScrollReveal = vi.hoisted(() => vi.fn<() => boolean>());
vi.mock("./use-scroll-reveal", () => ({ useScrollReveal }));

import { FadeUp } from "./fade-up";

beforeEach(() => {
  useScrollReveal.mockReturnValue(false);
});

describe("FadeUp", () => {
  it("holds its children", () => {
    render(<FadeUp>content</FadeUp>);

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("rises into view once the page is scrolled to it", () => {
    useScrollReveal.mockReturnValue(true);
    render(<FadeUp>content</FadeUp>);

    expect(screen.getByText("content")).toHaveClass(
      "motion-safe:opacity-100",
      "motion-safe:translate-y-0",
    );
  });

  it("waits below and see-through until then, only when motion is allowed", () => {
    render(<FadeUp>content</FadeUp>);

    expect(screen.getByText("content")).toHaveClass(
      "motion-safe:opacity-0",
      "motion-safe:translate-y-[100px]",
    );
  });

  it("does not wait at all on the server", () => {
    // Before the page is hydrated nothing hides the content, so it is visible without scripts.
    expect(renderToServerMarkup()).not.toContain("opacity-0");
  });

  it("keeps classes given by the caller", () => {
    render(<FadeUp className="extra">content</FadeUp>);

    expect(screen.getByText("content")).toHaveClass("extra");
  });
});

import { renderToStaticMarkup } from "react-dom/server";

function renderToServerMarkup(): string {
  return renderToStaticMarkup(<FadeUp>content</FadeUp>);
}
