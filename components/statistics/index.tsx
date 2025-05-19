"use client";

import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { PrestigeStats } from "@/components/statistics/prestige-stats";
import { LifetimeIncomeStats } from "@/components/statistics/lifetime-income-stats";

export function Statistics() {
  return (
    <div className="bg-background z-10 flex-none space-y-2 border-b p-4 md:sticky md:top-0">
      <AusPerSecond />
      <ClickTotalCount />
      <LifetimeIncomeStats />
      <PrestigeStats />
    </div>
  );
}
