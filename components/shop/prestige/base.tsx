"use client";

import { atom, useAtom, useAtomValue } from "jotai";
import { LucidePlus } from "lucide-react";
import { focusAtom } from "jotai-optics";

import { showElement } from "@/atoms/show";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { AcquirePrestigueUpgrade } from "@/components/shop/prestige/acquire";
import { prestigeUpgrades } from "@/atoms/prestige";
import { Skeleton } from "@/components/ui/skeleton";
import { useNextPrestigeUpgrade } from "@/hooks/useNextUpgrade";
import { nextPrestigeUpgrade } from "@/atoms/upgrades";

export function BasePrestigeUpgrade({ upgradeKey }: { upgradeKey: string }) {
  const upgrade = focusAtom(prestigeUpgrades, (optic) =>
    optic.path(upgradeKey),
  );

  const upgradeCurrent = atom(
    (get) => get(upgrade) || 0,
    (_, set) => {
      set(upgrade, (current = 0) => current + 1);
    },
  );

  const showElementValue = useAtomValue(showElement);
  const next = useAtomValue(nextPrestigeUpgrade);
  const [rankValue, setRank] = useAtom(upgradeCurrent);

  const isShowing = showElementValue[upgradeKey];
  const upgradeItem = PRESTIGE_UPGRADES[upgradeKey];
  const Icon = upgradeItem?.icon || LucidePlus;

  useNextPrestigeUpgrade(isShowing);

  if (isShowing) {
    return (
      <AcquirePrestigueUpgrade elementKey={upgradeKey} increment={setRank}>
        <div className="flex flex-row gap-2">
          <div className="flex flex-none items-start pt-1">
            <Icon className="size-4" />
          </div>
          <div className="flex-1">
            <p className="mb-1 font-semibold">{upgradeItem.name}</p>
            <p className="text-sm">{upgradeItem.description}</p>
            <p className="text-sm">{rankValue} Owned</p>
          </div>
        </div>
      </AcquirePrestigueUpgrade>
    );
  } else if (next == upgradeKey) {
    return (
      <div className="flex flex-row gap-1 px-4 py-2 align-top">
        <div className="flex-1 space-y-1 text-left">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex-none">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    );
  } else {
    null;
  }
}
