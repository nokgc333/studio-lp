// @vitest-environment node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(import.meta.dirname, "globals.css"), "utf8");

/** The text of the first rule that starts with `selector` (inside any layer). */
function ruleBody(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`(?:^|\\n)\\s*${escaped}\\s*\\{([^}]*)\\}`).exec(
    css,
  );
  if (!match) throw new Error(`no rule for "${selector}" in globals.css`);
  return match[1];
}

describe("design tokens", () => {
  it.each([
    ["ink", "#000000"],
    ["paper", "#ffffff"],
    ["primary", "#128fcd"],
    ["secondary", "#b3d6e0"],
    ["highlight", "#dc24b1"],
    ["placeholder", "#cdcdcd"],
  ])("defines the %s colour as %s", (name, value) => {
    expect(css).toContain(`--color-${name}: ${value};`);
  });

  it("points the font tokens at the web fonts loaded in the root layout", () => {
    expect(css).toContain("--font-body: var(--font-noto-sans-jp)");
    expect(css).toContain("--font-display: var(--font-orbitron)");
  });
});

describe("base styles", () => {
  it("sets the text rhythm of the body", () => {
    const body = ruleBody("body");

    expect(body).toContain("letter-spacing: 0.1em");
    expect(body).toContain("overflow-x: hidden");
  });

  it("lets pictures fill the width of their box", () => {
    const img = ruleBody("img");

    expect(img).toContain("width: 100%");
    expect(img).toContain("max-width: 100%");
  });

  it("removes the underline from links", () => {
    expect(ruleBody("a")).toContain("text-decoration: none");
  });

  it("smooths scrolling only when the visitor allows motion", () => {
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: no-preference\)\s*\{\s*html\s*\{[^}]*scroll-behavior: smooth/,
    );
  });
});
