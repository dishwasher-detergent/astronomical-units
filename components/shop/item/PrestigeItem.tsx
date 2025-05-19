"use client";

import { atom, useAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { ShopItem } from "@/components/shop/item/ShopItem";
import {
  prestigePoints,
  prestigeUpgrades,
  prestigeUpgradeFamily,
} from "@/atoms/prestige";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { nextPrestigeUpgrade } from "@/atoms/upgrades";
import { useNextPrestigeUpgrade } from "@/hooks/useNextUpgrade";

interface PrestigeItemProps {
  upgradeKey: string;
}

export function PrestigeItem({ upgradeKey }: PrestigeItemProps) {
  const [ppValue, setPP] = useAtom(prestigePoints);
  const upgrade = focusAtom(prestigeUpgrades, (optic) =>
    optic.path(upgradeKey),
  );

  const upgradeAtom = atom(
    (get) => get(upgrade) || 0,
    (_, set) => {
      set(upgrade, (current = 0) => current + 1);
    },
  );
  const element = PRESTIGE_UPGRADES[upgradeKey];
  const currentCount = useAtomValue(upgrade) || 0;
  const maxCount = element.maxCount || Infinity;

  const getPrestigeCost = () => element.cost;

  return (
    <ShopItem
      elementKey={upgradeKey}
      itemAtom={upgradeAtom}
      details={element}
      currency={{
        value: ppValue,
        update: setPP,
        name: "Prestige Points",
      }}
      getCost={() => getPrestigeCost()}
      nextUpgrade={nextPrestigeUpgrade}
      useNextHook={useNextPrestigeUpgrade}
      maxCount={maxCount}
    />
  );
}
