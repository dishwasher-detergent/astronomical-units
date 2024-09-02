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
        <p className="text-muted-foreground">No equipment yet!</p>
      </div>
    );
  }

  return Object.entries(items).map(([key, equipment]) => {
    if (equipment.value == 0) return;
    const item = EQUIPMENT_LIST[key];
    const multiplier = calculateUpgradeMultiplier(equipment, item);
    const auPerSecond = item.auPerSecond * multiplier * equipment.value;

    return (
      <div key={key} className="border-b p-4">
        <p className="font-bold flex items-center mb-1">
          {item.name}
          <Badge className="ml-2" variant="outline">
            {equipment.value}
          </Badge>
        </p>
        <p className="text-xs">{item.description}</p>
        <p className="text-xs mb-2">Generates {auPerSecond} AU/s</p>
        {item.upgrades && (
          <div className="mb-2">
            <p className="text-xs font-semibold mb-1">Upgrades</p>
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
        <div className="flex flex-row flex-wrap gap-2 p-3 bg-muted rounded-lg">
          {[...Array(equipment.value)].map((_, i) => {
            const Icon = item.icon;

            return <Icon key={i} className="size-4 flex-none" />;
          })}
        </div>
      </div>
    );
  });
}
