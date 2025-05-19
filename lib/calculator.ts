import { Equipment, EquipmentItem } from "@/types";
import { upgradeMultiplierCalc } from "./caching";

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
