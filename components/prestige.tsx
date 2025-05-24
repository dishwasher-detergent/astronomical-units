"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LucideCrown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  canPrestige,
  performPrestige,
  prestigeLevel,
  prestigeMultiplier,
} from "@/atoms/prestige";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";
import { formatMoney } from "@/lib/formatters";

export function Prestige() {
  const [open, setOpen] = useState(false);
  const canPerformPrestige = useAtomValue(canPrestige);
  const level = useAtomValue(prestigeLevel) || 0;
  const multiplier = useAtomValue(prestigeMultiplier) || 1;
  const doPrestige = useSetAtom(performPrestige);

  return (
    <DynamicDrawer
      title="Prestige System"
      description="Reset your progress to gain prestige points."
      open={open}
      setOpen={setOpen}
      button={
        <Button
          variant={canPerformPrestige ? "default" : "ghost"}
          disabled={!canPerformPrestige}
          className="w-full md:h-8"
        >
          <LucideCrown className="size-6" />
          Prestige
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-muted-foreground mt-2 text-sm">
          Prestiging will reset your progress, but you will gain a multiplier to
          your income and unlock new upgrades. You can only prestige once you
          reach level 100.
        </p>
        <div className="bg-muted rounded-md p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Prestige Count</p>
              <p className="font-mono text-xl font-bold">{level}</p>
            </div>
            <div>
              {" "}
              <p className="text-sm font-medium">Next Multiplier</p>
              <p className="font-mono text-xl font-bold">
                {formatMoney(multiplier + 0.25)}
              </p>
            </div>
          </div>
        </div>{" "}
        <footer className="flex items-center justify-between">
          <Button
            className="w-full"
            onClick={() => doPrestige()}
            disabled={!canPerformPrestige}
          >
            Prestige Now
          </Button>
        </footer>
      </div>
    </DynamicDrawer>
  );
}
