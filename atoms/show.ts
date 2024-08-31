import { atom } from "jotai";

import type { ElementKey } from "@/types";

export const show = atom(null, (_, set, key: ElementKey) =>
  set(showElement, (current) => ({ ...current, [key]: true }))
);

// TODO - use atomFamily or another pattern to avoid re-rendering every component that checks for any showElement.
export const showElement = atom<Partial<Record<ElementKey, boolean>>>({});

export const showGameOver = atom(false);

if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show";
  showElement.debugLabel = "Show Element";
  showGameOver.debugLabel = "Show Game Over";
}
