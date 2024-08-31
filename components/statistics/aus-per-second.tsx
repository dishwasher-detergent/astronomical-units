"use client";

import { useAtomValue } from "jotai";

import { PerSecond } from "@/atoms/au";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";

export function AusPerSecond() {
  const AusPerSecondValue = useAtomValue(PerSecond);

  return (
    <div>
      <Stats
        label="AUs per second"
        value={AusPerSecondValue.toLocaleString(LOCALE)}
      />
    </div>
  );
}
