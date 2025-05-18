"use client";

import { useAtomValue } from "jotai";

import { Stats } from "@/components/ui/stats";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import {
  prestigeMultiplier,
  prestigePoints,
  prestigeLevel,
  lifetimePrestigePoints,
  potentialPrestigePoints,
} from "@/atoms/prestige";

export function PrestigeStats() {
  const points = useAtomValue(prestigePoints) || 0;
  const level = useAtomValue(prestigeLevel) || 0;
  const lifetime = useAtomValue(lifetimePrestigePoints) || 0;
  const potential = useAtomValue(potentialPrestigePoints);
  const multiplier = useAtomValue(prestigeMultiplier) || 1;

  if (points === 0 && level === 0) {
    return null;
  }

  return (
    <>
      <Stats label="Prestige Level" value={level.toString()} />
      <Stats label="Current Prestige Points" value={points.toString()} />
      <Stats label="Lifetime Prestige Points" value={lifetime.toString()} />
      <Stats
        label="Production Multiplier"
        value={`${multiplier.toLocaleString(LOCALE, NUMBER_OPTIONS)}x`}
      />
      {potential > 0 && (
        <Stats
          label="Potential Prestige Points"
          value={`+${potential}`}
          variant="highlight"
        />
      )}
    </>
  );
}
