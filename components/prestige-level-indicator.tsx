"use client";

import { useAtomValue } from "jotai";
import { LucideTrophy } from "lucide-react";

import { lifetimeIncome } from "@/atoms/au";
import { currentLifetimeLevel, lifetimeLevelProgress } from "@/atoms/prestige";
import { PRESTIGE_LEVEL_REQUIREMENTS } from "@/constants/GLOBAL";
import { formatMoney } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { Prestige } from "./prestige";

export function PrestigeLevelIndicator() {
  const lifetimeLevel = useAtomValue(currentLifetimeLevel);
  const levelProgress = useAtomValue(lifetimeLevelProgress);

  const nextLevelRequirement =
    lifetimeLevel < PRESTIGE_LEVEL_REQUIREMENTS.length - 1
      ? PRESTIGE_LEVEL_REQUIREMENTS[lifetimeLevel + 1]
      : null;

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
