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
export const lifetimeIncome = focusAtom(gameData, (optic) =>
  optic.path("income.lifetime"),
);

/**
 * Memoized calculation of click value to avoid recalculating on each click
 */
export const clickValueAtom = atom((get) => {
  const item = EQUIPMENT_LIST.crew;
  const crewAtom = get(crew);
  const presMultiplier = get(prestigeMultiplier) || 1;
  const multiplier = calculateUpgradeMultiplier(crewAtom, item, presMultiplier);

  return Math.max(
    item.auPerSecond * multiplier * crewAtom.value,
    1 * presMultiplier,
  );
});

export const auIncrement = atom(null, (get, set) => {
  const baseClickValue = get(clickValueAtom);
  const allUpgrades = get(prestigeUpgrades) || {};

  let valuePerClick = baseClickValue;

  // Apply precious finds upgrade effect
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
  // Update AU values efficiently by reading current values only once
  const currentAu = get(au);
  const currentTotalAu = get(totalAu);
  const currentLifetimeIncome = get(lifetimeIncome);
  const newAu = currentAu + valuePerClick;
  const newTotalAu = currentTotalAu + valuePerClick;
  const newLifetimeIncome = currentLifetimeIncome + valuePerClick;

  set(au, newAu);
  set(totalAu, newTotalAu);
  set(lifetimeIncome, newLifetimeIncome);

  // Check for equipment unlocks
  Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
    if (newTotalAu >= value.threshold) {
      set(show, key);
    }
  });
});

/**
 * Memoized calculation for equipment production rates
 * This avoids recalculating production rates for each equipment
 * item unless their values change
 */
export const equipmentProductionRates = atom((get) => {
  const equip = get(equipment);
  const presMultiplier = get(prestigeMultiplier) || 1;

  const rates = new Map();

  Object.entries(equip).forEach(([key, eq]: any) => {
    if (eq.value > 0) {
      const item = EQUIPMENT_LIST[key];

      if (!item || item.equipment === false) return;

      const multiplier = calculateUpgradeMultiplier(eq, item, presMultiplier);
      const baseRate = item.auPerSecond * multiplier * eq.value;

      rates.set(key, baseRate);
    }
  });

  return rates;
});

export const autoIncrement = atom(null, (get, set, seconds: number = 1) => {
  const productionRates = get(equipmentProductionRates);
  const allUpgrades = get(prestigeUpgrades) || {};

  // Calculate upgrade bonuses
  const resourceMagnetismLevel = allUpgrades.resourceMagnetism || 0;
  const resourceMagnetismBonus =
    resourceMagnetismLevel > 0
      ? Math.pow(
          PRESTIGE_UPGRADES.resourceMagnetism.multiplier || 1,
          resourceMagnetismLevel,
        )
      : 1;

  // Critical production calculation
  const criticalProductionLevel = allUpgrades.criticalProduction || 0;
  const criticalChance = criticalProductionLevel * 0.05; // 5% per level
  const criticalMultiplier = Math.random() < criticalChance ? 2 : 1; // Double production on critical
  // Sum up all production with bonuses applied
  let totalEarned = 0;
  productionRates.forEach((baseRate) => {
    totalEarned +=
      baseRate * seconds * resourceMagnetismBonus * criticalMultiplier;
  });

  if (totalEarned > 0) {
    // Read current values only once
    const currentAu = get(au);
    const currentTotalAu = get(totalAu);
    const currentLifetimeIncome = get(lifetimeIncome);

    const newAu = currentAu + totalEarned;
    const newTotalAu = currentTotalAu + totalEarned;
    const newLifetimeIncome = currentLifetimeIncome + totalEarned;

    // Update values
    set(au, newAu);
    set(totalAu, newTotalAu);
    set(lifetimeIncome, newLifetimeIncome);

    // Check unlocks
    Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
      if (newTotalAu >= value.threshold) {
        set(show, key);
      }
    });
  }
});

/**
 * Helper utility to add AU directly
 */
export const addAu = atom(null, (get, set, amount: number) => {
  const currentAu = get(au);
  const currentTotalAu = get(totalAu);
  const currentLifetimeIncome = get(lifetimeIncome);

  set(au, currentAu + amount);
  set(totalAu, currentTotalAu + amount);
  set(lifetimeIncome, currentLifetimeIncome + amount);
});

/**
 * Helper utility to set AU directly (for development)
 */
export const setAuDirectly = atom(null, (get, set, amount: number) => {
  set(au, amount);
  set(totalAu, amount);
  set(lifetimeIncome, amount);
});

if (process.env.NODE_ENV !== "production") {
  au.debugLabel = "AUs";
  clickValueAtom.debugLabel = "Click Value";
  equipmentProductionRates.debugLabel = "Equipment Production Rates";
  auIncrement.debugLabel = "AU Increment";
  autoIncrement.debugLabel = "Auto Increment";
  addAu.debugLabel = "Add AU (Dev)";
  setAuDirectly.debugLabel = "Set AU (Dev)";
}
