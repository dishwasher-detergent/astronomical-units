import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { astronaut } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { gameData } from "./global";

export const totalAu = focusAtom(gameData, (optic) =>
  optic.path("income.total"),
);
export const au = focusAtom(gameData, (optic) => optic.path("income.current"));

export const auIncrement = atom(null, (get, set) => {
  const item = EQUIPMENT_LIST.astronaut;
  const astro = get(astronaut);
  const multiplier = calculateUpgradeMultiplier(astro, item);

  const valuePerClick = Math.max(
    item.auPerSecond * multiplier * astro.value,
    1,
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

  const updateAuValues = (key: string, eq: any, multiplier: number = 1) => {
    const item = EQUIPMENT_LIST[key];

    if (item.equipment === false) return;

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
      const multiplier = calculateUpgradeMultiplier(eq, item);
      updateAuValues(key, eq, multiplier);
    }
  });
});

if (process.env.NODE_ENV !== "production") {
  au.debugLabel = "AUs";
  auIncrement.debugLabel = "AU Increment";
}
