import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Equipment, EquipmentItem, EquipmentObject } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUpgrades(obj: Record<string, any>, parentKey: string) {
  return Object.entries(obj).filter(([key, value]) => key.includes(parentKey));
}

export function generateEquipmentUpgradesObject(equipment: Equipment) {
  const newObject: Record<string, number> = {};
  if (equipment?.upgrades) {
    Object.entries(equipment.upgrades).forEach(([upgradeKey, _]) => {
      newObject[upgradeKey] = 0;
    });
  }

  return newObject;
}

export function generateEquipmentObject(
  equipmentList: Record<string, Equipment>
) {
  const newObject: EquipmentObject = {};

  Object.entries(equipmentList).forEach(([key, value]: [string, Equipment]) => {
    if (value.equipment === false) return;

    newObject[key] = {
      value: 0,
      upgrades: generateEquipmentUpgradesObject(value),
    };
  });

  return newObject;
}

export function calculateUpgradeMultiplier(
  equipment: EquipmentItem,
  item: Equipment
) {
  let multiplier = 1;

  if (equipment.upgrades) {
    Object.entries(equipment.upgrades).forEach(([upgradeKey, upgradeVal]) => {
      const upgradeItem = item.upgrades?.[upgradeKey];

      if (!upgradeItem) {
        return;
      }

      multiplier += upgradeItem.multiplier * upgradeVal;
    });
  }

  return multiplier;
}
