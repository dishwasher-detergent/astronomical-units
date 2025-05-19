import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily } from "jotai/utils";
import { toast } from "sonner";

import { lifetimeIncome } from "@/atoms/au";
import { gameData, saveGameState } from "@/atoms/global";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { generateEquipmentObject } from "@/lib/equipment";
import { formatMoney } from "@/lib/formatters";
import {
  calculateNextLevelProgress,
  calculatePrestigeLevel,
} from "@/lib/prestige";

/**
 * Focus atoms for accessing prestige data directly
 */
export const prestigeLevel = focusAtom(gameData, (optic) =>
  optic.path("prestige.level"),
);

export const prestigeMultiplier = focusAtom(gameData, (optic) =>
  optic.path("prestige.multiplier"),
);

/**
 * Calculate the prestige level based on lifetime income
 */
export const currentLifetimeLevel = atom((get) => {
  const currentLifetimeIncome = get(lifetimeIncome);
  const currentPrestigeLevel = get(prestigeLevel) || 0;
  return calculatePrestigeLevel(currentLifetimeIncome, currentPrestigeLevel);
});

/**
 * Calculate progress to next prestige level
 */
export const lifetimeLevelProgress = atom((get) => {
  const currentLifetimeIncome = get(lifetimeIncome);
  const currentPrestigeLevel = get(prestigeLevel) || 0;
  return calculateNextLevelProgress(
    currentLifetimeIncome,
    currentPrestigeLevel,
  );
});

export const prestigePoints = focusAtom(gameData, (optic) =>
  optic.path("prestige.points"),
);

export const lifetimePrestigePoints = focusAtom(gameData, (optic) =>
  optic.path("prestige.lifetime"),
);

export const prestigeUpgrades = focusAtom(gameData, (optic) =>
  optic.path("prestige.upgrades"),
);

/**
 * Atom family for individual prestige upgrades
 * This prevents unnecessary rerenders when only one upgrade changes
 */
export const prestigeUpgradeFamily = atomFamily((upgradeKey: string) =>
  atom(
    (get) => (get(prestigeUpgrades) || {})[upgradeKey] || 0,
    (get, set, newLevel: number) => {
      const currentUpgrades = get(prestigeUpgrades) || {};
      set(prestigeUpgrades, {
        ...currentUpgrades,
        [upgradeKey]: newLevel,
      });
      set(saveGameState);
    },
  ),
);

/**
 * Fixed prestige points (5) when player reaches level 100
 */
export const potentialPrestigePoints = atom((get) => {
  const level = get(currentLifetimeLevel);
  return level >= 100 ? 5 : 0;
});

/**
 * Whether the player can prestige now (only at level 100)
 */
export const canPrestige = atom((get) => {
  const level = get(currentLifetimeLevel);
  return level >= 100;
});

/**
 * Memoization cache for prestige multiplier calculations
 * This avoids recalculating multipliers for the same point values
 */
const prestigeMultiplierCache = new Map<number, number>();
const MAX_CACHE_SIZE = 1000;

/**
 * Calculate prestige multiplier with efficient caching
 * This function uses memoization to avoid recalculating values
 */
export const calculatePrestigeMultiplier = (points: number): number => {
  const roundedPoints = Math.round(points);

  if (prestigeMultiplierCache.has(roundedPoints)) {
    return prestigeMultiplierCache.get(roundedPoints)!;
  }

  const baseMultiplier = 1;
  const earlyGameBonus = Math.min(roundedPoints, 10) * 0.25;

  let lateGameBonus = 0;
  if (roundedPoints > 10) {
    const exponent = roundedPoints > 1000 ? 0.8 : 0.9;
    lateGameBonus = Math.pow(roundedPoints - 10, exponent) * 0.15;
  }

  const result = baseMultiplier + earlyGameBonus + lateGameBonus;

  prestigeMultiplierCache.set(roundedPoints, result);

  if (prestigeMultiplierCache.size > MAX_CACHE_SIZE) {
    const oldestKey = prestigeMultiplierCache.keys().next().value;
    if (oldestKey !== undefined) {
      prestigeMultiplierCache.delete(oldestKey);
    }
  }

  return result;
};

/**
 * Perform prestige reset with optimized state updates
 */
export const performPrestige = atom(null, (get, set) => {
  const level = get(currentLifetimeLevel);

  if (level < 100) {
    toast.error("You need to reach Level 100 to prestige!");
    return;
  }

  const prestigePointsReward = 5;
  const currentLevel = get(prestigeLevel) || 0;
  const currentLifetime = get(lifetimePrestigePoints) || 0;
  const currentPoints = get(prestigePoints) || 0;
  const newCurrentPoints = currentPoints + prestigePointsReward;
  const newMultiplier = calculatePrestigeMultiplier(newCurrentPoints);

  set(gameData, (prev) => ({
    ...prev,
    income: {
      total: 0,
      current: 0,
      lifetime: 0,
    },
    equipment: generateEquipmentObject(EQUIPMENT_LIST),
    show: {},
    prestige: {
      ...prev.prestige,
      level: currentLevel + 1,
      points: newCurrentPoints,
      lifetime: currentLifetime + prestigePointsReward,
      multiplier: newMultiplier,
    },
  }));

  Object.entries(PRESTIGE_UPGRADES).forEach(([key, value]: any) => {
    if (newCurrentPoints >= value.threshold) {
      set(show, key);
    }
  });

  set(saveGameState);
  toast.success(`Prestige complete! You've gained 5 prestige points.`, {
    description: `Your production multiplier is now ${formatMoney(newMultiplier)}x. You've been reset to Level 1 (Prestige ${currentLevel + 1}).`,
    duration: 5000,
  });
});

/**
 * Helper to add prestige points directly (for development or cheats)
 */
export const addPrestigePoints = atom(null, (get, set, amount: number) => {
  const currentPoints = get(prestigePoints) || 0;
  const currentLifetime = get(lifetimePrestigePoints) || 0;
  const newPoints = currentPoints + amount;

  set(gameData, (prev) => ({
    ...prev,
    prestige: {
      ...prev.prestige,
      points: newPoints,
      lifetime: currentLifetime + amount,
      multiplier: calculatePrestigeMultiplier(newPoints),
    },
  }));

  set(saveGameState);
});

/**
 * Helper to set prestige multiplier directly (for development)
 */
export const setPrestigeMultiplier = atom(
  null,
  (get, set, multiplier: number) => {
    set(prestigeMultiplier, multiplier);
    set(saveGameState);
  },
);

if (process.env.NODE_ENV !== "production") {
  prestigeLevel.debugLabel = "Prestige Level";
  prestigeMultiplier.debugLabel = "Prestige Multiplier";
  prestigePoints.debugLabel = "Prestige Points";
  lifetimePrestigePoints.debugLabel = "Lifetime Prestige Points";
  potentialPrestigePoints.debugLabel = "Potential Prestige Points";
  canPrestige.debugLabel = "Can Prestige";
  prestigeUpgrades.debugLabel = "Prestige Upgrades";
  performPrestige.debugLabel = "Perform Prestige";
  addPrestigePoints.debugLabel = "Add Prestige Points (Dev)";
  setPrestigeMultiplier.debugLabel = "Set Prestige Multiplier (Dev)";
  currentLifetimeLevel.debugLabel = "Current Lifetime Level";
  lifetimeLevelProgress.debugLabel = "Lifetime Level Progress";
}
