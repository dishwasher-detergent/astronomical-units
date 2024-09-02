"use client";

import { Astronaut } from "@/components/shop/astronaut";
import { Generation } from "@/components/shop/generation";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";

export function Shop() {
  return (
    <div className="sticky top-0 overflow-y-auto bg-background md:border-t">
      <p className="sticky top-0 hidden bg-background px-4 py-2 font-bold md:block">
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
