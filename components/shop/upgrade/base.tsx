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
            <UpgradeButton
              cost={element.cost}
              disabled={!canAquire}
              increment={setRank}
            >
              <Icon />
            </UpgradeButton>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs max-w-sm">
              <p className="font-bold text-sm">{element.name}</p>
              <p className="mb-2">{element.description}</p>
              <p>{element.cost} AU</p>
              <p>
                {rankValue}/{element.maxCount} Owned
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    null;
  }
}
