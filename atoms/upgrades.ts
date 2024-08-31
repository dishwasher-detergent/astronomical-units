import { atom } from "jotai";

import { EQUIPMENT_ORDER } from "@/constants/EQUIPMENT_DETAILS";

const upgradeIndex = atom(0);

export const nextUpgrade = atom(
  (get) => EQUIPMENT_ORDER[get(upgradeIndex)],
  (_, set) => {
    set(upgradeIndex, (current) => {
      if (current === EQUIPMENT_ORDER.length - 1) {
        return current;
      }

      return current + 1;
    });
  }
);

if (process.env.NODE_ENV !== "production") {
  upgradeIndex.debugLabel = "Upgrade Index";
  nextUpgrade.debugLabel = "Next Upgrade";
}
