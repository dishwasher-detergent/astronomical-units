"use client";

import { memo, useState, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";

import { Badge } from "@/components/ui/badge";
import { DisplayUpgrade } from "@/components/display/upgrade";
import { Equipment, EquipmentItem } from "@/types";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";
import { formatMoney } from "@/lib/formatters";
import { useBuildTimeReduction } from "@/hooks/useBuildTimeReduction";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";

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
    const itemRef = useRef<HTMLDivElement>(null);
    const scrollToEquipment = useAtomValue(scrollToEquipmentAtom);
    const [buildingItems, setBuildingItems] = useState<{
      [key: string]: { count: number; timeLeft: number; progress: number };
    }>({});
    const [now, setNow] = useState(Date.now());
    const { multiplier: buildTimeMultiplier } = useBuildTimeReduction();

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (scrollToEquipment === elementKey && itemRef.current) {
        itemRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [scrollToEquipment, elementKey]);

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
        const timeLeft = Math.max(0, parseInt(completionTime) - now) / 1000;
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
      <article
        ref={itemRef}
        className="w-full space-y-2 border-dashed md:border-b md:px-4 md:py-3"
      >
        <header className="flex items-start justify-between gap-6">
          <div>
            <h3 className="flex items-center gap-2">
              <Icon className="size-4" aria-hidden="true" />
              <span className="truncate">{item.name}</span>
            </h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
          <output
            aria-label="Current count"
            className="text-muted-foreground text-3xl font-bold"
          >
            {completedItemCount}
          </output>
        </header>
        <dl className="text-muted-foregroun flex items-center gap-1 text-sm">
          <dd className="font-mono">+{formatMoney(auPerSecond)}</dd>
          <dt>AU/s</dt>
        </dl>
        <DisplayUpgrade
          item={item}
          equipment={equipment}
          primaryKey={elementKey}
        />
        <footer className="mt-3">
          <SellEquipmentItem elementKey={elementKey} />
        </footer>
      </article>
    );
  },
);

DisplayItem.displayName = "DisplayItem";
