"use client";

import { useAtom, useAtomValue, WritableAtom } from "jotai";
import { LucideLock, LucidePlus } from "lucide-react";
import { useState } from "react";

import { showElement } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { UpgradeButton } from "@/components/shop/upgrade/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { au } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { DynamicPopover } from "@/components/ui/dynamic-popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatMoney } from "@/lib/formatters";
import { Tip } from "@/components/ui/tip";
import { MobileBalance } from "@/components/balance";

export function BaseUpgrade({
  atom,
  parentKey,
  elementKey,
}: {
  atom: WritableAtom<any, any, any>;
  parentKey: string;
  elementKey: string;
}) {
  const [open, setOpen] = useState(false);
  const showElementValue = useAtomValue(showElement);
  const [rankValue, setRank] = useAtom(atom);
  const auValue = useAtomValue(au);
  const isMobile = useIsMobile();

  const isShowing = showElementValue[`${parentKey}_${elementKey}`];
  const element = EQUIPMENT_LIST[parentKey].upgrades![elementKey];
  const Icon = element?.icon || LucidePlus;
  const remainingCount = element.maxCount - rankValue;

  if (isShowing && !isMobile != null) {
    const canAquire = element.cost <= auValue && rankValue < element.maxCount;

    if (isMobile) {
      return (
        <DynamicPopover
          open={open}
          setOpen={setOpen}
          button={
            <Button className="size-10" size="icon" disabled={!canAquire}>
              <Icon className="size-4" />
            </Button>
          }
        >
          <MobileBalance />
          <article className="w-full p-4">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="truncate">{element.name}</span>
                </h3>
                <p className="text-muted-foreground m-0 flex items-center gap-1 text-sm">
                  {element.description}
                </p>
              </div>
              <output
                aria-label="Current count"
                className="text-muted-foreground text-3xl font-bold"
              >
                {rankValue < element.maxCount ? rankValue : "MAX"}
                {element.maxCount !== Infinity &&
                  remainingCount > 0 &&
                  `/${element.maxCount}`}
              </output>
            </header>
            <footer className="mt-6">
              <UpgradeButton
                cost={element.cost}
                disabled={!canAquire}
                increment={setRank}
              >
                {formatMoney(element.cost)} AU
              </UpgradeButton>
            </footer>
          </article>
        </DynamicPopover>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="relative z-10">
              <UpgradeButton
                cost={element.cost}
                disabled={!canAquire}
                increment={setRank}
              >
                <Icon className="size-4" />
              </UpgradeButton>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start" className="z-9999">
            <div className="flex max-w-sm flex-col">
              <div className="flex-1">
                <p className="font-semibold">{element.name}</p>
                <p className="mb-2">{element.description}</p>
              </div>
              <p>
                Cost:{" "}
                <span className="font-mono">{formatMoney(element.cost)}</span>{" "}
                AU
              </p>
              <p>
                Quantity: {rankValue ?? 0}/{element.maxCount}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return (
      <Tip
        content={`You must have ${element.threshold} of this equipment to unlock this
              upgrade.`}
      >
        <Button
          variant="secondary"
          size="icon"
          className="size-10 md:size-8 md:p-0"
        >
          <LucideLock />
        </Button>
      </Tip>
    );
  }
}
