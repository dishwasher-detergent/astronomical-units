"use client";

import { prestigeUpgrades } from "@/atoms/prestige";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { atom, useAtomValue } from "jotai";

/**
 * Calculate build time reduction based on the Rapid Construction prestige upgrade level
 * @param level - Number of levels in the Rapid Construction upgrade
 * @returns Build time multiplier to apply (e.g., 0.9, 0.81, etc.)
 */
export function calculateBuildTimeMultiplier(level: number): number {
  if (level <= 0) return 1; // No reduction
  return Math.pow(PRESTIGE_UPGRADES.rapidConstruction.multiplier || 0.9, level);
}

/**
 * Atom that calculates the build time reduction multiplier and percentage
 * This can be used directly in components that need this value
 */
export const buildTimeReductionAtom = atom((get) => {
  const allUpgrades = get(prestigeUpgrades) || {};
  const level = allUpgrades.rapidConstruction || 0;
  const multiplier = calculateBuildTimeMultiplier(level);
  const reduction = Math.round((1 - multiplier) * 100);

  return { multiplier, reduction, level };
});

/**
 * Hook to calculate build time reduction from Rapid Construction prestige upgrade
 * @returns Object with build time multiplier and percentage reduction
 */
export function useBuildTimeReduction() {
  return useAtomValue(buildTimeReductionAtom);
}
