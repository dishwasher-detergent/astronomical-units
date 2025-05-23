"use client";

import { Button } from "@/components/ui/button";
import { Equipment, EquipmentItem, MapPosition } from "@/types";
import { getIconColorClass } from "@/lib/utils";

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
  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute h-fit w-fit p-2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onItemClick}
      title={`View ${item.name}`}
    >
      <div className="flex flex-col items-center justify-center">
        <item.icon
          className={`size-6 ${getIconColorClass(count, equipmentItem, item)}`}
        />
        <span className="mt-1 text-xs font-semibold">{count}</span>
      </div>
    </Button>
  );
}
