"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { Stats } from "@/components/ui/stats";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";

export function ClickTotalCount() {
  const auValue = useAtomValue(au);

  return (
    <Stats
      label="Astronomical Units (AU)"
      value={auValue.toLocaleString(LOCALE, NUMBER_OPTIONS)}
    />
  );
}
