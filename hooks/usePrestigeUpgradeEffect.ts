"use client";

import { prestigeUpgrades } from "@/atoms/prestige";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { useAtomValue } from "jotai";

export function usePrestigeUpgradeEffect(
  upgradeKey: string,
  baseValue: number,
): number {
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const upgradeCount = allUpgrades[upgradeKey] || 0;
  const upgrade = PRESTIGE_UPGRADES[upgradeKey];

  if (!upgrade || upgradeCount <= 0) {
    return baseValue;
  }

  const multiplier = Math.pow(upgrade?.multiplier ?? 1, upgradeCount);

  return baseValue * multiplier;
}
