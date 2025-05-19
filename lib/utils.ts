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
  equipmentList: Record<string, Equipment>,
) {
  const newObject: EquipmentObject = {};

  Object.entries(equipmentList).forEach(([key, value]: [string, Equipment]) => {
    newObject[key] = {
      value: 0,
      upgrades: generateEquipmentUpgradesObject(value),
    };
  });

  return newObject;
}

export function calculateUpgradeMultiplier(
  equipment: EquipmentItem,
  item: Equipment,
  prestigeMultiplier: number = 1,
) {
  // Start with base multiplier of 1
  let multiplier = 1;

  if (!item) {
    return multiplier * prestigeMultiplier;
  }

  // Only perform equipment upgrade calculations if we have upgrades
  if (equipment?.upgrades) {
    // Use reduce instead of forEach for better performance
    multiplier += Object.entries(equipment.upgrades).reduce(
      (acc, [upgradeKey, upgradeVal]) => {
        const upgradeItem = item.upgrades?.[upgradeKey];
        if (!upgradeItem) return acc;
        return acc + (upgradeItem.multiplier ?? 1) * upgradeVal;
      },
      0,
    );
  }

  // Apply prestige multiplier to the result
  return multiplier * prestigeMultiplier;
}

export function mergeNestedObjects<
  T extends Record<string, any>,
  U extends Record<string, any>,
>(obj1: T, obj2: U): T & U {
  const result: Record<string, any> = { ...obj2, ...obj1 };

  Object.keys(result).forEach((key) => {
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      result[key] = mergeNestedObjects(obj1[key], obj2[key]);
    }
  });

  return result as T & U;
}
