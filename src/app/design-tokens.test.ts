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
    ["surface", "#f5f5f5"],
    ["switch-off", "#d9d9d9"],
    ["switch-on", "#ff0000"],
  ])("defines the %s colour as %s", (name, value) => {
    expect(css).toContain(`--color-${name}: ${value};`);
  });

  it("points the font tokens at the web fonts loaded in the root layout", () => {
    expect(css).toContain("--font-body: var(--font-noto-sans-jp)");
    expect(css).toContain("--font-display: var(--font-orbitron)");
  });
});

describe("screen-width variants", () => {
  it.each([991, 768, 575, 375])(
    "defines le%i for widths up to and including that width",
    (width) => {
      expect(css).toContain(
        `@custom-variant le${width} (@media (width <= ${width}px));`,
      );
    },
  );

  it("lists the wider limits first, so the narrower one wins where both apply", () => {
    const order = [991, 768, 575, 375].map((width) =>
      css.indexOf(`@custom-variant le${width} `),
    );

    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order.every((index) => index >= 0)).toBe(true);
  });
});

describe("gradients", () => {
  it("offers the diagonal brand gradient as a utility", () => {
    expect(css).toMatch(
      /@utility bg-brand-diagonal\s*\{[^}]*linear-gradient\(\s*125\.88deg/,
    );
  });
});

describe("circle reveal", () => {
  it("opens a circle from a point, using the variables of the element", () => {
    expect(css).toContain("--animate-circle-in: circle-in 1s forwards;");
    expect(css).toMatch(
      /@keyframes circle-in\s*\{[\s\S]*?circle\(0 at var\(--cx\) var\(--cy\)\)/,
    );
    expect(css).toMatch(/circle\(var\(--cr\) at var\(--cx\) var\(--cy\)\)/);
  });
});

describe("animations", () => {
  it("slides a background strip sideways, at two speeds", () => {
    expect(css).toContain(
      "--animate-strip-slide: strip-slide 23s linear infinite;",
    );
    expect(css).toContain(
      "--animate-strip-slide-slow: strip-slide 40s linear infinite;",
    );
    expect(css).toMatch(/@keyframes strip-slide\s*\{[^}]*background-position/);
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
