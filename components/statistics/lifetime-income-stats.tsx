"use client";

import { useAtomValue } from "jotai";
import { lifetimeIncome } from "@/atoms/au";
import { formatMoney } from "@/lib/formatters";
import { Stats } from "@/components/ui/stats";

export function LifetimeIncomeStats() {
  const currentLifetimeIncomeValue = useAtomValue(lifetimeIncome);

  return (
    <Stats
      label="Lifetime Income"
      value={formatMoney(currentLifetimeIncomeValue)}
    />
  );
}
