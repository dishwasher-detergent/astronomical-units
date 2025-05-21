"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useMemo, useState, useEffect } from "react";

import { equipment } from "@/atoms/equipment";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Button } from "@/components/ui/button";
import { calculateUpgradeMultiplier } from "@/lib/equipment";
import { useIsMobile } from "@/hooks/use-mobile";
import { DynamicDrawer } from "../ui/dynamic-drawer";
import { DisplayItem } from "../display/item";

export function Map() {
  const isMobile = useIsMobile();
  const items = useAtomValue(equipment);
  const setScrollToEquipment = useSetAtom(scrollToEquipmentAtom);
  const [stars, setStars] = useState<
    Array<{ size: number; x: number; y: number; duration: number }>
  >([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map(() => ({
      size: 0.5 + Math.random() * 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  const equipmentWithPositions = useMemo(() => {
    return Object.entries(items)
      .filter(([key, value]) => {
        const item = EQUIPMENT_LIST[key];

        return value.value > 0 && item;
      })
      .map(([key, equipmentItem], index) => {
        const item = EQUIPMENT_LIST[key];
        const multiplier = calculateUpgradeMultiplier(equipmentItem, item);

        const position = item.mapPosition!;

        return {
          key,
          item,
          equipmentItem,
          position,
          count: equipmentItem.value,
          auPerSecond: item.auPerSecond * multiplier * equipmentItem.value,
        };
      });
  }, [items]);

  return (
    <div className="bg-muted relative grid size-full place-items-center">
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="bg-muted-foreground absolute animate-pulse rounded-full opacity-70"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          />
        ))}
      </div>
      {equipmentWithPositions.map(
        ({ key, item, position, count, equipmentItem, auPerSecond }) =>
          isMobile ? (
            <DynamicDrawer
              button={
                <Button
                  key={key}
                  size="icon"
                  variant="ghost"
                  className="absolute h-fit w-fit p-2 transition-all hover:scale-110"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={`View ${item.name}`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <item.icon
                      className={`size-6 ${count > 10 ? "text-amber-400" : "currentColor"}`}
                    />
                    <span className="mt-1 text-xs font-semibold">{count}</span>
                  </div>
                </Button>
              }
            >
              <DisplayItem
                key={key}
                item={item}
                equipment={equipmentItem}
                auPerSecond={auPerSecond}
                elementKey={key}
              />
            </DynamicDrawer>
          ) : (
            <Button
              key={key}
              size="icon"
              variant="ghost"
              className="absolute h-fit w-fit p-2 transition-all hover:scale-110"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setScrollToEquipment(key)}
              title={`View ${item.name}`}
            >
              <div className="flex flex-col items-center justify-center">
                <item.icon
                  className={`size-6 ${count > 10 ? "text-amber-400" : "currentColor"}`}
                />
                <span className="mt-1 text-xs font-semibold">{count}</span>
              </div>
            </Button>
          ),
      )}
      <svg className="stroke-muted-foreground/30 pointer-events-none absolute inset-0 h-full w-full">
        {equipmentWithPositions.length > 1 &&
          equipmentWithPositions.slice(0, -1).map((item, index) => {
            const next = equipmentWithPositions[index + 1];
            return (
              <line
                color="currentColor"
                key={`line-${index}`}
                x1={`${item.position.x}%`}
                y1={`${item.position.y}%`}
                x2={`${next.position.x}%`}
                y2={`${next.position.y}%`}
                strokeWidth="1"
                strokeDasharray="4"
              />
            );
          })}
      </svg>
      {equipmentWithPositions.length === 0 && (
        <div className="z-10 rounded-lg bg-black/30 p-4 text-center">
          <p className="text-muted-foreground">
            Purchase equipment to see items on the map
          </p>
        </div>
      )}
    </div>
  );
}
