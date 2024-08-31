import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

import {
  EQUIPMENT,
  EQUIPMENT_DELTA,
  EQUIPMENT_RATE,
  EQUIPMENT_RATE_DELTA,
  EQUIPMENT_RATE_MINIMUM,
  EQUIPMENT_RATE_REDUCTION,
  EQUIPMENT_RATE_REDUCTION_DELTA,
} from "@/constants/EQUIPMENT";

export const equipment = atomWithReducer(
  EQUIPMENT,
  (current) => current + EQUIPMENT_DELTA
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
  (current) => current + EQUIPMENT_RATE_REDUCTION_DELTA
);

if (process.env.NODE_ENV !== "production") {
  equipment.debugLabel = "Equipment";
  equipmentRate.debugLabel = "Equipment Rate";
}
