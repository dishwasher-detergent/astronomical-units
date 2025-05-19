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
  let multiplier = 1;

  if (!item) {
    return multiplier * prestigeMultiplier;
  }

  if (equipment?.upgrades) {
    multiplier += Object.entries(equipment.upgrades).reduce(
      (acc, [upgradeKey, upgradeVal]) => {
        const upgradeItem = item.upgrades?.[upgradeKey];
        if (!upgradeItem) return acc;
        return acc + (upgradeItem.multiplier ?? 1) * upgradeVal;
      },
      0,
    );
  }

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

/**
 * MemoizedCalculator: A class that caches calculation results for performance
 * This is especially useful for expensive calculations that happen frequently
 */
export class MemoizedCalculator {
  private cache = new Map<string, number>();
  private maxSize: number;

  constructor(maxSize = 500) {
    this.maxSize = maxSize;
  }

  /**
   * Calculate with caching - returns cached result if available
   */
  calculate(fn: () => number, key: string): number {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const result = fn();
    this.cache.set(key, result);

    if (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    return result;
  }

  /**
   * Clear the cache
   */
  clear(): void {
    this.cache.clear();
  }
}

/**
 * Shared instance for upgrade multiplier calculations
 */
const upgradeMultiplierCalc = new MemoizedCalculator();

/**
 * Optimized version of calculateUpgradeMultiplier with memoization
 */
export function calculateUpgradeMultiplierOptimized(
  equipment: EquipmentItem,
  item: Equipment,
  prestigeMultiplier: number = 1,
): number {
  const cacheKey = `${JSON.stringify(equipment)}-${item?.name}-${prestigeMultiplier}`;

  return upgradeMultiplierCalc.calculate(() => {
    let multiplier = 1;

    if (!item) {
      return multiplier * prestigeMultiplier;
    }

    if (equipment?.upgrades) {
      multiplier += Object.entries(equipment.upgrades).reduce(
        (acc, [upgradeKey, upgradeVal]) => {
          const upgradeItem = item.upgrades?.[upgradeKey];
          if (!upgradeItem) return acc;
          return acc + (upgradeItem.multiplier ?? 1) * upgradeVal;
        },
        0,
      );
    }

    return multiplier * prestigeMultiplier;
  }, cacheKey);
}

/**
 * Formats a number into a human-readable string with appropriate suffixes (K, M, B, T, etc.)
 * @param value - The number to format
 * @param showDecimalsUnderMillion - Whether to show decimals for values under 1 million (default: true)
 * @returns Formatted string with appropriate suffix
 */
export function formatMoney(
  value?: number | null,
  showDecimalsUnderMillion = true,
): string {
  if (value === 0 || value === undefined || value === null) return "0";

  const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
  ];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);

  if (tier === 0) {
    return value % 1 === 0 ? value.toString() : value.toFixed(2);
  }

  if (tier >= suffixes.length) {
    return value.toExponential(2);
  }

  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  const suffix = suffixes[tier];

  if (tier === 1 && showDecimalsUnderMillion) {
    return scaled.toFixed(2) + suffix;
  } else {
    return Math.floor(scaled) + suffix;
  }
}
