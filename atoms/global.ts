import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AU } from "@/constants/GLOBAL";
import { generateEquipmentObject, mergeNestedObjects } from "@/lib/utils";
import { GameData } from "@/types";

const data: GameData = {
  income: AU,
  equipment: generateEquipmentObject(EQUIPMENT_LIST),
  show: {},
  last_updated: 0,
};

export const gameData = atomWithStorage(
  "GAME_DATA",
  data,
  {
    getItem(key, initialValue) {
      const storedValue = localStorage.getItem(key);
      const newEquipment = generateEquipmentObject(EQUIPMENT_LIST);

      try {
        // Merge the new equipment with the existing equipment, to account for new items being added to the game.
        const equipmentValue = JSON.parse(storedValue ?? "");
        const mergedEquipment = mergeNestedObjects(
          equipmentValue.equipment,
          newEquipment,
        );

        const data = {
          ...equipmentValue,
          equipment: mergedEquipment,
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
