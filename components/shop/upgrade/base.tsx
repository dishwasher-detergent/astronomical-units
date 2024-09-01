"use client";

import { useAtom, useAtomValue, WritableAtom } from "jotai";
import { LucideRocket } from "lucide-react";

import { showElement } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { UpgradeButton } from "@/components/shop/upgrade/button";

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

  const isShowing = showElementValue[`${parentKey}_${elementKey}`];
  const element = EQUIPMENT_LIST[parentKey].upgrades?.[elementKey];

  if (isShowing && element) {
    return (
      <UpgradeButton
        cost={element.cost}
        disabled={rankValue >= element.maxCount}
        increment={setRank}
      >
        <LucideRocket className="size-4" />
      </UpgradeButton>
    );
  } else {
    null;
  }
}
