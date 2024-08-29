"use client";

import { useAtomValue } from "jotai";

import { clicksPerSecond } from "@/atoms/global";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { ElementKey } from "@/types";

export function ClicksPerSecond() {
  const clicksPerSecondValue = useAtomValue(clicksPerSecond);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.ClicksPerSecond] && (
      <div>
        <Stats label="Clicks per second" value={clicksPerSecondValue} />
      </div>
    )
  );
}
