"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AU } from "@/constants/GLOBAL";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { generateEquipmentObject, mergeNestedObjects } from "@/lib/utils";
import { GameData } from "@/types";

/**
 * Initialize prestige upgrades with default values
 * Memoized to avoid recreating on every render
 */
const initPrestigeUpgrades = () => {
  const upgrades: Record<string, number> = {};

  Object.keys(PRESTIGE_UPGRADES).forEach((key) => {
    upgrades[key] = 0;
  });

  return upgrades;
};

/**
 * Initial game state data
 */
const initialGameData: GameData = {
  income: AU,
  equipment: generateEquipmentObject(EQUIPMENT_LIST),
  show: {},
  last_updated: 0,
  prestige: {
    level: 0,
    points: 0,
    multiplier: 1,
    lifetime: 0,
    upgrades: initPrestigeUpgrades(),
  },
};

/**
 * Core game data atom with localStorage persistence and optimized storage
 */
export const gameData = atomWithStorage(
  "GAME_DATA",
  initialGameData,
  {
    getItem(key, initialValue) {
      if (typeof localStorage === "undefined") return initialValue;

      const storedValue = localStorage.getItem(key);
      if (!storedValue) return initialValue;

      try {
        const newEquipment = generateEquipmentObject(EQUIPMENT_LIST);
        const newPrestigeUpgrades = initPrestigeUpgrades();
        const savedData = JSON.parse(storedValue);
        const mergedEquipment = mergeNestedObjects(
          savedData.equipment || {},
          newEquipment,
        );

        const existingPrestigeUpgrades = savedData.prestige?.upgrades || {};
        const mergedPrestigeUpgrades = mergeNestedObjects(
          existingPrestigeUpgrades,
          newPrestigeUpgrades,
        );

        return {
          ...initialValue,
          ...savedData,
          equipment: mergedEquipment,
          prestige: {
            ...(savedData.prestige || initialValue.prestige),
            upgrades: mergedPrestigeUpgrades,
          },
          last_updated: savedData.last_updated || Date.now(),
        };
      } catch (error) {
        console.error("Error parsing game data:", error);
        return initialValue;
      }
    },
    setItem(key, value) {
      const dataToSave = {
        ...value,
        last_updated: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  },
  { getOnInit: true },
);

/**
 * Last updated timestamp atom
 * Useful for tracking when the game state was last saved
 */
export const lastUpdated = focusAtom(gameData, (optic) =>
  optic.prop("last_updated"),
);

/**
 * Atom to manually trigger a save
 * Useful for ensuring critical state changes are persisted
 */
export const saveGameState = atom(null, (get, set) => {
  const currentData = get(gameData);
  set(gameData, {
    ...currentData,
    last_updated: Date.now(),
  });
});

// Debug labels
if (process.env.NODE_ENV !== "production") {
  gameData.debugLabel = "GameData";
  lastUpdated.debugLabel = "LastUpdated";
  saveGameState.debugLabel = "Save Game State";
}
