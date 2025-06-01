"use client";

import { useAtom } from "jotai";
import { useMemo } from "react";

import { ShopItem } from "@/components/shop/item/shop";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { au } from "@/atoms/au";
import { createEquipmentAtom } from "@/hooks/useItemAtoms";

export function CrewItem() {
  const [auValue, setAu] = useAtom(au);
  const equipAtoms = useMemo(() => createEquipmentAtom("crew"), ["crew"]);

  return (
    <ShopItem
      elementKey="crew"
      itemAtom={equipAtoms.purchase}
      details={EQUIPMENT_LIST["crew"]}
      currency={{
        value: auValue,
        update: setAu,
        name: "AU",
      }}
      next={"crew"}
    />
  );
}
