import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

export const show = atom(null, (_, set, key: string) =>
  set(showElement, (current) => ({ ...current, [key]: true }))
);

// TODO - use atomFamily or another pattern to avoid re-rendering every component that checks for any showElement.
export const showElement = atomWithStorage<Partial<Record<string, boolean>>>(
  "SHOW_ELEMENT",
  {}
);

export const showGameOver = atom(false);

if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show";
  showElement.debugLabel = "Show Element";
  showGameOver.debugLabel = "Show Game Over";
}
