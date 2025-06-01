"use client";

import { useAtomValue } from "jotai";

import { Stats } from "@/components/ui/stats";
import {
  prestigeMultiplier,
  prestigePoints,
  prestigeLevel,
  lifetimePrestigePoints,
} from "@/atoms/prestige";
import { formatMoney } from "@/lib/formatters";
import { useBuildTimeReduction } from "@/hooks/useBuildTimeReduction";

export function PrestigeStats() {
  const points = useAtomValue(prestigePoints) || 0;
  const level = useAtomValue(prestigeLevel) || 0;
  const lifetime = useAtomValue(lifetimePrestigePoints) || 0;
  const multiplier = useAtomValue(prestigeMultiplier) || 1;
  const { reduction: buildTimeReduction, level: buildTimeReductionLevel } =
    useBuildTimeReduction();

  if (points === 0 && level === 0) {
    return null;
  }

  return (
    <>
      <Stats label="Prestige Points (PP)" value={points.toString()} />
      <Stats label="Lifetime PP" value={lifetime.toString()} />
      <Stats
        label="Production Multiplier"
        value={`${formatMoney(multiplier)}x`}
      />
      {buildTimeReductionLevel > 0 && (
        <Stats label="Build Time Reduction" value={`${buildTimeReduction}%`} />
      )}
    </>
  );
}
