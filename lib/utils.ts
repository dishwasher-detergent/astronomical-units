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
 * Optimized function to calculate upgrade multipliers using memoization
 * @param equipment - The equipment item
 * @param item - The equipment object
 * @param prestigeMultiplier - The prestige multiplier (default: 1)
 * @returns Calculated upgrade multiplier
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

/**
 * Helper function to handle all logic related to checking and showing equipment thresholds
 * @param key - The equipment key being updated
 * @param currentVal - The current value of the equipment
 * @param newVal - The new value after update
 * @param showFunc - Function to update the show state
 * @param equipmentList - The list of all equipment
 */
export function handleEquipmentThresholds(
  key: string,
  currentVal: number,
  newVal: number,
  showFunc: (key: string) => void,
  equipmentList: Record<string, Equipment>,
) {
  // Show upgrades for this equipment when reaching threshold
  const equip = equipmentList[key]?.upgrades;
  if (equip) {
    Object.entries(equip).forEach(([upgradeKey, value]: [string, any]) => {
      // Show upgrade if we're at or past the threshold
      if (newVal >= value.threshold) {
        // If we just crossed the threshold, or we're checking initial state
        if (currentVal < value.threshold || currentVal === 0) {
          showFunc(`${key}_${upgradeKey}`);
        }
      }
    });
  }

  // Check for next equipment that should be revealed
  Object.entries(equipmentList).forEach(([equipKey, equipDetails]) => {
    if (
      equipKey !== key && // Don't check the same equipment we're updating
      newVal >= equipDetails.threshold // Check if we've met the threshold
    ) {
      // If we just crossed the threshold, or we're checking initial state
      if (currentVal < equipDetails.threshold || currentVal === 0) {
        showFunc(equipKey);
      }
    }
  });
}
