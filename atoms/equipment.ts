import { atom } from "jotai";
import { atomWithReducer, atomWithStorage } from "jotai/utils";
import { Getter, Setter } from "jotai/vanilla";

import {
  EQUIPMENT_RATE,
  EQUIPMENT_RATE_DELTA,
  EQUIPMENT_RATE_MINIMUM,
  EQUIPMENT_RATE_REDUCTION,
  EQUIPMENT_RATE_REDUCTION_DELTA,
} from "@/constants/EQUIPMENT";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Equipment } from "@/types";

type EquipmentObject = {
  [key: string]: number;
};

const generateEquipmentObject = (equipmentList: Record<string, Equipment>) => {
  const newObject: EquipmentObject = {};

  Object.entries(equipmentList).forEach(([key, value]: [string, Equipment]) => {
    if (value.equipment === false) return;
    newObject[key] = 0;
  });

  return newObject;
};

const generateEquipmentUpgradesObject = (
  equipmentList: Record<string, Equipment>
) => {
  const newObject: EquipmentObject = {};

  Object.entries(equipmentList).forEach(([key, value]: [string, Equipment]) => {
    if (value.upgrades) {
      Object.entries(value.upgrades).forEach(([upgradeKey, _]) => {
        newObject[`${key}_${upgradeKey}`] = 0;
      });
    }
  });

  return newObject;
};

export const equipment = atomWithStorage(
  "EQUIPMENT",
  generateEquipmentObject(EQUIPMENT_LIST)
);

export const equipmentUpgrades = atomWithStorage(
  "EQUIPMENT_UPGRADES",
  generateEquipmentUpgradesObject(EQUIPMENT_LIST)
);

// Function to add a new item to the equipment atom
export const addEquipment =
  (key: string, value: any) => (get: Getter, set: Setter) => {
    const currentEquipment = get(equipment);
    set(equipment, { ...currentEquipment, [key]: value });
  };

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
  equipmentUpgrades.debugLabel = "Equipment Upgrades";
  equipmentRate.debugLabel = "Equipment Rate";
}
