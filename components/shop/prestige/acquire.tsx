"use client";

import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import React from "react";

import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { prestigePoints, prestigeUpgrades } from "@/atoms/prestige";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { Badge } from "@/components/ui/badge";

export function AcquirePrestigueUpgrade({
  elementKey,
  increment,
  children,
}: {
  elementKey: string;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [ppValue, setPP] = useAtom(prestigePoints);
  const element = PRESTIGE_UPGRADES[elementKey];
  const currentCount = useAtomValue(prestigeUpgrades)?.[elementKey] || 0;
  const reachedMaxCount = currentCount >= element.maxCount;
  const canAcquire = element.cost <= ppValue && !reachedMaxCount;

  return (
    <button
      className="flex w-full flex-row gap-4 border-b border-dashed px-4 py-2 align-top hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground"
      disabled={!canAcquire}
      title={
        reachedMaxCount
          ? "Maximum upgrade level reached"
          : !canAcquire
            ? "Not enough prestige points"
            : `Purchase ${element.name}`
      }
      onClick={() => {
        if (canAcquire) {
          increment();
          setPP((current) => current - element.cost);
          toast.success(
            `Purchased ${element.name} for ${element.cost.toLocaleString(
              LOCALE,
              NUMBER_OPTIONS,
            )} Prestige Points`,
          );
        }
      }}
    >
      <div className="flex-1 text-left">{children}</div>
      <div className="flex-none">
        <Badge>{element.cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} PP</Badge>
      </div>
    </button>
  );
}
