import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { au, totalAu } from "@/atoms/au";
import { equipment } from "@/atoms/equipment";
import { gameData } from "@/atoms/global";
import { showElement } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { generateEquipmentObject } from "@/lib/utils";
import { toast } from "sonner";

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

export const potentialPrestigePoints = atom((get) => {
  const currentTotalAu = get(totalAu);
  // Base points from logarithmic scaling (1 point at 1,000 AU)
  const basePoints = Math.floor(Math.log10(Math.max(currentTotalAu, 1)) / 3);

  // Bonus points for saving up - square root scaling provides diminishing returns but rewards saving
  // This gives fractional points starting at around 5,000 AU
  const bonusPoints =
    basePoints > 0 ? Math.sqrt(currentTotalAu / 1000) / 2 - 0.5 : 0;

  // Total points is base points plus bonus (rounded down)
  const totalPoints = Math.floor(basePoints + Math.max(0, bonusPoints));

  return Math.max(0, totalPoints);
});

export const canPrestige = atom((get) => {
  const potential = get(potentialPrestigePoints);
  return potential > 0;
});

export const calculatePrestigeMultiplier = (points: number): number => {
  const baseMultiplier = 1;
  const earlyGameBonus = Math.min(points, 10) * 0.25;
  const lateGameBonus = points > 10 ? Math.pow(points - 10, 0.9) * 0.15 : 0;

  return baseMultiplier + earlyGameBonus + lateGameBonus;
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

  set(prestigeLevel, currentLevel + 1);
  set(prestigePoints, currentPoints + potential);
  set(lifetimePrestigePoints, currentLifetime + potential);

  const newMultiplier = calculatePrestigeMultiplier(currentPoints + potential);
  set(prestigeMultiplier, newMultiplier);

  set(au, 0);
  set(totalAu, 0);
  set(equipment, generateEquipmentObject(EQUIPMENT_LIST));
  set(showElement, {});

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

  // Update multiplier
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
}
