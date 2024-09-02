"use client";

import { Astronaut } from "@/components/shop/astronaut";
import { Generation } from "@/components/shop/generation";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";

export function Shop() {
  return (
    <div className="sticky top-0 border-t bg-background">
      <p className="font-bold px-4 py-2">Store</p>
      <div>
        <Astronaut />
        {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
          if (value.equipment === false) return null;

          return <BaseEquipment key={key} elementKey={key} />;
        })}
      </div>
      <Generation />
    </div>
  );
}
