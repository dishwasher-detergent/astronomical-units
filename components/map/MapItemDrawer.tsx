"use client";

import { LucideConstruction } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";
import { DisplayItem } from "@/components/display/DisplayItem";
import { Equipment, EquipmentItem, MapPosition } from "@/types";
import { getIconColor } from "@/lib/map";

export type MapItemDrawerProps = {
  item: Equipment;
  position: MapPosition;
  count: number;
  equipmentItem: EquipmentItem;
  auPerSecond: number;
  elementKey: string;
};

export function MapItemDrawer({
  item,
  position,
  count,
  equipmentItem,
  auPerSecond,
  elementKey,
}: MapItemDrawerProps) {
  const isBuilding =
    equipmentItem.building && Object.values(equipmentItem.building).length > 0;

  return (
    <DynamicDrawer
      button={
        <Button
          size="icon"
          variant="ghost"
          className="absolute h-fit w-fit p-2"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          title={`View ${item.name}`}
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
      }
    >
      <DisplayItem
        item={item}
        equipment={equipmentItem}
        auPerSecond={auPerSecond}
        elementKey={elementKey}
      />
    </DynamicDrawer>
  );
}
