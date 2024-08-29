"use client";

import { useAtomValue } from "jotai";

import { reachPerSecond } from "@/atoms/reach";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { ElementKey } from "@/types";

export function ReachPerSecond() {
  const reachPerSecondValue = useAtomValue(reachPerSecond);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.ReachPerSecond] && (
      <div>
        <Stats label="Reach per second" value={reachPerSecondValue} />
      </div>
    )
  );
}
