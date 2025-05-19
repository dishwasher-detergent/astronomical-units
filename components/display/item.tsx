"use client";

import { memo, useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { DisplayUpgrade } from "@/components/display/upgrade";
import { Equipment, EquipmentItem } from "@/types";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";
import { formatMoney } from "@/lib/formatters";
import { useBuildTimeReduction } from "@/hooks/useBuildTimeReduction";

export const DisplayItem = memo(
  ({
    auPerSecond,
    item,
    equipment,
    elementKey,
  }: {
    auPerSecond: number;
    item: Equipment;
    equipment: EquipmentItem;
    elementKey: string;
  }) => {
    const Icon = item.icon;
    const [buildingItems, setBuildingItems] = useState<{
      [key: string]: { count: number; timeLeft: number; progress: number };
    }>({});
    const [now, setNow] = useState(Date.now());
    const { multiplier: buildTimeMultiplier, reduction: buildTimeReduction } =
      useBuildTimeReduction();

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (!equipment.building || Object.keys(equipment.building).length === 0) {
        setBuildingItems({});
        return;
      }

      const updatedBuildingItems: {
        [key: string]: { count: number; timeLeft: number; progress: number };
      } = {};
      const baseBuildTime = item.buildTime || 0;
      const actualBuildTime = baseBuildTime * buildTimeMultiplier;

      Object.entries(equipment.building).forEach(([completionTime, count]) => {
        const timeLeft = Math.max(0, parseInt(completionTime) - now) / 1000; // Convert to seconds
        const elapsed = actualBuildTime - timeLeft;
        const progress = Math.min(
          100,
          Math.max(0, (elapsed / actualBuildTime) * 100),
        );

        updatedBuildingItems[completionTime] = {
          count: count as number,
          timeLeft,
          progress,
        };
      });

      setBuildingItems(updatedBuildingItems);
    }, [now, equipment.building, item.buildTime]);

    const buildingItemCount = Object.values(buildingItems).reduce(
      (sum, item) => sum + item.count,
      0,
    );
    const completedItemCount = equipment.value - buildingItemCount;

    return (
      <div className="hover:bg-muted/30 md:bg-background space-y-3 border-b border-dashed p-4 transition-colors">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <Icon className="text-primary size-5 flex-none" />
              <h3 className="flex items-center font-semibold">{item.name}</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{formatMoney(auPerSecond)} AU/s</Badge>
              <Badge variant="outline">
                Qty: {completedItemCount}
                {buildingItemCount > 0
                  ? ` (${buildingItemCount} building)`
                  : ""}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
        <div className="bg-muted/60 flex flex-row flex-wrap gap-2 rounded-lg p-3">
          {Array.from({ length: completedItemCount }, (_, i) => (
            <Icon key={i} className="text-primary size-4 flex-none" />
          ))}
          {Object.entries(buildingItems).length > 0 &&
            Object.entries(buildingItems).map(([time, data]) => (
              <div
                key={time}
                className="grid size-5 place-items-center rounded-xl"
              >
                <p className="text-xs font-semibold">
                  {Math.ceil(data.timeLeft)}s
                </p>
              </div>
            ))}
        </div>
        <DisplayUpgrade
          item={item}
          equipment={equipment}
          primaryKey={elementKey}
        />
        <SellEquipmentItem elementKey={elementKey} />
      </div>
    );
  },
);

DisplayItem.displayName = "DisplayItem";
