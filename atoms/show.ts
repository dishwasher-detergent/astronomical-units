import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

export const show = atom(null, (_, set, key: string) =>
  set(showElement, (current) => ({ ...current, [key]: true }))
);

export const showElement = atomWithStorage<Partial<Record<string, boolean>>>(
  "SHOW_ELEMENT",
  {}
);

export const showUpgrade = atomWithStorage<Partial<Record<string, boolean>>>(
  "SHOW_UPGRADE",
  {}
);

if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show";
  showElement.debugLabel = "Show Element";
}
