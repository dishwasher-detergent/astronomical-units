import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { astronautCurrent } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { show } from "@/atoms/show";
import { AU_WEIGHT } from "@/constants/AU";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { gameData } from "./global";

export const totalAu = focusAtom(gameData, (optic) =>
  optic.path("income.total"),
);
export const au = focusAtom(gameData, (optic) => optic.path("income.current"));

export const auIncrement = atom(null, (get, set) => {
  const newAu = get(au) + get(auWeight);
  const newTotalAu = get(totalAu) + get(auWeight);

  set(au, newAu);
  set(totalAu, newTotalAu);

  Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
    if (newTotalAu >= value.threshold) {
      set(show, key);
    }
  });
});

export const PerSecond = atom(0);

export const auWeight = atom((get) => AU_WEIGHT + get(astronautCurrent));

export const autoIncrement = atom(null, (get, set, seconds: number = 1) => {
  const equip = get(equipment);

  const updateAuValues = (key: string, eq: any, multiplier: number = 1) => {
    const item = EQUIPMENT_LIST[key];

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
  PerSecond.debugLabel = "Per Second";
  auWeight.debugLabel = "AU Weight";
}
