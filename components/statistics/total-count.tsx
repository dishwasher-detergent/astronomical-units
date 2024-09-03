"use client";

import { useAtomValue } from "jotai";

import { au, PerSecond } from "@/atoms/au";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";
import { useMeasureDifference } from "@/hooks/useMeasureDifference";

export function ClickTotalCount() {
  const auValue = useAtomValue(au);

  useMeasureDifference(PerSecond, auValue);

  return (
    <Stats
      label="Astronomical Units (AU)"
      value={auValue.toLocaleString(LOCALE)}
    />
  );
}
