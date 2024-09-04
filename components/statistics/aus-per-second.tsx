"use client";

import { useAtomValue } from "jotai";

import { Stats } from "@/components/ui/stats";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";

export function AusPerSecond() {
  const equip = useAtomValue(equipment);
  const auPerSecond = Object.entries(EQUIPMENT_LIST)
    .map(([key, value]) => {
      if (value.equipment === false) return;
      const item = equip[key];
      let multiplier = calculateUpgradeMultiplier(item, value);

      return value.auPerSecond * multiplier * (item?.value ?? 0);
    })
    .reduce((acc, val) => (acc ?? 0) + (val ?? 0), 0);

  return (
    <Stats
      label="Passive AUs per second"
      value={auPerSecond?.toLocaleString(LOCALE, NUMBER_OPTIONS)}
    />
  );
}
