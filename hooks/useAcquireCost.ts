import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { crewCurrent } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { prestigeUpgrades } from "@/atoms/prestige";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

const getRankAtom = (key: string) => {
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

export function useAcquireCost(key: string) {
  const rankAtom = useMemo(() => getRankAtom(key), [key]);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};

  const rank = rankAtom ? useAtomValue(rankAtom) : 0;
  const rankValue = typeof rank === "number" ? rank : rank.value;
  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  const discountCount = allUpgrades.upgradeDiscount || 0;
  const discountPercentage = discountCount > 0 ? discountCount * 5 : 0; // 5% discount per level
  const discountMultiplier = 1 - discountPercentage / 100;

  const baseCalculatedCost = Math.ceil(
    baseCost * Math.pow(costMultiplier, rankValue),
  );
  return Math.ceil(baseCalculatedCost * discountMultiplier);
}
