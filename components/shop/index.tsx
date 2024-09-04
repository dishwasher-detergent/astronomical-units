"use client";

import { useAtomValue } from "jotai";

import { Astronaut } from "@/components/shop/astronaut";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";
import { au } from "@/atoms/au";
import { LOCALE } from "@/constants/GLOBAL";

export function Shop() {
  const auVal = useAtomValue(au);

  return (
    <div className="relative bg-background md:border-b">
      <p className="hidden bg-background px-4 py-2 font-bold md:block">Store</p>
      <div className="sticky top-0 z-10 mb-2 border-b bg-background pb-2 md:hidden">
        <p className="font-bold">Balance</p>
        <p>{auVal.toLocaleString(LOCALE)} AU</p>
      </div>
      <div className="w-full space-y-2 md:space-y-0">
        <Astronaut />
        {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
          if (value.equipment === false) return null;

          return <BaseEquipment key={key} elementKey={key} />;
        })}
      </div>
    </div>
  );
}
