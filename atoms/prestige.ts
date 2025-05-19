import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { toast } from "sonner";

import { au, totalAu } from "@/atoms/au";
import { equipment } from "@/atoms/equipment";
import { gameData } from "@/atoms/global";
import { show, showElement } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { generateEquipmentObject } from "@/lib/utils";

export const prestigeLevel = focusAtom(gameData, (optic) =>
  optic.path("prestige.level"),
);

export const prestigeMultiplier = focusAtom(gameData, (optic) =>
  optic.path("prestige.multiplier"),
);

export const prestigePoints = focusAtom(gameData, (optic) =>
  optic.path("prestige.points"),
);

export const lifetimePrestigePoints = focusAtom(gameData, (optic) =>
  optic.path("prestige.lifetime"),
);
export const prestigeUpgrades = focusAtom(gameData, (optic) =>
  optic.path("prestige.upgrades"),
);

export const potentialPrestigePoints = atom((get) => {
  const currentTotalAu = get(totalAu);
  const basePoints = Math.floor(Math.log10(Math.max(currentTotalAu, 1)) / 3);
  const bonusPoints =
    basePoints > 0 ? Math.sqrt(currentTotalAu / 1000) / 2 - 0.5 : 0;
  const totalPoints = Math.floor(basePoints + Math.max(0, bonusPoints));

  return Math.max(0, totalPoints);
});

export const canPrestige = atom((get) => {
  const potential = get(potentialPrestigePoints);
  return potential > 0;
});

const prestigeMultiplierCache = new Map<number, number>();
const MAX_CACHE_SIZE = 1000;

export const calculatePrestigeMultiplier = (points: number): number => {
  const roundedPoints = Math.round(points);

  if (prestigeMultiplierCache.has(roundedPoints)) {
    return prestigeMultiplierCache.get(roundedPoints)!;
  }

  // Base calculation
  const baseMultiplier = 1;
  const earlyGameBonus = Math.min(roundedPoints, 10) * 0.25;

  let lateGameBonus = 0;
  if (roundedPoints > 10) {
    if (roundedPoints > 1000) {
      lateGameBonus = Math.pow(roundedPoints - 10, 0.8) * 0.15;
    } else {
      lateGameBonus = Math.pow(roundedPoints - 10, 0.9) * 0.15;
    }
  }

  const result = baseMultiplier + earlyGameBonus + lateGameBonus;

  prestigeMultiplierCache.set(roundedPoints, result);

  if (prestigeMultiplierCache.size > MAX_CACHE_SIZE) {
    const firstKeyValue = prestigeMultiplierCache.keys().next();
    if (!firstKeyValue.done && firstKeyValue.value !== undefined) {
      prestigeMultiplierCache.delete(firstKeyValue.value);
    }
  }

  return result;
};

export const performPrestige = atom(null, (get, set) => {
  const potential = get(potentialPrestigePoints);

  if (potential <= 0) {
    toast.error("You need more AUs to perform a prestige reset!");
    return;
  }

  const currentLevel = get(prestigeLevel) || 0;
  const currentLifetime = get(lifetimePrestigePoints) || 0;
  const currentPoints = get(prestigePoints) || 0;

  const newCurrentPoints = currentPoints + potential;

  set(prestigeLevel, currentLevel + 1);
  set(prestigePoints, newCurrentPoints);
  set(lifetimePrestigePoints, currentLifetime + potential);

  const newMultiplier = calculatePrestigeMultiplier(currentPoints + potential);
  set(prestigeMultiplier, newMultiplier);

  set(au, 0);
  set(totalAu, 0);
  set(equipment, generateEquipmentObject(EQUIPMENT_LIST));
  set(showElement, {});

  const currentUpgrades = get(prestigeUpgrades) || {};
  if (Object.keys(currentUpgrades).length === 0) {
    const initialUpgrades: Record<string, number> = {};
    Object.keys(PRESTIGE_UPGRADES).forEach((key) => {
      initialUpgrades[key] = 0;
    });
    set(prestigeUpgrades, initialUpgrades);
  }

  Object.entries(PRESTIGE_UPGRADES).forEach(([key, value]: any) => {
    if (newCurrentPoints >= value.threshold) {
      set(show, key);
    }
  });

  toast.success(
    `Prestige complete! You've gained ${potential.toLocaleString(LOCALE, NUMBER_OPTIONS)} prestige points.`,
    {
      description: `Your production multiplier is now ${newMultiplier.toLocaleString(
        LOCALE,
        NUMBER_OPTIONS,
      )}x`,
      duration: 5000,
    },
  );
});

export const addPrestigePoints = atom(null, (get, set, amount: number) => {
  const currentPoints = get(prestigePoints) || 0;
  const currentLifetime = get(lifetimePrestigePoints) || 0;

  const newPoints = currentPoints + amount;
  set(prestigePoints, newPoints);
  set(lifetimePrestigePoints, currentLifetime + amount);

  const newMultiplier = calculatePrestigeMultiplier(newPoints);
  set(prestigeMultiplier, newMultiplier);
});

export const setPrestigeMultiplier = atom(
  null,
  (get, set, multipler: number) => {
    set(prestigeMultiplier, multipler);
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
}
