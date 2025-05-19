import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";

/**
 * Memoize equipment keys for better performance
 */
const EQUIPMENT_KEYS = Object.keys(EQUIPMENT_LIST);
const PRESTIGE_UPGRADE_KEYS = Object.keys(PRESTIGE_UPGRADES);

/**
 * Persistent storage for upgrade index to remember between sessions
 */
export const upgradeIndex = atomWithStorage("UPGRADE_INDEX", 0);

/**
 * Get/cycle through next available upgrade
 */
export const nextUpgrade = atom(
  (get) => {
    const index = get(upgradeIndex);
    return EQUIPMENT_KEYS[index % EQUIPMENT_KEYS.length];
  },
  (_, set) => {
    set(upgradeIndex, (current) => {
      const nextIndex = current + 2; // Skip by 2 for variety
      return nextIndex >= EQUIPMENT_KEYS.length ? 0 : nextIndex;
    });
  },
);

/**
 * Persistent storage for prestige upgrade index
 */
export const prestigeUpgradeIndex = atomWithStorage(
  "PRESTIGE_UPGRADE_INDEX",
  0,
);

/**
 * Get/cycle through next available prestige upgrade
 */
export const nextPrestigeUpgrade = atom(
  (get) => {
    const index = get(prestigeUpgradeIndex);
    return PRESTIGE_UPGRADE_KEYS[index % PRESTIGE_UPGRADE_KEYS.length];
  },
  (_, set) => {
    set(prestigeUpgradeIndex, (current) => {
      const nextIndex = current + 2;
      return nextIndex >= PRESTIGE_UPGRADE_KEYS.length ? 0 : nextIndex;
    });
  },
);

// Debug labels
if (process.env.NODE_ENV !== "production") {
  upgradeIndex.debugLabel = "Upgrade Index";
  nextUpgrade.debugLabel = "Next Upgrade";
  prestigeUpgradeIndex.debugLabel = "Prestige Upgrade Index";
  nextPrestigeUpgrade.debugLabel = "Next Prestige Upgrade";
}
