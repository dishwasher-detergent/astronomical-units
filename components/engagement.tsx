'use client';

import { useAtomValue } from "jotai";

import { engagement, engagementPerSecond } from "@/atoms/engagement";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";
import { useMeasureDifference } from "@/hooks/useMeasureDifference";
import { ElementKey } from "@/types";

export function Engagement() {
  const engagementValue = useAtomValue(engagement);
  const showElementValue = useAtomValue(showElement);

  useMeasureDifference(engagementPerSecond, engagementValue);

  return (
    showElementValue[ElementKey.Engagement] &&
      <div>
        <Stats value={engagementValue.toLocaleString(LOCALE)} label="Engagement" />
      </div>
  );
}