"use client";

import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AU } from "@/constants/GLOBAL";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { generateEquipmentObject, mergeNestedObjects } from "@/lib/utils";
import { GameData } from "@/types";

const initPrestigeUpgrades = () => {
  const upgrades: Record<string, number> = {};

  Object.keys(PRESTIGE_UPGRADES).forEach((key) => {
    upgrades[key] = 0;
  });

  return upgrades;
};

const data: GameData = {
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

export const gameData = atomWithStorage(
  "GAME_DATA",
  data,
  {
    getItem(key, initialValue) {
      if (typeof localStorage === "undefined") return initialValue;

      const storedValue = localStorage.getItem(key);
      const newEquipment = generateEquipmentObject(EQUIPMENT_LIST);
      const newPrestigeUpgrades = initPrestigeUpgrades();

      try {
        // Merge the new equipment with the existing equipment, to account for new items being added to the game.
        const equipmentValue = JSON.parse(storedValue ?? "");
        const mergedEquipment = mergeNestedObjects(
          equipmentValue.equipment,
          newEquipment,
        );

        // Initialize prestigeUpgrades if it doesn't exist in the saved data
        const existingPrestigeUpgrades = equipmentValue.prestigeUpgrades || {};
        const mergedPrestigeUpgrades = mergeNestedObjects(
          existingPrestigeUpgrades,
          newPrestigeUpgrades,
        );

        const data = {
          ...equipmentValue,
          equipment: mergedEquipment,
          prestigeUpgrades: mergedPrestigeUpgrades,
        };

        return data;
      } catch {
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
  {
    getOnInit: true,
  },
);

export const lastUpdated = focusAtom(gameData, (optic) =>
  optic.prop("last_updated"),
);

if (process.env.NODE_ENV !== "production") {
  gameData.debugLabel = "CPS";
}
