"use client";

import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { AU } from "@/constants/GLOBAL";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { mergeNestedObjects } from "@/lib/common";
import { generateEquipmentObject } from "@/lib/equipment";
import { GameData } from "@/types";

/**
 * Initialize prestige upgrades with default values
 */
const initPrestigeUpgrades = () => {
  const upgrades: Record<string, number> = {};
  Object.keys(PRESTIGE_UPGRADES).forEach((key) => {
    upgrades[key] = 0;
  });
  return upgrades;
};

/**
 * Initial game state
 */
const initialGameData: GameData = {
  income: { ...AU },
  equipment: generateEquipmentObject(EQUIPMENT_LIST),
  show: {},
  last_updated: 0,
  prestige: {
    income: 0,
    level: 0,
    points: 0,
    multiplier: 1,
    lifetime: 0,
    upgrades: initPrestigeUpgrades(),
  },
};

/**
 * Core game data atom with localStorage persistence
 * This is the source of truth for the entire game state
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
        const savedData = JSON.parse(storedValue);

        const newEquipment = generateEquipmentObject(EQUIPMENT_LIST);
        const newPrestigeUpgrades = initPrestigeUpgrades();
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
        };
      } catch (error) {
        console.error("Error parsing game data:", error);
        return initialValue;
      }
    },
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  },
  { getOnInit: true },
);

export const lastUpdated = focusAtom(gameData, (optic) =>
  optic.prop("last_updated"),
);

if (process.env.NODE_ENV !== "production") {
  gameData.debugLabel = "GameData";
  lastUpdated.debugLabel = "LastUpdated";
}
