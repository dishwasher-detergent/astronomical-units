"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LucideCrown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PRESTIGE_LEVEL_REQUIREMENTS } from "@/constants/GLOBAL";
import { totalAu, lifetimeIncome } from "@/atoms/au";
import {
  canPrestige,
  performPrestige,
  potentialPrestigePoints,
  prestigeLevel,
  prestigeMultiplier,
  prestigePoints,
  calculatePrestigeMultiplier,
  currentLifetimeLevel,
  lifetimeLevelProgress,
} from "@/atoms/prestige";
import { DyanmicDrawer } from "@/components/ui/dynamic-drawer";
import { formatMoney } from "@/lib/utils";

export function Prestige() {
  const [open, setOpen] = useState(false);
  const totalAuValue = useAtomValue(totalAu);
  const canPerformPrestige = useAtomValue(canPrestige);
  const potentialPoints = useAtomValue(potentialPrestigePoints);
  const level = useAtomValue(prestigeLevel) || 0;
  const points = useAtomValue(prestigePoints) || 0;
  const multiplier = useAtomValue(prestigeMultiplier) || 1;
  const doPrestige = useSetAtom(performPrestige);

  const currentLifetimeIncomeValue = useAtomValue(lifetimeIncome);
  const lifetimeLevel = useAtomValue(currentLifetimeLevel);
  const levelProgress = useAtomValue(lifetimeLevelProgress);

  const nextLevelRequirement =
    lifetimeLevel < PRESTIGE_LEVEL_REQUIREMENTS.length - 1
      ? PRESTIGE_LEVEL_REQUIREMENTS[lifetimeLevel + 1]
      : null;

  return (
    <DyanmicDrawer
      title="Prestige System"
      description="Reset your progress to gain prestige points."
      open={open}
      setOpen={setOpen}
      button={
        <Button
          size="sm"
          variant={canPerformPrestige ? "default" : "ghost"}
          disabled={!canPerformPrestige}
          className="w-full"
        >
          <LucideCrown className="size-6" />
          Prestige
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <p className="mb-2 font-medium">Level Progress</p>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-sm">Current Level:</p>
            <p className="text-xl font-bold">{lifetimeLevel}/100</p>
          </div>

          {lifetimeLevel < 100 && nextLevelRequirement && (
            <>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Progress: {formatMoney(currentLifetimeIncomeValue)} /{" "}
                {formatMoney(nextLevelRequirement)} AU (
                {Math.round(levelProgress)}%)
              </p>
            </>
          )}

          {lifetimeLevel >= 100 && (
            <p className="text-muted-foreground mt-1 text-sm font-semibold">
              Maximum level reached! You can now prestige to reset and gain
              permanent bonuses.
            </p>
          )}

          <p className="text-muted-foreground mt-2 text-sm">
            Earn income to increase your level from 1 to 100. Once you reach
            level 100, you can prestige to reset your progress and prestige
            points. Each prestige will require you to reach level 100 again, but
            with higher income requirements.
          </p>
        </div>
        <div className="bg-muted rounded-md p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Reset Count</p>
              <p className="font-mono text-xl font-bold">{level}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Current Multiplier</p>
              <p className="font-mono text-xl font-bold">
                {formatMoney(multiplier)}
              </p>
            </div>
          </div>
        </div>{" "}
        <footer className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            {canPerformPrestige
              ? "You will gain 5 prestige points"
              : `You need to reach Level 100 (currently ${lifetimeLevel})`}
          </div>
          <Button onClick={() => doPrestige()} disabled={!canPerformPrestige}>
            Prestige Now
          </Button>
        </footer>
      </div>
    </DyanmicDrawer>
  );
}
