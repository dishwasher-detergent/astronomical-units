"use client";

import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { DisplayUpgrade } from "@/components/display/upgrade";
import { Equipment, EquipmentItem } from "@/types";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";
import { formatMoney } from "@/lib/formatters";

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
      <div className="hover:bg-muted/30 md:bg-background space-y-3 border-b border-dashed p-4 transition-colors">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <Icon className="text-primary size-5 flex-none" />
              <h3 className="flex items-center font-semibold">{item.name}</h3>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{formatMoney(auPerSecond)} AU/s</Badge>
              <Badge variant="outline">Qty: {equipment.value}</Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </div>
        {equipment.value > 0 && (
          <div className="bg-muted/60 flex flex-row flex-wrap gap-2 rounded-lg p-3">
            {Array.from({ length: equipment.value }, (_, i) => (
              <Icon key={i} className="text-primary size-4 flex-none" />
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
