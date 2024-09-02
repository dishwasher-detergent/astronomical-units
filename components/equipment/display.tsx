"use client";

import { useAtomValue } from "jotai";

import { equipment } from "@/atoms/equipment";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Upgrade } from "@/components/shop/upgrade";
import { calculateUpgradeMultiplier } from "@/lib/utils";

export function EquipmentDisplay() {
  const items = useAtomValue(equipment);

  if (
    Object.entries(items).filter(([_, value]) => value.value > 0).length === 0
  ) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">
          Earn Austonomical Units(AU) to buy equipment.
        </p>
      </div>
    );
  }

  return Object.entries(items).map(([key, equipment]) => {
    if (equipment.value == 0) return;
    const item = EQUIPMENT_LIST[key];
    const multiplier = calculateUpgradeMultiplier(equipment, item);
    const auPerSecond = item.auPerSecond * multiplier * equipment.value;

    return (
      <div key={key} className="bg-muted/25 p-4 md:border-b md:bg-background">
        <p className="mb-1 flex items-center font-bold">
          {item.name}
          <Badge className="ml-2" variant="outline">
            {equipment.value}
          </Badge>
        </p>
        <p className="text-sm md:text-xs">{item.description}</p>
        <p className="mb-2 text-sm md:text-xs">Generates {auPerSecond} AU/s</p>
        {item.upgrades && (
          <div className="mb-2">
            <p className="mb-1 text-sm font-semibold md:text-xs">Upgrades</p>
            <div className="flex flex-row gap-1">
              {Object.entries(item.upgrades).map(([upgradeKey, _]) => {
                return (
                  <Upgrade
                    key={`${key}_${upgradeKey}`}
                    parentKey={key}
                    elementKey={upgradeKey}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-row flex-wrap gap-2 rounded-lg bg-muted p-3">
          {[...Array(equipment.value)].map((_, i) => {
            const Icon = item.icon;

            return <Icon key={i} className="size-4 flex-none" />;
          })}
        </div>
      </div>
    );
  });
}
