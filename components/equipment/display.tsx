"use client";

import { useAtomValue } from "jotai";

import { equipment } from "@/atoms/equipment";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

export function EquipmentDisplay() {
  const items = useAtomValue(equipment);

  if (Object.entries(items).filter(([_, value]) => value > 0).length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No equipment yet!</p>
      </div>
    );
  }

  return Object.entries(items).map(([key, value]) => {
    if (value == 0) return;
    const item = EQUIPMENT_LIST[key];

    return (
      <div key={key} className="border-b p-4">
        <p className="font-bold flex items-center mb-1">
          {item.name}
          <Badge className="ml-2" variant="outline">
            {value}
          </Badge>
        </p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
        <div className="flex flex-row flex-wrap gap-2 mt-2 p-3 bg-muted rounded-lg">
          {[...Array(value)].map((_, i) => {
            const Icon = item.icon;

            return <Icon key={i} className="size-4 flex-none" />;
          })}
        </div>
      </div>
    );
  });
}
