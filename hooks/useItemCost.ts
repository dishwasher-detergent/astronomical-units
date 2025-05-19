import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { crewCurrent } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { prestigeUpgrades } from "@/atoms/prestige";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

const getItemAtom = (key: string) => {
  if (EQUIPMENT_LIST[key].equipment === false) {
    switch (key) {
      case "crew":
        return crewCurrent;
      default:
        return undefined;
    }
  }

  return focusAtom(equipment, (optic) => optic.prop(key));
};

export function useItemCost(key: string, type: "buy" | "sell" = "buy") {
  const itemAtom = useMemo(() => getItemAtom(key), [key]);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};

  const item = itemAtom ? useAtomValue(itemAtom) : 0;
  const itemCount = typeof item === "number" ? item : item.value;
  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  // Only apply discount on buy, not on sell
  let calculatedCost;

  if (type === "buy") {
    const discountCount = allUpgrades.upgradeDiscount || 0;
    const discountPercentage = discountCount > 0 ? discountCount * 5 : 0; // 5% discount per level
    const discountMultiplier = 1 - discountPercentage / 100;

    calculatedCost = Math.ceil(
      baseCost * Math.pow(costMultiplier, itemCount) * discountMultiplier,
    );
  } else {
    // For selling, we calculate the buy price of the previous level and take 30%
    calculatedCost = Math.ceil(
      baseCost * Math.pow(costMultiplier, itemCount - 1) * 0.3,
    );
  }

  return calculatedCost;
}

export function calculateBulkCost(
  key: string,
  currentCount: number,
  quantity: number,
  discountPercentage: number = 0,
) {
  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];
  const discountMultiplier = 1 - discountPercentage / 100;

  let totalCost = 0;

  for (let i = 0; i < quantity; i++) {
    totalCost += Math.ceil(
      baseCost *
        Math.pow(costMultiplier, currentCount + i) *
        discountMultiplier,
    );
  }

  return totalCost;
}

export function useBulkCosts(key: string) {
  const itemAtom = useMemo(() => getItemAtom(key), [key]);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};

  const item = itemAtom ? useAtomValue(itemAtom) : 0;
  const itemCount = typeof item === "number" ? item : item.value;

  const discountCount = allUpgrades.upgradeDiscount || 0;
  const discountPercentage = discountCount > 0 ? discountCount * 5 : 0; // 5% discount per level

  const cost1 = useItemCost(key, "buy");
  const cost10 = calculateBulkCost(key, itemCount, 10, discountPercentage);
  const cost20 = calculateBulkCost(key, itemCount, 20, discountPercentage);
  const cost50 = calculateBulkCost(key, itemCount, 50, discountPercentage);

  return { cost1, cost10, cost20, cost50, itemCount };
}

export function useAcquireCost(key: string) {
  return useItemCost(key, "buy");
}

export function useSellCost(key: string) {
  return useItemCost(key, "sell");
}
