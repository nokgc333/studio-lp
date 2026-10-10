import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

// jsdom has no matchMedia: answer "no match" unless a test sets its own.
beforeEach(() => {
  // Some test files run in the node environment, which has no window.
  if (typeof window === "undefined") return;

  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

// Vitest does not expose globals, so Testing Library cannot register this itself.
afterEach(() => {
  cleanup();
});
