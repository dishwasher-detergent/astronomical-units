"use client";

import { Button } from "@/components/ui/button";
import { getAdjustedPosition, getIconColor } from "@/lib/map";
import { Equipment, EquipmentItem, MapPosition } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const adjustedPosition = getAdjustedPosition(position);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute h-fit w-fit p-2"
      style={{
        left: `${adjustedPosition.x}%`,
        top: `${adjustedPosition.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onItemClick}
      title={`View ${item.name}`}
    >
      <div className="flex flex-col items-center justify-center">
        <item.icon
          className="size-6"
          style={{ color: getIconColor(count, equipmentItem, item) }}
        />
        <span className="mt-1 text-xs font-semibold">{count}</span>
      </div>
    </Button>
  );
}
