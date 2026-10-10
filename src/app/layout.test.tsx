import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Noto_Sans_JP: () => ({ variable: "mock-sans-variable" }),
  Orbitron: () => ({ variable: "mock-display-variable" }),
}));

import RootLayout, { metadata } from "./layout";

function renderLayout(): string {
  return renderToStaticMarkup(
    RootLayout({ children: <p>content</p> } as never),
  );
}

describe("RootLayout", () => {
  it("declares the page language as Japanese", () => {
    expect(renderLayout()).toContain('<html lang="ja"');
  });

  it("applies both web font variables to the root element", () => {
    const html = renderLayout().match(/<html[^>]*>/)?.[0] ?? "";

    expect(html).toContain("mock-sans-variable");
    expect(html).toContain("mock-display-variable");
  });

  it("renders the page content inside the body", () => {
    const body =
      renderLayout().match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";

    expect(body).toContain("<p>content</p>");
  });

  it("gives every page a title and a description", () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
