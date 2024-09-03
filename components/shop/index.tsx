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
      <p className="hidden bg-background px-4 py-2 font-bold md:block">
        Store
      </p>
      <div className="mb-2 md:hidden sticky top-0 bg-background z-10 border-b pb-2">
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
