"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { equipment } from "@/atoms/equipment";
import { EquipmentWithPosition } from "@/components/map/types";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { calculateUpgradeMultiplier } from "@/lib/equipment";

/**
 * Hook to generate equipment items with positions for the map
 */
export function useMapEquipment(): EquipmentWithPosition[] {
  const items = useAtomValue(equipment);

  return useMemo(
    () =>
      Object.entries(items)
        .filter(([key, value]) => {
          const item = EQUIPMENT_LIST[key];
          return value.value > 0 && item;
        })
        .map(([key, equipmentItem]) => {
          const item = EQUIPMENT_LIST[key];
          const multiplier = calculateUpgradeMultiplier(equipmentItem, item);
          return {
            key,
            item,
            equipmentItem,
            position: item.mapPosition!,
            count: equipmentItem.value,
            auPerSecond: item.auPerSecond * multiplier * equipmentItem.value,
          };
        }),
    [items],
  );
}
