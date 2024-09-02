import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { astronautCurrent } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { show } from "@/atoms/show";
import { AU_WEIGHT } from "@/constants/AU";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
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

export const autoIncrement = atom(null, (get, set) => {
  const equip = get(equipment);

  const calculateMultiplier = (
    item: any,
    upgrades: Record<string, number> | undefined,
  ): number => {
    let multiplier = 1;
    if (upgrades) {
      Object.entries(upgrades).forEach(([upgradeKey, upgradeVal]) => {
        if (upgradeVal > 0) {
          const upgrade = item.upgrades?.[upgradeKey];
          if (upgrade) {
            multiplier += upgradeVal * upgrade.multiplier;
          }
        }
      });
    }
    return multiplier;
  };

  const updateAuValues = (key: string, eq: any, multiplier: number) => {
    const item = EQUIPMENT_LIST[key];
    const newAu = get(au) + item.auPerSecond * multiplier * eq.value;
    const newTotalAu = get(totalAu) + item.auPerSecond * multiplier * eq.value;

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
      const multiplier = calculateMultiplier(item, eq.upgrades);
      updateAuValues(key, eq, multiplier);
    }
  });
});

export const PerSecond = atom(0);

export const auWeight = atom((get) => AU_WEIGHT + get(astronautCurrent));

if (process.env.NODE_ENV !== "production") {
  au.debugLabel = "AUs";
  auIncrement.debugLabel = "AU Increment";
  PerSecond.debugLabel = "Per Second";
  auWeight.debugLabel = "AU Weight";
}
