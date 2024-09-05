"use client";

import { LucideInfo } from "lucide-react";

import { Tip } from "@/components/ui/tip";
import { Upgrade } from "@/components/shop/upgrade";
import { Equipment, EquipmentItem } from "@/types";

export function DisplayUpgrade({
  item,
  equipment,
  primaryKey,
}: {
  item: Equipment;
  equipment: EquipmentItem;
  primaryKey: string;
}) {
  return (
    <>
      {item?.upgrades && (
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
                  key={`${primaryKey}_${upgradeKey}`}
                  parentKey={primaryKey}
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
    </>
  );
}
