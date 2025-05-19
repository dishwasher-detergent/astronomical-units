"use client";

import { useAtomValue } from "jotai";

import {
  currentLifetimeLevel,
  lifetimeLevelProgress,
  prestigeLevel,
} from "@/atoms/prestige";
import { formatMoney } from "@/lib/formatters";
import { getNextLevelRequirement } from "@/lib/prestige";
import { Progress } from "@/components/ui/progress";
import { Prestige } from "@/components/prestige";

export function PrestigeLevelIndicator() {
  const lifetimeLevel = useAtomValue(currentLifetimeLevel);
  const levelProgress = useAtomValue(lifetimeLevelProgress);
  const currentPrestigeLevel = useAtomValue(prestigeLevel) || 0;

  const nextLevelRequirement = getNextLevelRequirement(
    lifetimeLevel,
    currentPrestigeLevel,
  );

  return (
    <div className="flex w-full flex-col items-center gap-1">
      {lifetimeLevel < 100 ? (
        <div className="flex w-full flex-col items-start">
          <p className="font-bold whitespace-nowrap">Lvl {lifetimeLevel}</p>
          <div className="w-full">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Next Level:</span>
              <span>{formatMoney(nextLevelRequirement)} AU</span>
            </div>
            <Progress value={levelProgress} />
          </div>
        </div>
      ) : (
        <Prestige />
      )}
    </div>
  );
}
