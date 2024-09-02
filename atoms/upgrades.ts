import { atom } from "jotai";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

const upgradeIndex = atom(0);

export const nextUpgrade = atom(
  (get) => {
    const equipment = Object.keys(EQUIPMENT_LIST).map((key) => key);
    return equipment[get(upgradeIndex)];
  },
  (_, set) => {
    set(upgradeIndex, (current) => {
      const equipment = Object.keys(EQUIPMENT_LIST).map((key) => key);

      if (current === equipment.length - 1) {
        return current;
      }

      return current + 1;
    });
  },
);

if (process.env.NODE_ENV !== "production") {
  upgradeIndex.debugLabel = "Upgrade Index";
  nextUpgrade.debugLabel = "Next Upgrade";
}
