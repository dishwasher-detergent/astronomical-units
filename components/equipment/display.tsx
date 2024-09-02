"use client";

import { useAtomValue } from "jotai";

import { equipment } from "@/atoms/equipment";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Upgrade } from "@/components/shop/upgrade";

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

    return (
      <div key={key} className="border-b p-4">
        <p className="font-bold flex items-center mb-1">
          {item.name}
          <Badge className="ml-2" variant="outline">
            {equipment.value}
          </Badge>
        </p>
        <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
        <div className="mb-2">
          {item.upgrades &&
            Object.entries(item.upgrades).map(([upgradeKey, _]) => {
              return (
                <Upgrade
                  key={`${key}_${upgradeKey}`}
                  parentKey={key}
                  elementKey={upgradeKey}
                />
              );
            })}
        </div>
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
