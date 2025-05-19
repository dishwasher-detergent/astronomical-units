import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily, atomWithStorage } from "jotai/utils";

import { gameData } from "./global";

/**
 * Focus atom for show elements
 * This controls what elements are visible in the UI
 */
export const showElement = focusAtom(gameData, (optic) => optic.prop("show"));

/**
 * Atom to trigger showing an element
 * By using a write-only atom, we minimize re-renders when showing items
 */
export const show = atom(null, (_, set, key: string) =>
  set(showElement, (current) => ({ ...current, [key]: true })),
);

/**
 * Atom family for checking if a specific element should be shown
 * This pattern prevents unnecessary re-renders when only checking a single item
 */
export const isShownFamily = atomFamily((key: string) =>
  atom((get) => !!get(showElement)[key]),
);

/**
 * Persistent storage for upgrade visibility
 * Kept separate from game data for better performance
 */
export const showUpgrade = atomWithStorage<Partial<Record<string, boolean>>>(
  "SHOW_UPGRADE",
  {},
);

/**
 * UI animation preferences
 */
export const animationsEnabled = atomWithStorage("ANIMATIONS_ENABLED", true);

// Debug labels
if (process.env.NODE_ENV !== "production") {
  show.debugLabel = "Show Element";
  showElement.debugLabel = "Show Elements";
  showUpgrade.debugLabel = "Show Upgrade";
  animationsEnabled.debugLabel = "Animations Enabled";
}
