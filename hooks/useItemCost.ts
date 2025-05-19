import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { crewCurrent } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { prestigeUpgrades } from "@/atoms/prestige";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";

const getPrestigeCost = (key: string): number => {
  if (PRESTIGE_UPGRADES[key]) {
    return PRESTIGE_UPGRADES[key].cost;
  }
  return 0;
};

const getItemAtom = (key: string) => {
  if (!EQUIPMENT_LIST[key]) {
    return undefined;
  }

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

  if (PRESTIGE_UPGRADES[key]) {
    return PRESTIGE_UPGRADES[key].cost;
  }

  if (!EQUIPMENT_LIST[key]) {
    return 0;
  }

  const item = itemAtom ? useAtomValue(itemAtom) : 0;
  const itemCount = typeof item === "number" ? item : item.value;
  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  let calculatedCost;

  if (type === "buy") {
    const discountCount = allUpgrades.upgradeDiscount || 0;
    const discountPercentage = discountCount > 0 ? discountCount * 5 : 0;
    const discountMultiplier = 1 - discountPercentage / 100;

    calculatedCost = Math.ceil(
      baseCost * Math.pow(costMultiplier, itemCount) * discountMultiplier,
    );
  } else {
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
  if (!EQUIPMENT_LIST[key]) {
    if (PRESTIGE_UPGRADES[key]) {
      return PRESTIGE_UPGRADES[key].cost * quantity;
    }
    return 0;
  }

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
  const itemCount = typeof item === "number" ? item : (item && item.value) || 0;

  const discountCount = allUpgrades.upgradeDiscount || 0;
  const discountPercentage = discountCount > 0 ? discountCount * 5 : 0;
  if (!EQUIPMENT_LIST[key]) {
    const prestigeCost = getPrestigeCost(key);

    const prestigeItemCount = PRESTIGE_UPGRADES[key]
      ? allUpgrades[key] || 0
      : itemCount;

    return {
      cost1: prestigeCost,
      cost10: prestigeCost * 10,
      cost20: prestigeCost * 20,
      cost50: prestigeCost * 50,
      itemCount: prestigeItemCount,
    };
  }

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
