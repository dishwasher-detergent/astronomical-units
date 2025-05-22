"use client";

import { useAtom } from "jotai";
import { useMemo } from "react";

import { au } from "@/atoms/au";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useSellCost } from "@/hooks/useItemCost";
import { createEquipmentAtom } from "@/hooks/useItemAtoms";
import { ShopItem } from "@/components/shop/item/ShopItem";
import { SellItem } from "@/components/shop/item/SellItem";

interface EquipmentItemProps {
  elementKey: string;
}

const findNextItemByThreshold = (currentValue: number): string => {
  const upgrades = Object.entries(EQUIPMENT_LIST).sort((a, b) => {
    return a[1].threshold - b[1].threshold;
  });

  const nextUpgrade = upgrades.find(([_, upgrade]) => {
    return upgrade.threshold > currentValue;
  });

  return nextUpgrade ? nextUpgrade[0] : upgrades[upgrades.length - 1][0];
};

export function EquipmentItem({ elementKey }: EquipmentItemProps) {
  const [auValue, setAu] = useAtom(au);
  const equipAtoms = useMemo(
    () => createEquipmentAtom(elementKey),
    [elementKey],
  );
  return (
    <ShopItem
      elementKey={elementKey}
      itemAtom={equipAtoms.purchase}
      details={EQUIPMENT_LIST[elementKey]}
      currency={{
        value: auValue,
        update: setAu,
        name: "AU",
      }}
      next={findNextItemByThreshold(auValue)}
    />
  );
}

export function SellEquipmentItem({ elementKey }: EquipmentItemProps) {
  const [auValue, setAu] = useAtom(au);
  const equipAtoms = useMemo(
    () => createEquipmentAtom(elementKey),
    [elementKey],
  );

  return (
    <SellItem
      elementKey={elementKey}
      itemAtom={equipAtoms.sell}
      details={EQUIPMENT_LIST[elementKey]}
      currency={{
        update: setAu,
        name: "AU",
      }}
      getSellPrice={useSellCost}
    />
  );
}
