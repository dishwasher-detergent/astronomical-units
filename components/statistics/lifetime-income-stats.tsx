"use client";

import { useAtomValue } from "jotai";
import { totalAu } from "@/atoms/au";
import { formatMoney } from "@/lib/formatters";
import { Stats } from "@/components/ui/stats";

export function LifetimeIncomeStats() {
  const currentLifetimeIncomeValue = useAtomValue(totalAu);

  return (
    <Stats
      label="Lifetime Income"
      value={formatMoney(currentLifetimeIncomeValue)}
    />
  );
}
