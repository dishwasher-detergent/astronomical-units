import { atom } from "jotai";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";

const upgradeIndex = atom(0);

export const nextUpgrade = atom(
  (get) => {
    const equipment = Object.keys(EQUIPMENT_LIST).map((key) => key);
    return equipment[get(upgradeIndex)];
  },
  (_, set) => {
    set(upgradeIndex, (current) => {
      const equipment = Object.entries(EQUIPMENT_LIST).map(
        ([key, value]) => key,
      );

      if (current === equipment.length - 1) {
        return current;
      }

      return current + 2;
    });
  },
);

const prestigeUpgradeIndex = atom(0);

export const nextPrestigeUpgrade = atom(
  (get) => {
    const equipment = Object.keys(PRESTIGE_UPGRADES).map((key) => key);
    return equipment[get(prestigeUpgradeIndex)];
  },
  (_, set) => {
    set(prestigeUpgradeIndex, (current) => {
      const equipment = Object.entries(PRESTIGE_UPGRADES).map(
        ([key, value]) => key,
      );

      if (current === equipment.length - 1) {
        return current;
      }

      return current + 2;
    });
  },
);

if (process.env.NODE_ENV !== "production") {
  upgradeIndex.debugLabel = "Upgrade Index";
  nextUpgrade.debugLabel = "Next Upgrade";
  prestigeUpgradeIndex.debugLabel = "Prestige Upgrade Index";
  nextPrestigeUpgrade.debugLabel = "Next Prestige Upgrade";
}
