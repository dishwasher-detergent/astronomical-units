import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { gameData } from "./global";

export const show = atom(null, (_, set, key: string) =>
  set(showElement, (current) => ({ ...current, [key]: true })),
);

export const showElement = focusAtom(gameData, (optic) => optic.prop("show"));

if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show";
  showElement.debugLabel = "Show Element";
}
