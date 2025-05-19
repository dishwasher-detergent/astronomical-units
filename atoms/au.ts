import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { crew } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { gameData } from "./global";

export const totalAu = focusAtom(gameData, (optic) =>
  optic.path("income.total"),
);
export const au = focusAtom(gameData, (optic) => optic.path("income.current"));

export const auIncrement = atom(null, (get, set) => {
  const item = EQUIPMENT_LIST.crew;
  const crewAtom = get(crew);
  const presMultiplier = get(prestigeMultiplier) || 1;
  const allUpgrades = get(prestigeUpgrades) || {};
  const multiplier = calculateUpgradeMultiplier(crewAtom, item, presMultiplier);

  let valuePerClick = Math.max(
    item.auPerSecond * multiplier * crewAtom.value,
    1 * presMultiplier,
  );

  const preciousFindsLevel = allUpgrades.preciousFinds || 0;
  if (preciousFindsLevel > 0) {
    const bonusChance = preciousFindsLevel * 0.07;
    if (Math.random() < bonusChance) {
      const bonusValue = valuePerClick * 0.5;
      valuePerClick += bonusValue;

      import("sonner").then(({ toast }) => {
        toast.success("Precious Find!", {
          description: `Found bonus AUs! (+${Math.round(bonusValue)})`,
          duration: 2000,
        });
      });
    }
  }

  const newAu = get(au) + valuePerClick;
  const newTotalAu = get(totalAu) + valuePerClick;

  set(au, newAu);
  set(totalAu, newTotalAu);

  Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
    if (newTotalAu >= value.threshold) {
      set(show, key);
    }
  });
});

export const autoIncrement = atom(null, (get, set, seconds: number = 1) => {
  const equip = get(equipment);
  const presMultiplier = get(prestigeMultiplier) || 1;
  const allUpgrades = get(prestigeUpgrades) || {};

  const resourceMagnetismLevel = allUpgrades.resourceMagnetism || 0;
  const resourceMagnetismBonus =
    resourceMagnetismLevel > 0
      ? Math.pow(
          PRESTIGE_UPGRADES.resourceMagnetism.multiplier || 1,
          resourceMagnetismLevel,
        )
      : 1;

  const criticalProductionLevel = allUpgrades.criticalProduction || 0;
  const criticalChance = criticalProductionLevel * 0.05; // 5% per level
  const criticalMultiplier = Math.random() < criticalChance ? 2 : 1; // Double production on critical

  let totalEarned = 0;

  Object.entries(equip).forEach(([key, eq]: any) => {
    if (eq.value > 0) {
      const item = EQUIPMENT_LIST[key];

      if (!item || item.equipment === false) return;

      const multiplier = calculateUpgradeMultiplier(eq, item, presMultiplier);
      const earned =
        item.auPerSecond *
        multiplier *
        eq.value *
        seconds *
        resourceMagnetismBonus *
        criticalMultiplier;

      totalEarned += earned;
    }
  });

  if (totalEarned > 0) {
    const currentAu = get(au);
    const currentTotalAu = get(totalAu);

    const newAu = currentAu + totalEarned;
    const newTotalAu = currentTotalAu + totalEarned;

    set(au, newAu);
    set(totalAu, newTotalAu);

    Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
      if (newTotalAu >= value.threshold) {
        set(show, key);
      }
    });
  }
});

export const addAu = atom(null, (get, set, amount: number) => {
  const currentAu = get(au);
  const currentTotalAu = get(totalAu);

  set(au, currentAu + amount);
  set(totalAu, currentTotalAu + amount);
});

export const setAuDirectly = atom(null, (get, set, amount: number) => {
  set(au, amount);
  set(totalAu, amount);
});

if (process.env.NODE_ENV !== "production") {
  au.debugLabel = "AUs";
  auIncrement.debugLabel = "AU Increment";
  addAu.debugLabel = "Add AU (Dev)";
  setAuDirectly.debugLabel = "Set AU (Dev)";
}
