"use client";

import { useAtom, useAtomValue, WritableAtom } from "jotai";
import { LucidePlus } from "lucide-react";

import { showElement } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { UpgradeButton } from "@/components/shop/upgrade/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { au } from "@/atoms/au";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function BaseUpgrade({
  atom,
  parentKey,
  elementKey,
}: {
  atom: WritableAtom<any, any, any>;
  parentKey: string;
  elementKey: string;
}) {
  const showElementValue = useAtomValue(showElement);
  const [rankValue, setRank] = useAtom(atom);
  const auValue = useAtomValue(au);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isShowing = showElementValue[`${parentKey}_${elementKey}`];
  const element = EQUIPMENT_LIST[parentKey].upgrades?.[elementKey];
  const Icon = element?.icon || LucidePlus;

  if (isShowing && element && isDesktop != null) {
    const canAquire = element.cost <= auValue && rankValue < element.maxCount;

    if (!isDesktop) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="size-8" size="icon" variant="outline">
              <Icon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="max-w-sm">
            <div className="mb-2 flex w-full flex-row gap-2 text-xs">
              <div className="flex-1">
                <p className="text-sm font-bold">{element.name}</p>
                <p className="mb-2">{element.description}</p>
                <p>
                  {rankValue ?? 0}/{element.maxCount} Owned
                </p>
              </div>
              <div>
                <Badge className="text-xs">{element.cost} AU</Badge>
              </div>
            </div>
            <UpgradeButton
              name={element.name}
              cost={element.cost}
              disabled={!canAquire}
              increment={setRank}
            >
              Upgrade
            </UpgradeButton>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="relative">
              <UpgradeButton
                name={element.name}
                cost={element.cost}
                disabled={!canAquire}
                increment={setRank}
              >
                <Icon className="size-4" />
              </UpgradeButton>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            <div className="flex max-w-sm flex-row text-xs">
              <div className="flex-1">
                <p className="text-sm font-bold">{element.name}</p>
                <p className="mb-2">{element.description}</p>
                <p>
                  {rankValue ?? 0}/{element.maxCount} Owned
                </p>
              </div>
              <div>
                <Badge className="text-xs">{element.cost} AU</Badge>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return <Skeleton className="size-8" />;
  }
}
