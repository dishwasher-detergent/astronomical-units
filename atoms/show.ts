import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { gameData } from "./global";

export const show = atom(null, (_, set, key: string) =>
  set(showElement, (current) => ({ ...current, [key]: true })),
);

export const showElement = focusAtom(gameData, (optic) => optic.prop("show"));

export const showUpgrade = atomWithStorage<Partial<Record<string, boolean>>>(
  "SHOW_UPGRADE",
  {},
);

if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show";
  showElement.debugLabel = "Show Element";
}
