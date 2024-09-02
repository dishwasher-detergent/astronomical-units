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

  const isShowing = showElementValue[`${parentKey}_${elementKey}`];
  const element = EQUIPMENT_LIST[parentKey].upgrades?.[elementKey];
  const Icon = element?.icon || LucidePlus;

  if (isShowing && element) {
    const canAquire = element.cost <= auValue && rankValue < element.maxCount;

    return (
      <TooltipProvider>
        <Tooltip>
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
          <TooltipContent side="bottom">
            <div className="flex w-48 flex-row text-xs">
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
