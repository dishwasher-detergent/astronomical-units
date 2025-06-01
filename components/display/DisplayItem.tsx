"use client";

import { memo, useState, useEffect, useRef, useMemo } from "react";
import { useAtomValue } from "jotai";

import { DisplayUpgrade } from "@/components/display/DisplayUpgrade";
import { Equipment, EquipmentItem } from "@/types";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";
import { formatMoney } from "@/lib/formatters";
import { useBuildTimeReduction } from "@/hooks/useBuildTimeReduction";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";
import { DisplayBuilding } from "@/components/display/DisplayBuilding";

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

    const buildingItems = useMemo(() => {
      if (!equipment.building || Object.keys(equipment.building).length === 0) {
        return {};
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
      return updatedBuildingItems;
    }, [now, equipment.building, item.buildTime, buildTimeMultiplier]);

    const buildingItemCount = useMemo(() => {
      return Object.values(buildingItems).reduce(
        (sum, item) => sum + item.count,
        0,
      );
    }, [buildingItems]);

    const completedItemCount = useMemo(() => {
      return equipment.value - buildingItemCount;
    }, [equipment.value, buildingItemCount]);

    return (
      <article
        ref={itemRef}
        className="w-full space-y-2 border-dashed p-4 md:border-b md:px-4 md:py-3"
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
        <DisplayBuilding buildingItems={buildingItems} />
        <DisplayUpgrade
          item={item}
          equipment={equipment}
          primaryKey={elementKey}
        />
        <footer className="mt-6">
          <SellEquipmentItem elementKey={elementKey} />
        </footer>
      </article>
    );
  },
);

DisplayItem.displayName = "DisplayItem";
