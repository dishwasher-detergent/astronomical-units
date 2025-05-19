import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily, atomWithReducer } from "jotai/utils";

import { show } from "@/atoms/show";
import {
  EQUIPMENT_RATE,
  EQUIPMENT_RATE_DELTA,
  EQUIPMENT_RATE_MINIMUM,
  EQUIPMENT_RATE_REDUCTION,
  EQUIPMENT_RATE_REDUCTION_DELTA,
} from "@/constants/EQUIPMENT";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { EquipmentItem } from "@/types";
import { gameData } from "./global";

export const equipment = focusAtom(gameData, (optic) =>
  optic.prop("equipment"),
);

/**
 * Atom family for accessing individual equipment items
 * This improves performance by preventing unnecessary rerenders
 * when only one equipment item changes
 */
export const equipmentItemFamily = atomFamily((key: string) =>
  atom(
    (get) => get(equipment)[key] || { value: 0, upgrades: {} },
    (get, set, newValue: EquipmentItem) => {
      set(equipment, (current) => ({
        ...current,
        [key]: newValue,
      }));

      const equip = EQUIPMENT_LIST[key]?.upgrades;
      if (equip) {
        Object.entries(equip).forEach(([upgradeKey, value]: any) => {
          if (newValue.value >= value.threshold) {
            set(show, `${key}_${upgradeKey}`);
          }
        });
      }
    },
  ),
);

export const equipmentRate = atom((get) => {
  let newRate =
    EQUIPMENT_RATE - get(equipmentRateReduction) * EQUIPMENT_RATE_DELTA;

  if (newRate < EQUIPMENT_RATE_MINIMUM) {
    newRate = EQUIPMENT_RATE_MINIMUM;
  }

  return newRate;
});

export const equipmentRateReduction = atomWithReducer(
  EQUIPMENT_RATE_REDUCTION,
  (current) => current + EQUIPMENT_RATE_REDUCTION_DELTA,
);

/**
 * Helper function to increment an equipment item's value
 */
export const incrementEquipment = atom(null, (get, set, key: string) => {
  const currentItem = get(equipmentItemFamily(key));
  set(equipmentItemFamily(key), {
    ...currentItem,
    value: currentItem.value + 1,
  });
});

// Development helper to add equipment directly
export const addEquipment = atom<null, [{ key: string; amount: number }], void>(
  null,
  (get, set, params) => {
    const { key, amount } = params;

    if (!EQUIPMENT_LIST[key]) {
      return;
    }

    const currentItem = get(equipmentItemFamily(key));
    set(equipmentItemFamily(key), {
      ...currentItem,
      value: currentItem.value + amount,
    });

    set(show, key);
  },
);

export const unlockAllEquipment = atom(null, (get, set) => {
  Object.keys(EQUIPMENT_LIST).forEach((key) => {
    set(show, key);
  });
});

if (process.env.NODE_ENV !== "production") {
  equipment.debugLabel = "Equipment";
  equipmentRate.debugLabel = "Equipment Rate";
  incrementEquipment.debugLabel = "Increment Equipment";
  addEquipment.debugLabel = "Add Equipment (Dev)";
  unlockAllEquipment.debugLabel = "Unlock All Equipment (Dev)";
}
