"use client";

import { useAtomValue } from "jotai";

import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { DisplayItem } from "@/components/equipment/item";

export function EquipmentDisplay() {
  const items = useAtomValue(equipment);

  if (
    Object.entries(items).filter(([_, value]) => value.value > 0).length === 0
  ) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">
          Earn Austonomical Units{" "}
          <span className="text-xs font-bold">(AU)</span> to buy equipment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(items).map(([key, equipment]) => {
        if (equipment.value == 0) return;
        const item = EQUIPMENT_LIST[key];
        const multiplier = calculateUpgradeMultiplier(equipment, item);
        const auPerSecond = item.auPerSecond * multiplier * equipment.value;
        return (
          <DisplayItem
            item={item}
            equipment={equipment}
            auPerSecond={auPerSecond}
            elementKey={key}
          />
        );
      })}
    </div>
  );
}
