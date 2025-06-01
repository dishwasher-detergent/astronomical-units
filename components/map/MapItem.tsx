"use client";

import { Button } from "@/components/ui/button";
import { getIconColor } from "@/lib/map";
import { Equipment, EquipmentItem, MapPosition } from "@/types";
import { LucideConstruction } from "lucide-react";

export type MapItemProps = {
  item: Equipment;
  position: MapPosition;
  count: number;
  equipmentItem: EquipmentItem;
  auPerSecond: number;
  onItemClick: () => void;
};

export function MapItem({
  item,
  position,
  count,
  onItemClick,
  equipmentItem,
}: MapItemProps) {
  console.log(equipmentItem);

  const isBuilding =
    equipmentItem.building && Object.values(equipmentItem.building).length > 0;

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute h-fit w-fit p-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onItemClick}
      title={`View ${item.name}${isBuilding ? " (Building)" : ""}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <item.icon
            className={`size-6 ${isBuilding ? "opacity-50" : ""}`}
            style={{ color: getIconColor(count, equipmentItem, item) }}
          />
          {isBuilding && (
            <LucideConstruction className="absolute -top-0 -left-1/2 size-3.5 translate-x-1/2 animate-pulse text-yellow-500" />
          )}
        </div>
        <span className="mt-1 text-xs font-semibold">{count}</span>
      </div>
    </Button>
  );
}
