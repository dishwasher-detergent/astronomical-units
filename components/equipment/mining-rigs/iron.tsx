"use client";

import { useAtomValue } from "jotai";

import { equipment } from "@/atoms/equipment";
import { showElement } from "@/atoms/show";
import { Base } from "@/components/equipment/base";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";
import { ElementKey } from "@/types";

export function IronMiningRig() {
  const showElementValue = useAtomValue(showElement);

  const isShowing = showElementValue[ElementKey.IronMiningRig];

  useNextUpgrade(isShowing);

  return (
    isShowing && (
      <div>
        <Base atom={equipment} elementKey={ElementKey.IronMiningRig} />
      </div>
    )
  );
}
