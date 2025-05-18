import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { crew } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { prestigeMultiplier } from "@/atoms/prestige";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
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
  const multiplier = calculateUpgradeMultiplier(crewAtom, item, presMultiplier);

  const valuePerClick = Math.max(
    item.auPerSecond * multiplier * crewAtom.value,
    1 * presMultiplier,
  );

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

  const updateAuValues = (key: string, eq: any, multiplier: number = 1) => {
    const item = EQUIPMENT_LIST[key];

    if (!item || item.equipment === false) return;

    const earned = item.auPerSecond * multiplier * eq.value * seconds;

    const newAu = get(au) + earned;
    const newTotalAu = get(totalAu) + earned;

    set(au, newAu);
    set(totalAu, newTotalAu);

    Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
      if (newTotalAu >= value.threshold) {
        set(show, key);
      }
    });
  };

  Object.entries(equip).forEach(([key, eq]: any) => {
    if (eq.value > 0) {
      const item = EQUIPMENT_LIST[key];

      const multiplier = calculateUpgradeMultiplier(eq, item, presMultiplier);
      updateAuValues(key, eq, multiplier);
    }
  });
});

// Development mode functions
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
