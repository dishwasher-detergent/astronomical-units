"use client";

import { useAtomValue } from "jotai";

import { clicksPerSecond } from "@/atoms/global";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";

export function ClicksPerSecond() {
  const clicksPerSecondValue = useAtomValue(clicksPerSecond);

  return (
    <div>
      <Stats
        label="Clicks per second"
        value={clicksPerSecondValue.toLocaleString(LOCALE)}
      />
    </div>
  );
}
