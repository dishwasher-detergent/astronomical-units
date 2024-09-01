import { atom } from "jotai";

import { astronautCurrent } from "@/atoms/astronauts";
import { show, showGameOver } from "@/atoms/show";
import { AU_MAXIMUM, AU_WEIGHT } from "@/constants/AU";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AcquirableElementKey } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { equipment } from "./equipment";

export const au = atomWithStorage("AU", 0);

export const auIncrement = atom(null, (get, set) => {
  const newAu = get(au) + get(auWeight);

  set(au, newAu);

  Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
    if (newAu >= value.threshold) {
      set(show, parseInt(key));
    }
  });

  if (newAu > AU_MAXIMUM) {
    set(showGameOver, true);
  }
});

export const autoIncrement = atom(null, (get, set) => {
  const equip = get(equipment);

  Object.entries(equip).forEach(([key, value]: any) => {
    if (value > 0) {
      const itemKey = key as AcquirableElementKey;
      const item = EQUIPMENT_LIST[itemKey];
      const newAu = get(au) + item.incomeMultiplier * value;
      set(au, newAu);
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
