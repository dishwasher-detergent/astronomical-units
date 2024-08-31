import { atom } from "jotai";

import { astronautCurrent } from "@/atoms/astronauts";
import { show, showGameOver } from "@/atoms/show";
import { AU_MAXIMUM, AU_WEIGHT } from "@/constants/AU";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

export const au = atom(0);

export const auIncrement = atom(null, (get, set) => {
  const newAus = get(au) + get(auWeight);

  set(au, newAus);

  Object.entries(EQUIPMENT_LIST).forEach(([key, value]: any) => {
    if (newAus >= value.threshold) {
      set(show, parseInt(key));
    }
  });

  if (newAus > AU_MAXIMUM) {
    set(showGameOver, true);
  }
});

export const PerSecond = atom(0);

export const auWeight = atom((get) => AU_WEIGHT + get(astronautCurrent));

if (process.env.NODE_ENV !== "production") {
  au.debugLabel = "AUs";
  auIncrement.debugLabel = "AU Increment";
  PerSecond.debugLabel = "Per Second";
  auWeight.debugLabel = "AU Weight";
}
