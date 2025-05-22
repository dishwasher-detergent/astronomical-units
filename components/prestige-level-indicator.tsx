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
    <div className="flex w-full">
      <div className="flex w-full flex-col items-start gap-1">
        <p className="font-semibold whitespace-nowrap">Lvl {lifetimeLevel}</p>
        <div className="w-full">
          {lifetimeLevel < 100 ? (
            <>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Next Level:</span>
                <span>{formatMoney(nextLevelRequirement)} AU</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </>
          ) : (
            <Prestige />
          )}
        </div>
      </div>
    </div>
  );
}
