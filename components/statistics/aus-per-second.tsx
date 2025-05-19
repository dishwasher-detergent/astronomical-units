"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { Stats } from "@/components/ui/stats";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier, formatMoney } from "@/lib/utils";
import { prestigeMultiplier } from "@/atoms/prestige";

export function AusPerSecond() {
  const equip = useAtomValue(equipment);
  const presMultiplier = useAtomValue(prestigeMultiplier) || 1;

  const auPerSecond = useMemo(() => {
    return Object.entries(EQUIPMENT_LIST)
      .map(([key, value]) => {
        if (value.equipment === false) return;
        const item = equip[key];
        let multiplier = calculateUpgradeMultiplier(
          item,
          value,
          presMultiplier,
        );

        return value.auPerSecond * multiplier * (item?.value ?? 0);
      })
      .reduce((acc, val) => (acc ?? 0) + (val ?? 0), 0);
  }, [equip, presMultiplier]);

  return (
    <Stats label="Passive AUs per second" value={formatMoney(auPerSecond)} />
  );
}
