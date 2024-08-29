"use client";

import { useAtomValue } from "jotai";

import { engagementPerSecond } from "@/atoms/engagement";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { ElementKey } from "@/types";

export function EngagementPerSecond() {
  const engagementPerSecondValue = useAtomValue(engagementPerSecond);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.EngagementPerSecond] && (
      <div>
        <Stats label="Engagement per second" value={engagementPerSecondValue} />
      </div>
    )
  );
}
