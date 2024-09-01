import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { astronautCurrent } from "@/atoms/astronauts";
import { show } from "@/atoms/show";
import { AU_WEIGHT } from "@/constants/AU";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { equipment, equipmentUpgrades } from "./equipment";

export const totalAu = atomWithStorage("TOTAL_AU", 0);
export const au = atomWithStorage("AU", 0);

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
  const upgrades = get(equipmentUpgrades);

  Object.entries(equip).forEach(([key, value]: any) => {
    if (value > 0) {
      const item = EQUIPMENT_LIST[key];
      const newAu = get(au) + item.auPerSecond * value;
      const newTotalAu = get(totalAu) + item.auPerSecond * value;

      set(au, newAu);
      set(totalAu, newTotalAu);
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
