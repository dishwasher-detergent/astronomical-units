"use client";

import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { PrestigeStats } from "@/components/statistics/prestige-stats";
import { LifetimeIncomeStats } from "@/components/statistics/lifetime-income-stats";

export function Statistics() {
  return (
    <div className="bg-background grid flex-none grid-cols-2 gap-4 space-y-2 border-b p-4">
      <AusPerSecond />
      <ClickTotalCount />
      <LifetimeIncomeStats />
      <PrestigeStats />
    </div>
  );
}
