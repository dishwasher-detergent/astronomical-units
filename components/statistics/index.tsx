"use client";

import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";

export function Statistics() {
  return (
    <div className="z-10 flex-none space-y-2 border-b bg-background p-4 md:sticky md:top-0">
      <ClickTotalCount />
      <AusPerSecond />
    </div>
  );
}
