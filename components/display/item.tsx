"use client";

import { Badge } from "@/components/ui/badge";
import { DisplayUpgrade } from "@/components/display/upgrade";
import { Equipment, EquipmentItem } from "@/types";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";
import { memo } from "react";

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

    return (
      <div className="space-y-3 border-b border-dashed p-4 transition-colors hover:bg-muted/30 md:bg-background">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <Icon className="size-5 flex-none text-primary" />
              <h3 className="flex items-center font-semibold">{item.name}</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                {auPerSecond.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU/s
              </Badge>
              <Badge variant="outline">Qty: {equipment.value}</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
        {equipment.value > 0 && equipment.value <= 10 && (
          <div className="flex flex-row flex-wrap gap-2 rounded-lg bg-muted/60 p-3">
            {Array.from({ length: equipment.value }, (_, i) => (
              <Icon key={i} className="size-4 flex-none text-primary" />
            ))}
          </div>
        )}
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
