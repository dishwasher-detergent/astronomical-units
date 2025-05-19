"use client";

import { crewCurrent } from "@/atoms/crew";
import { ShopItem } from "@/components/shop/item/ShopItem";
import { useAcquireCost } from "@/hooks/useItemCost";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useAtom } from "jotai";
import { au } from "@/atoms/au";
import { nextUpgrade } from "@/atoms/upgrades";

export function CrewItem() {
  const [auValue, setAu] = useAtom(au);
  return (
    <ShopItem
      elementKey="crew"
      itemAtom={crewCurrent}
      details={EQUIPMENT_LIST["crew"]}
      currency={{
        value: auValue,
        update: setAu,
        name: "AU",
      }}
      getCost={useAcquireCost}
      nextUpgrade={nextUpgrade}
    />
  );
}
