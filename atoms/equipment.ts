import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReducer } from "jotai/utils";

import { show } from "@/atoms/show";
import {
  EQUIPMENT_RATE,
  EQUIPMENT_RATE_DELTA,
  EQUIPMENT_RATE_MINIMUM,
  EQUIPMENT_RATE_REDUCTION,
  EQUIPMENT_RATE_REDUCTION_DELTA,
} from "@/constants/EQUIPMENT";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { gameData } from "./global";

export const equipment = focusAtom(gameData, (optic) =>
  optic.prop("equipment"),
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

// Development helper to add equipment directly
export const addEquipment = atom<null, [{ key: string; amount: number }], void>(
  null,
  (_, set, params) => {
    const { key, amount } = params;

    if (!EQUIPMENT_LIST[key]) {
      return;
    }

    set(equipment, (current) => ({
      ...current,
      [key]: {
        ...(current[key] || { upgrades: {} }),
        value: (current[key]?.value || 0) + amount,
      },
    }));

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
  addEquipment.debugLabel = "Add Equipment (Dev)";
  unlockAllEquipment.debugLabel = "Unlock All Equipment (Dev)";
}
