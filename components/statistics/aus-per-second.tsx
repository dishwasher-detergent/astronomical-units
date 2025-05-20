"use client";

import { useAtomValue } from "jotai";

import { Stats } from "@/components/ui/stats";
import { formatMoney } from "@/lib/formatters";
import { equipmentProductionRates } from "@/atoms/au";

export function AusPerSecond() {
  const productionRates = useAtomValue(equipmentProductionRates);

  const auPerSecond = [...productionRates.values()].reduce((a, b) => a + b, 0);

  return <Stats label="AU/s" value={formatMoney(auPerSecond)} />;
}
