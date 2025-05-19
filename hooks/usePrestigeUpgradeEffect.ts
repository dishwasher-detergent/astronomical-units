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

  if (upgradeKey === "criticalProduction" || upgradeKey === "preciousFinds") {
    return upgradeCount;
  }

  if (upgradeKey === "rapidConstruction") {
    // Return the build time multiplier (e.g., 0.9, 0.81, 0.729, etc.)
    return Math.pow(upgrade?.multiplier ?? 0.9, upgradeCount);
  }

  const multiplier = Math.pow(upgrade?.multiplier ?? 1, upgradeCount);

  return baseValue * multiplier;
}
