"use client";

import { LucideInfo } from "lucide-react";
import { memo } from "react";

import { Tip } from "@/components/ui/tip";
import { Upgrade } from "@/components/shop/upgrade";
import { Equipment, EquipmentItem } from "@/types";

export const DisplayUpgrade = memo(
  ({
    item,
    equipment,
    primaryKey,
  }: {
    item: Equipment;
    equipment: EquipmentItem;
    primaryKey: string;
  }) => {
    if (!item?.upgrades) return null;

    const hasEquippedUpgrades =
      equipment.upgrades &&
      Object.values(equipment.upgrades).some((upgrade) => upgrade > 0);

    const equippedUpgradesElements = hasEquippedUpgrades
      ? Object.entries(equipment.upgrades || {}).flatMap(
          ([upgradeKey, upgradeVal]) => {
            const upgrades = item?.upgrades;
            if (!upgrades || upgradeVal <= 0) return [];

            const Icon = upgrades[upgradeKey].icon;
            return Array.from({ length: upgradeVal }, (_, i) => (
              <Icon
                key={`${upgradeKey}_${i}`}
                className="text-primary size-4 flex-none"
              />
            ));
          },
        )
      : [];

    return (
      <>
        <div>
          <div className="mb-1 flex flex-row items-center gap-1">
            <p className="text-sm font-semibold">Upgrades</p>
            <Tip content="Unlock upgrades by purchasing more of this type of equipment.">
              <LucideInfo className="text-muted-foreground size-3" />
            </Tip>
          </div>
          <div className="flex flex-row gap-1">
            {Object.keys(item.upgrades).map((upgradeKey) => (
              <Upgrade
                key={`${primaryKey}_${upgradeKey}`}
                parentKey={primaryKey}
                elementKey={upgradeKey}
              />
            ))}
          </div>
        </div>

        {hasEquippedUpgrades && (
          <div>
            <p className="mb-1 text-sm font-semibold">Equipped Upgrades</p>
            <div className="bg-muted/60 flex flex-row flex-wrap gap-2 rounded-lg p-3">
              {equippedUpgradesElements}
            </div>
          </div>
        )}
      </>
    );
  },
);

DisplayUpgrade.displayName = "DisplayUpgrade";
