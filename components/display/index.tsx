"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { calculateUpgradeMultiplier } from "@/lib/equipment";
import { DisplayItem } from "@/components/display/DisplayItem";

export function EquipmentDisplay() {
  const items = useAtomValue(equipment);

  const activeEquipment = useMemo(() => {
    return Object.entries(items)
      .filter(([key, value]) => {
        const item = EQUIPMENT_LIST[key];
        return value.value > 0 && item && item.equipment !== false;
      })
      .map(([key, equipment]) => {
        const item = EQUIPMENT_LIST[key];
        const multiplier = calculateUpgradeMultiplier(equipment, item);
        const auPerSecond = item.auPerSecond * multiplier * equipment.value;

        return {
          key,
          item,
          equipment,
          auPerSecond,
        };
      });
  }, [items]);

  if (activeEquipment.length === 0) {
    return (
      <div className="bg-muted/20 m-4 rounded-lg p-4">
        <p className="text-muted-foreground text-center">
          Earn Astronomical Units <span className="font-semibold">(AU)</span> to
          buy equipment.
        </p>
      </div>
    );
  }

  return (
    <div>
      {activeEquipment.map(({ key, item, equipment, auPerSecond }) => (
        <DisplayItem
          key={key}
          item={item}
          equipment={equipment}
          auPerSecond={auPerSecond}
          elementKey={key}
        />
      ))}
    </div>
  );
}
