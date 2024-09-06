"use client";

import { SellBaseEquipment } from "@/components/shop/equipment/sell-base";
import { Badge } from "@/components/ui/badge";
import { DisplayUpgrade } from "@/components/display/upgrade";
import { Equipment, EquipmentItem } from "@/types";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";

export function DisplayItem({
  auPerSecond,
  item,
  equipment,
  elementKey,
}: {
  auPerSecond: number;
  item: Equipment;
  equipment: EquipmentItem;
  elementKey: string;
}) {
  return (
    <div className="border-b border-dashed p-4 md:bg-background">
      <p className="mb-1 flex items-center font-semibold">{item.name}</p>
      <p className="text-sm">{item.description}</p>
      <p className="mb-2 text-sm">
        Generates {auPerSecond.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU/s
      </p>
      <div className="mb-2">
        <p className="mb-2 text-sm font-semibold">
          Purchased Equipment
          <Badge className="ml-2 bg-background" variant="outline">
            {equipment.value}
          </Badge>
        </p>
        <div className="flex flex-row flex-wrap gap-2 rounded-lg bg-muted p-3">
          {[...Array(equipment.value)].map((_, i) => {
            const Icon = item.icon;
            return <Icon key={i} className="size-4 flex-none" />;
          })}
        </div>
      </div>
      <DisplayUpgrade
        item={item}
        equipment={equipment}
        primaryKey={elementKey}
      />
      <SellBaseEquipment elementKey={elementKey} />
    </div>
  );
}
