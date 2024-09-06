"use client";

import { Astronaut } from "@/components/shop/astronaut";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";

export function Shop() {
  return (
    <div className="relative bg-background md:border-b">
      <p className="hidden bg-background px-4 py-2 font-semibold md:block">
        Store
      </p>
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
