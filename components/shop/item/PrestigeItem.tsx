"use client";

import { atom, useAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import { ShopItem } from "@/components/shop/item/ShopItem";
import {
  lifetimePrestigePoints,
  prestigePoints,
  prestigeUpgrades,
} from "@/atoms/prestige";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";

interface PrestigeItemProps {
  upgradeKey: string;
}

const findNextItemByThreshold = (currentValue: number): string => {
  const upgrades = Object.entries(PRESTIGE_UPGRADES).sort((a, b) => {
    return a[1].threshold - b[1].threshold;
  });

  const nextUpgrade = upgrades.find(([_, upgrade]) => {
    return upgrade.threshold > currentValue;
  });

  return nextUpgrade ? nextUpgrade[0] : upgrades[upgrades.length - 1][0];
};

export function PrestigeItem({ upgradeKey }: PrestigeItemProps) {
  const [ppValue, setPP] = useAtom(lifetimePrestigePoints);
  const upgrade = focusAtom(prestigeUpgrades, (optic) =>
    optic.path(upgradeKey),
  );
  const upgradeAtom = atom(
    (get) => get(upgrade) || 0,
    (_, set, newValue?: number) => {
      if (typeof newValue === "number") {
        set(upgrade, newValue);
      } else {
        set(upgrade, (current = 0) => current + 1);
      }
    },
  );
  const element = PRESTIGE_UPGRADES[upgradeKey];
  const maxCount = element.maxCount || Infinity;

  const nextItem = findNextItemByThreshold(ppValue);

  return (
    <ShopItem
      elementKey={upgradeKey}
      itemAtom={upgradeAtom}
      details={element}
      currency={{
        value: ppValue,
        update: setPP,
        name: "PP",
      }}
      maxCount={maxCount}
      next={nextItem}
    />
  );
}
