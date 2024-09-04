"use client";

import { useAtomValue } from "jotai";
import { LucideInfo } from "lucide-react";

import { equipment } from "@/atoms/equipment";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Upgrade } from "@/components/shop/upgrade";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { SellBaseEquipment } from "../shop/equipment/sell-base";
import { au } from "@/atoms/au";
import { LOCALE } from "@/constants/GLOBAL";
import { Tip } from "@/components/ui/tip";

export function EquipmentDisplay() {
  const items = useAtomValue(equipment);
  const auVal = useAtomValue(au);

  if (
    Object.entries(items).filter(([_, value]) => value.value > 0).length === 0
  ) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">
          Earn Austonomical Units{" "}
          <span className="text-xs font-bold">(AU)</span> to buy equipment.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 mb-2 border-b bg-background pb-2 md:hidden">
        <p className="font-bold">Balance</p>
        <p>{auVal.toLocaleString(LOCALE)} AU</p>
      </div>
      <div className="space-y-2">
        {Object.entries(items).map(([key, equipment]) => {
          if (equipment.value == 0) return;
          const item = EQUIPMENT_LIST[key];
          const multiplier = calculateUpgradeMultiplier(equipment, item);
          const auPerSecond = item.auPerSecond * multiplier * equipment.value;
          return (
            <div
              key={key}
              className="rounded-lg bg-muted/50 p-4 md:rounded-none md:border-b md:bg-background"
            >
              <p className="mb-1 flex items-center font-bold">{item.name}</p>
              <p className="text-sm md:text-xs">{item.description}</p>
              <p className="mb-2 text-sm md:text-xs">
                Generates {auPerSecond} AU/s
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
              {item.upgrades && (
                <div className="mb-2">
                  <div className="mb-1 flex flex-row items-center gap-1">
                    <p className="text-sm font-semibold">Upgrades</p>
                    <Tip content="Unlock upgrades by purchasing more of this type of equipment.">
                      <LucideInfo className="size-3" />
                    </Tip>
                  </div>
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
              <div className="mb-2">
                <p className="mb-2 text-sm font-semibold">Equiped Upgrades</p>
                <div className="flex flex-row flex-wrap gap-2 rounded-lg bg-muted p-3">
                  {equipment.upgrades &&
                    Object.entries(equipment.upgrades).map(
                      ([upgradeKey, upgradeVal]) => {
                        return [...Array(upgradeVal)].map((_, i) => {
                          const upgrades = item?.upgrades;
                          if (!upgrades) return;
                          const Icon = upgrades[upgradeKey].icon;
                          return <Icon key={i} className="size-4 flex-none" />;
                        });
                      },
                    )}
                </div>
              </div>
              <SellBaseEquipment elementKey={key} />
            </div>
          );
        })}
      </div>
    </>
  );
}
