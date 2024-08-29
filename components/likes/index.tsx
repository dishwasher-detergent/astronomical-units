'use client'

import { useAtomValue } from "jotai";
import { likes, likesPerSecond } from "@/atoms/likes";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";
import { useMeasureDifference } from "@/hooks/useMeasureDifference";

export function Likes() {
  const likesValue = useAtomValue(likes);

  useMeasureDifference(likesPerSecond, likesValue);

  return (
    <div>
      <div>
        <Stats
          label="Likes"
          value={likesValue.toLocaleString(LOCALE)}
        />
      </div>
    </div>
  );
}