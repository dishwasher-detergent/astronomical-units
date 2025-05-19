"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LucideArrowBigUpDash, LucideRotate3D } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { totalAu } from "@/atoms/au";
import {
  canPrestige,
  performPrestige,
  potentialPrestigePoints,
  prestigeLevel,
  prestigeMultiplier,
  prestigePoints,
  calculatePrestigeMultiplier,
} from "@/atoms/prestige";
import { DyanmicDrawer } from "@/components/ui/dynamic-drawer";

export function Prestige() {
  const [open, setOpen] = useState(false);
  const totalAuValue = useAtomValue(totalAu);
  const canPerformPrestige = useAtomValue(canPrestige);
  const potentialPoints = useAtomValue(potentialPrestigePoints);
  const level = useAtomValue(prestigeLevel) || 0;
  const points = useAtomValue(prestigePoints) || 0;
  const multiplier = useAtomValue(prestigeMultiplier) || 1;
  const doPrestige = useSetAtom(performPrestige);

  return (
    <DyanmicDrawer
      title="Prestige System"
      description="Reset your progress to gain permanent production multipliers"
      open={open}
      setOpen={setOpen}
      button={
        <Button
          size="icon"
          variant={canPerformPrestige ? "default" : "ghost"}
          disabled={!canPerformPrestige}
        >
          <LucideArrowBigUpDash className="size-6" />
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <p className="mb-2 font-medium">Prestige Rewards</p>
          <p className="text-sm text-muted-foreground">
            Prestige points are earned based on your total AU. You&apos;ll earn{" "}
            <span className="font-bold">{potentialPoints}</span> prestige points
            if you reset now, increasing your multiplier to{" "}
            <span className="font-bold">
              {calculatePrestigeMultiplier(
                points + potentialPoints,
              ).toLocaleString(LOCALE, NUMBER_OPTIONS)}
              x
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Each prestige point provides a bonus to all production. The first 10
            points give 25% each, with points beyond that providing additional
            scaling bonuses.
          </p>
          <p className="mt-2 text-sm font-semibold text-amber-500 text-muted-foreground">
            TIP: Saving up beyond 1,000 AU will give you bonus prestige points,
            making it more rewarding to wait longer between resets!
          </p>
        </div>
        <div className="rounded-md bg-muted p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Prestige Level</p>
              <p className="text-xl font-bold">{level}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Prestige Points</p>
              <p className="text-xl font-bold">{points}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Current Multiplier</p>
              <p className="text-xl font-bold">
                {multiplier.toLocaleString(LOCALE, NUMBER_OPTIONS)}x
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total AU</p>
              <p className="text-xl font-bold">
                {totalAuValue.toLocaleString(LOCALE, NUMBER_OPTIONS)}
              </p>
            </div>
          </div>
        </div>
        <footer className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {canPerformPrestige
              ? `You will gain ${potentialPoints} prestige points`
              : "You need at least 1,000 AU to prestige"}
          </div>
          <Button onClick={() => doPrestige()} disabled={!canPerformPrestige}>
            Prestige Now
          </Button>
        </footer>
      </div>
    </DyanmicDrawer>
  );
}
