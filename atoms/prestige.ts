import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily } from "jotai/utils";
import { toast } from "sonner";

import { totalAu } from "@/atoms/au";
import { gameData, saveGameState } from "@/atoms/global";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { MAX_LEVEL_PRESTIGE } from "@/constants/GLOBAL";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { generateEquipmentObject } from "@/lib/equipment";
import { formatMoney } from "@/lib/formatters";
import {
  calculateNextLevelProgress,
  calculatePrestigeLevel,
} from "@/lib/prestige";

export const prestigeLevel = focusAtom(gameData, (optic) =>
  optic.path("prestige.level"),
);

export const prestigeMultiplier = focusAtom(gameData, (optic) =>
  optic.path("prestige.multiplier"),
);

export const currentLifetimeLevel = atom((get) => {
  const prestigeIncomeValue = get(gameData).prestige.income;
  return calculatePrestigeLevel(prestigeIncomeValue);
});

export const lifetimeLevelProgress = atom((get) => {
  const prestigeIncomeValue = get(gameData).prestige.income;
  return calculateNextLevelProgress(prestigeIncomeValue);
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

export const canPrestige = atom((get) => {
  const level = get(currentLifetimeLevel);
  return level >= MAX_LEVEL_PRESTIGE;
});

export const performPrestige = atom(null, (get, set) => {
  const level = get(currentLifetimeLevel);

  if (level < MAX_LEVEL_PRESTIGE) {
    return;
  }

  const prestigePointsReward = 5;
  const currentLevel = get(prestigeLevel) || 0;
  const currentLifetime = get(lifetimePrestigePoints) || 0;
  const newLifetime = currentLifetime + prestigePointsReward;
  const currentPoints = get(prestigePoints) || 0;
  const newCurrentPoints = currentPoints + prestigePointsReward;
  const currentMultiplier = get(prestigeMultiplier) || 1;
  const newMultiplier = currentMultiplier + 0.25;
  const currentLifetimeIncome = get(totalAu);
  set(gameData, (prev) => ({
    ...prev,
    income: {
      total: currentLifetimeIncome,
      current: 0,
    },
    equipment: generateEquipmentObject(EQUIPMENT_LIST),
    show: {},
    prestige: {
      ...prev.prestige,
      income: 0,
      level: currentLevel + 1,
      points: newCurrentPoints,
      lifetime: newLifetime,
      multiplier: newMultiplier,
    },
  }));

  Object.entries(PRESTIGE_UPGRADES).forEach(([key, value]: any) => {
    if (newLifetime >= value.threshold) {
      set(show, key);
    }
  });

  set(saveGameState);
  toast.success(`Prestige complete! You've gained 5 prestige points.`, {
    description: `Your production multiplier is now ${formatMoney(newMultiplier)}x. You've prestiged to level ${currentLevel + 1}.`,
    duration: 5000,
  });
});

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
    },
  }));

  set(saveGameState);
});

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
  canPrestige.debugLabel = "Can Prestige";
  prestigeUpgrades.debugLabel = "Prestige Upgrades";
  performPrestige.debugLabel = "Perform Prestige";
  addPrestigePoints.debugLabel = "Add Prestige Points (Dev)";
  setPrestigeMultiplier.debugLabel = "Set Prestige Multiplier (Dev)";
  currentLifetimeLevel.debugLabel = "Current Prestige Level";
  lifetimeLevelProgress.debugLabel = "Prestige Level Progress";
}
