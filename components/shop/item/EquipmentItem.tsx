"use client";

import { au } from "@/atoms/au";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useAcquireCost, useSellCost } from "@/hooks/useItemCost";
import { createEquipmentAtom } from "@/hooks/useItemAtoms";
import { ShopItem } from "@/components/shop/item/ShopItem";
import { SellItem } from "@/components/shop/item/SellItem";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { nextUpgrade } from "@/atoms/upgrades";

interface EquipmentItemProps {
  elementKey: string;
}

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
      nextUpgrade={nextUpgrade}
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
